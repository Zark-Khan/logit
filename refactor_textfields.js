const fs = require('fs');
const babel = require('@babel/core');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const t = require('@babel/types');

const code = fs.readFileSync('c:/Users/pc/Desktop/logit/src/components/clientDetail/tabs/CareAssessment/CareAssessmentForm.jsx', 'utf8');

const ast = parser.parse(code, {
  sourceType: 'module',
  plugins: ['jsx']
});

const genericLabels = ["Comments", "Details / Evidence", "Response", "Risk Before Action", "Details", "Action", "State risk identified from the falls this risk assessment:"];

function toCamelCase(str) {
  return str
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
      if (+match === 0) return "";
      return index === 0 ? match.toLowerCase() : match.toUpperCase();
    })
    .trim();
}

let lastSpecificLabel = "unknown";

traverse(ast, {
  JSXElement(path) {
    if (path.node.openingElement.name.name === 'Typography') {
      const children = path.node.children;
      if (children && children.length > 0 && children[0].type === 'JSXText') {
        const text = children[0].value.trim();
        if (text.length > 0) {
          if (!genericLabels.includes(text) && text.length > 2) {
            lastSpecificLabel = text;
          }
          path.node._currentLabelText = text; // attach to node for later
        }
      }
    }
  }
});

let modified = false;

// Second pass: find TextFields
traverse(ast, {
  JSXElement(path) {
    if (path.node.openingElement.name.name === 'TextField') {
      // Check if it already has 'value'
      const hasValue = path.node.openingElement.attributes.some(attr => attr.name && attr.name.name === 'value');
      if (!hasValue) {
        // Find preceding Typography in the same container or just use lastSpecificLabel
        // To be safe, let's look at the previous sibling that is a Typography, or use lastSpecificLabel.
        
        let labelToUse = lastSpecificLabel;
        
        // Find preceding Typography by looking at siblings
        let prev = path.getSibling(path.key - 1);
        while (prev && prev.node) {
          if (prev.node.type === 'JSXElement' && prev.node.openingElement.name.name === 'Typography') {
            const textNode = prev.node.children.find(c => c.type === 'JSXText');
            if (textNode) {
              const text = textNode.value.trim();
              if (genericLabels.includes(text)) {
                 labelToUse = lastSpecificLabel + " " + text;
              } else {
                 labelToUse = text;
                 lastSpecificLabel = text;
              }
              break;
            }
          }
          prev = prev.getSibling(prev.key - 1);
        }

        const camelKey = toCamelCase(labelToUse);

        // value={careAssessment.camelKey || ""}
        path.node.openingElement.attributes.push(
          t.jsxAttribute(
            t.jsxIdentifier("value"),
            t.jsxExpressionContainer(
              t.logicalExpression(
                "||",
                t.memberExpression(
                  t.identifier("careAssessment"),
                  t.identifier(camelKey)
                ),
                t.stringLiteral("")
              )
            )
          )
        );

        // onChange={(e) => updateAssessment("careAssessment", "camelKey", e.target.value)}
        path.node.openingElement.attributes.push(
          t.jsxAttribute(
            t.jsxIdentifier("onChange"),
            t.jsxExpressionContainer(
              t.arrowFunctionExpression(
                [t.identifier("e")],
                t.callExpression(
                  t.identifier("updateAssessment"),
                  [
                    t.stringLiteral("careAssessment"),
                    t.stringLiteral(camelKey),
                    t.memberExpression(
                      t.memberExpression(t.identifier("e"), t.identifier("target")),
                      t.identifier("value")
                    )
                  ]
                )
              )
            )
          )
        );
        modified = true;
      }
    }
    
    // Also track lastSpecificLabel in the second pass so we have the context right at this point in the tree!
    if (path.node.openingElement.name.name === 'Typography') {
        const text = path.node._currentLabelText;
        if (text && !genericLabels.includes(text) && text.length > 2) {
            lastSpecificLabel = text;
        }
    }
  }
});

if (modified) {
  const output = generate(ast, {}, code);
  fs.writeFileSync('c:/Users/pc/Desktop/logit/src/components/clientDetail/tabs/CareAssessment/CareAssessmentForm.jsx', output.code);
  console.log("Successfully refactored TextFields!");
} else {
  console.log("No TextFields needed modification.");
}
