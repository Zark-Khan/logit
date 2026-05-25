const fs = require('fs');
const babel = require('@babel/core');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const t = require('@babel/types');

const filePath = 'c:/Users/pc/Desktop/logit/src/components/clientDetail/tabs/CareAssessment/CareAssessmentForm.jsx';
const code = fs.readFileSync(filePath, 'utf8');

const ast = parser.parse(code, {
  sourceType: 'module',
  plugins: ['jsx']
});

function toCamelCase(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '').replace(/[^a-zA-Z0-9]/g, '');
}

// Keep track of added keys to avoid duplicates
const usedKeys = new Set();
let replacedCount = 0;

traverse(ast, {
  JSXElement(path) {
    const node = path.node;
    
    // Check if this is the <Box sx={{ display: "flex", gap: 3... }}> that wraps a mapping
    if (node.openingElement.name.name !== 'Box') return;
    
    // It must have a single child which is an JSXExpressionContainer
    const children = node.children.filter(c => c.type !== 'JSXText' || c.value.trim() !== '');
    if (children.length !== 1 || children[0].type !== 'JSXExpressionContainer') return;
    
    const expr = children[0].expression;
    // We are looking for array.map((opt) => ...)
    if (expr.type !== 'CallExpression' || 
        expr.callee.type !== 'MemberExpression' || 
        expr.callee.property.name !== 'map') return;
    
    // The object being mapped should be an ArrayExpression
    if (expr.callee.object.type !== 'ArrayExpression') return;
    
    const arrayElements = expr.callee.object.elements;
    
    // Check if the map callback returns the fake checkbox structure
    // Specifically looking for border: "1px solid #E2E8F0"
    // Since traversing the entire subtree of the map callback is complex, we can just dump it to code and check
    const mapCode = generate(expr).code;
    if (!mapCode.includes('border: "1px solid #E2E8F0"')) return;

    // We found a fake checkbox group!
    replacedCount++;
    
    // We need to extract `mt` and `mb` from the outer Box sx prop if any
    let mtProp = null;
    let mbProp = null;
    
    const sxAttr = node.openingElement.attributes.find(attr => attr.name && attr.name.name === 'sx');
    if (sxAttr && sxAttr.value && sxAttr.value.type === 'JSXExpressionContainer' && sxAttr.value.expression.type === 'ObjectExpression') {
        const props = sxAttr.value.expression.properties;
        for (let prop of props) {
            if (prop.key && prop.key.name === 'mt') {
                mtProp = prop.value;
            }
            if (prop.key && prop.key.name === 'mb') {
                mbProp = prop.value;
            }
        }
    }
    
    // Find the nearest preceding Typography text to use as the key
    // We can look at previous siblings in the parent
    let questionText = "unknownQuestion";
    let currPath = path;
    
    // look for previous sibling
    const siblings = path.parent.children || [];
    const index = siblings.indexOf(path.node);
    
    for (let i = index - 1; i >= 0; i--) {
        const sib = siblings[i];
        if (sib.type === 'JSXElement' && sib.openingElement.name.name === 'Typography') {
            // Find text
            const textNodes = sib.children.filter(c => c.type === 'JSXText');
            if (textNodes.length > 0) {
                questionText = textNodes[0].value.trim();
                break;
            }
            // Or maybe it contains an expression
            const exprNodes = sib.children.filter(c => c.type === 'JSXExpressionContainer');
            // Hard to parse statically, fallback
        }
    }
    
    let key = toCamelCase(questionText);
    if (!key || key.length === 0 || key === 'unknownQuestion') {
        key = 'question' + replacedCount;
    }
    
    // Ensure unique keys
    let origKey = key;
    let counter = 1;
    while (usedKeys.has(key)) {
        key = origKey + counter;
        counter++;
    }
    usedKeys.add(key);
    
    // Create <SelectableButtonGroup options={[...]} value={careAssessment.key} onChange={(val) => setAssessment('careAssessment', 'key', val)} />
    
    const attributes = [
        t.jsxAttribute(t.jsxIdentifier('options'), t.jsxExpressionContainer(t.arrayExpression(arrayElements)))
    ];
    
    if (mtProp) attributes.push(t.jsxAttribute(t.jsxIdentifier('mt'), t.jsxExpressionContainer(mtProp)));
    if (mbProp) attributes.push(t.jsxAttribute(t.jsxIdentifier('mb'), t.jsxExpressionContainer(mbProp)));
    
    attributes.push(
        t.jsxAttribute(
            t.jsxIdentifier('value'),
            t.jsxExpressionContainer(
                t.memberExpression(t.identifier('careAssessment'), t.identifier(key))
            )
        )
    );
    
    // onChange={(val) => setAssessment('careAssessment', 'key', val)}
    const onChangeExpr = t.arrowFunctionExpression(
        [t.identifier('val')],
        t.callExpression(t.identifier('setAssessment'), [
            t.stringLiteral('careAssessment'),
            t.stringLiteral(key),
            t.identifier('val')
        ])
    );
    
    attributes.push(
        t.jsxAttribute(t.jsxIdentifier('onChange'), t.jsxExpressionContainer(onChangeExpr))
    );
    
    const newElement = t.jsxElement(
        t.jsxOpeningElement(t.jsxIdentifier('SelectableButtonGroup'), attributes, true),
        null,
        [],
        true
    );
    
    path.replaceWith(newElement);
  }
});

// We also need to import useAssessmentStore and SelectableButtonGroup if they aren't there
// and call `const { assessments, setAssessment } = useAssessmentStore();`
// `const careAssessment = assessments['careAssessment'] || {};`

let finalCode = generate(ast).code;

// Add imports
if (!finalCode.includes('useAssessmentStore')) {
    finalCode = `import useAssessmentStore from "../../../../store/useAssessmentStore";\n` + finalCode;
}
if (!finalCode.includes('SelectableButtonGroup')) {
    const componentDef = `
function SelectableButtonGroup({ options, mt, mb, value, onChange }) {
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, mb: mb !== undefined ? mb : 2, mt: mt || 0 }}>
      {options.map((opt) => {
        const isSelected = value === opt;
        return (
          <Box
            key={opt}
            onClick={() => onChange(opt)}
            sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer" }}
          >
            <Box
              sx={{
                width: 16,
                height: 16,
                border: "1px solid",
                borderColor: isSelected ? "#0EA5E9" : "#E2E8F0",
                borderRadius: "4px",
                bgcolor: isSelected ? "#0EA5E9" : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              {isSelected && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </Box>
            <Typography fontSize="14px" color="text.primary">
              {opt}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}
`;
    // Insert after imports
    finalCode = finalCode.replace(/(import { labelSx, inputSx } from "\.\/careAssessmentStyles";\s*)/, '$1\n' + componentDef);
}

// Inject hooks
if (!finalCode.includes('const { assessments, setAssessment } = useAssessmentStore();')) {
    finalCode = finalCode.replace(
        /export default function CareAssessmentForm\(\{ client \}\) \{\s*const \[activeStep, setActiveStep\] = useState\(0\);/,
        `export default function CareAssessmentForm({ client }) {
  const { assessments, setAssessment } = useAssessmentStore();
  const careAssessment = assessments['careAssessment'] || {};
  const [activeStep, setActiveStep] = useState(0);`
    );
}

fs.writeFileSync(filePath, finalCode, 'utf8');
console.log('Replaced ' + replacedCount + ' fake checkboxes.');

