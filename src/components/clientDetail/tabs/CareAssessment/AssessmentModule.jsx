import React from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Checkbox,
  Radio,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { labelSx, inputSx } from "./careAssessmentStyles";
import {
  interpolate,
  RISK_TABLE_COLUMNS,
  REVIEW_SIGNOFF_QUESTIONS,
} from "./config/assessmentSchema";

const sectionTitleSx = {
  fontSize: "14px",
  fontWeight: 700,
  color: "#0EA5E9",
  textTransform: "uppercase",
  letterSpacing: "0.7px",
  mb: 2,
};

const noteSx = {
  fontSize: "12px",
  color: "text.secondary",
  fontStyle: "italic",
  mt: 0.5,
};

/** Renders one question of any type from the config. */
function Field({ q, name, value, onChange }) {
  const label = interpolate(q.label, name);

  const setVal = (v) => onChange(q.id, v);

  if (q.type === "matrix") {
    const rowValues = value || {};
    return (
      <Box sx={{ width: "100%", overflowX: "auto" }}>
        <Typography sx={labelSx}>
          {label} {q.mandatory && <Box component="span" sx={{ color: "#EF4444" }}>*</Box>}
        </Typography>
        <Table size="small" sx={{ minWidth: 700, bgcolor: "#fff", borderRadius: "8px" }}>
          <TableHead>
            <TableRow sx={{ bgcolor: "#F1F5F9" }}>
              <TableCell sx={{ fontWeight: 700, fontSize: "12px" }} />
              {q.columns.map((c) => (
                <TableCell key={c} align="center" sx={{ fontWeight: 700, fontSize: "12px" }}>
                  {c}
                </TableCell>
              ))}
              {q.textColumn && (
                <TableCell sx={{ fontWeight: 700, fontSize: "12px" }}>
                  {interpolate(q.textColumn, name)}
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {q.rows.map((row) => {
              const rv = rowValues[row] || {};
              return (
                <TableRow key={row}>
                  <TableCell sx={{ fontSize: "13px", fontWeight: 600 }}>{row}</TableCell>
                  {q.columns.map((c) => (
                    <TableCell key={c} align="center">
                      <Radio
                        size="small"
                        checked={rv.choice === c}
                        onChange={() =>
                          setVal({ ...rowValues, [row]: { ...rv, choice: c } })
                        }
                        sx={{ color: "#CBD5E1", "&.Mui-checked": { color: "#0EA5E9" } }}
                      />
                    </TableCell>
                  ))}
                  {q.textColumn && (
                    <TableCell>
                      <TextField
                        fullWidth
                        size="small"
                        value={rv.note || ""}
                        onChange={(e) =>
                          setVal({ ...rowValues, [row]: { ...rv, note: e.target.value } })
                        }
                        sx={inputSx}
                      />
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
    );
  }

  if (q.type === "table") {
    const rows = value && value.length ? value : [{}];
    const update = (i, colId, v) => {
      const next = rows.map((r, idx) => (idx === i ? { ...r, [colId]: v } : r));
      setVal(next);
    };
    return (
      <Box sx={{ width: "100%" }}>
        <Typography sx={labelSx}>{label}</Typography>
        <Box sx={{ overflowX: "auto" }}>
          <Table size="small" sx={{ minWidth: 700, bgcolor: "#fff", borderRadius: "8px" }}>
            <TableHead>
              <TableRow sx={{ bgcolor: "#F1F5F9" }}>
                {q.columns.map((c) => (
                  <TableCell key={c.id} sx={{ fontWeight: 700, fontSize: "12px" }}>
                    {c.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((r, i) => (
                <TableRow key={i}>
                  {q.columns.map((c) => (
                    <TableCell key={c.id}>
                      {c.type === "single" ? (
                        <TextField
                          select
                          fullWidth
                          size="small"
                          value={r[c.id] || ""}
                          onChange={(e) => update(i, c.id, e.target.value)}
                          sx={inputSx}
                        >
                          {c.options.map((o) => (
                            <MenuItem key={o} value={o}>{o}</MenuItem>
                          ))}
                        </TextField>
                      ) : (
                        <TextField
                          fullWidth
                          size="small"
                          value={r[c.id] || ""}
                          onChange={(e) => update(i, c.id, e.target.value)}
                          sx={inputSx}
                        />
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
        <Button
          size="small"
          onClick={() => setVal([...rows, {}])}
          sx={{ mt: 1, textTransform: "none", color: "#0EA5E9", fontWeight: 700, fontSize: "12px" }}
        >
          + {q.addLabel || "Add another"}
        </Button>
      </Box>
    );
  }

  if (q.type === "multi") {
    const selected = value || [];
    const toggle = (o) =>
      setVal(selected.includes(o) ? selected.filter((s) => s !== o) : [...selected, o]);
    return (
      <Box sx={{ width: "100%" }}>
        <Typography sx={labelSx}>
          {label} {q.mandatory && <Box component="span" sx={{ color: "#EF4444" }}>*</Box>}
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
          {q.options.map((o) => (
            <Box
              key={o}
              onClick={() => toggle(o)}
              sx={{ display: "flex", alignItems: "center", gap: 0.8, cursor: "pointer" }}
            >
              <Checkbox
                size="small"
                checked={selected.includes(o)}
                sx={{ p: 0.3, color: "#CBD5E1", "&.Mui-checked": { color: "#0EA5E9" } }}
              />
              <Typography fontSize="13px" color="text.primary">{o}</Typography>
            </Box>
          ))}
        </Box>
        {q.detailPerOption && <Typography sx={noteSx}>Each selection also captures: {q.detailPerOption}.</Typography>}
        {q.note && <Typography sx={noteSx}>{q.note}</Typography>}
      </Box>
    );
  }

  if (q.type === "single") {
    return (
      <Box sx={{ width: "100%" }}>
        <Typography sx={labelSx}>
          {label} {q.mandatory && <Box component="span" sx={{ color: "#EF4444" }}>*</Box>}
        </Typography>
        <TextField
          select
          fullWidth
          size="small"
          value={value || ""}
          onChange={(e) => setVal(e.target.value)}
          sx={inputSx}
        >
          {q.options.map((o) => (
            <MenuItem key={o} value={o}>{o}</MenuItem>
          ))}
        </TextField>
        {q.note && <Typography sx={noteSx}>{q.note}</Typography>}
      </Box>
    );
  }

  // text / textarea / date / number / currency and any not-yet-specialised type
  const multiline = q.type === "textarea";
  return (
    <Box sx={{ width: "100%" }}>
      <Typography sx={labelSx}>
        {label} {q.mandatory && <Box component="span" sx={{ color: "#EF4444" }}>*</Box>}
      </Typography>
      <TextField
        fullWidth
        size="small"
        multiline={multiline}
        minRows={multiline ? 4 : 1}
        type={q.type === "number" ? "number" : q.type === "date" ? "date" : "text"}
        InputLabelProps={q.type === "date" ? { shrink: true } : undefined}
        value={value || ""}
        onChange={(e) => setVal(e.target.value)}
        sx={inputSx}
      />
      {q.note && <Typography sx={noteSx}>{q.note}</Typography>}
    </Box>
  );
}

/**
 * Renders one complete assessment module: gateway, questions, risk table,
 * care-worker instructions, ECM checks and sign-off.
 *
 * The gateway's STOP / SKIP logic is honoured — answering the gateway with a
 * skip value hides the rest of the module, per the source documents.
 */
export default function AssessmentModule({ module: mod, clientName, values = {}, onChange }) {
  const gatewayValue = mod.gateway ? values[mod.gateway.id] : undefined;
  const skipped =
    mod.gateway && mod.gateway.skipOn && mod.gateway.skipOn.includes(gatewayValue);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <Box>
        <Typography fontSize="20px" fontWeight={700} color="#101828">
          {mod.title}
        </Typography>
        <Typography fontSize="12px" color="text.secondary">
          {mod.source}
        </Typography>
        {mod.intro && (
          <Typography fontSize="14px" color="text.secondary" sx={{ mt: 1 }}>
            {mod.intro}
          </Typography>
        )}
      </Box>

      {mod.gateway && (
        <Field
          q={mod.gateway}
          name={clientName}
          value={gatewayValue}
          onChange={onChange}
        />
      )}

      {skipped ? (
        <Box sx={{ p: 2, bgcolor: "#F8FAFC", borderRadius: "8px", border: "1px solid #E2E8F0" }}>
          <Typography fontSize="13px" color="text.secondary">
            Screening answer recorded — the rest of this assessment is not required.
          </Typography>
        </Box>
      ) : (
        <>
          {mod.questions && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {mod.questions.map((q) => (
                <Field key={q.id} q={q} name={clientName} value={values[q.id]} onChange={onChange} />
              ))}
            </Box>
          )}

          {mod.callout && (
            <Box sx={{ p: 2, bgcolor: "#FFEDD575", borderRadius: "8px", border: "1px solid #FEA400" }}>
              <Typography fontSize="13px" color="text.primary">
                <strong>Important:</strong> {mod.callout}
              </Typography>
            </Box>
          )}

          {mod.riskDomains && (
            <Box>
              <Typography sx={sectionTitleSx}>Risk assessment</Typography>
              <Box sx={{ overflowX: "auto" }}>
                <Table size="small" sx={{ minWidth: 800, bgcolor: "#fff", borderRadius: "8px" }}>
                  <TableHead>
                    <TableRow sx={{ bgcolor: "#F1F5F9" }}>
                      {RISK_TABLE_COLUMNS.map((c) => (
                        <TableCell key={c.id} sx={{ fontWeight: 700, fontSize: "12px" }}>
                          {c.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {mod.riskDomains.map((domain) => {
                      const rv = (values.__risk || {})[domain] || {};
                      const setRisk = (colId, v) =>
                        onChange("__risk", {
                          ...(values.__risk || {}),
                          [domain]: { ...rv, [colId]: v },
                        });
                      return (
                        <TableRow key={domain}>
                          <TableCell sx={{ fontSize: "13px", fontWeight: 600 }}>{domain}</TableCell>
                          {RISK_TABLE_COLUMNS.slice(1).map((c) => (
                            <TableCell key={c.id}>
                              {c.type === "single" ? (
                                <TextField
                                  select
                                  fullWidth
                                  size="small"
                                  value={rv[c.id] || ""}
                                  onChange={(e) => setRisk(c.id, e.target.value)}
                                  sx={inputSx}
                                >
                                  {c.options.map((o) => (
                                    <MenuItem key={o} value={o}>{o}</MenuItem>
                                  ))}
                                </TextField>
                              ) : (
                                <TextField
                                  fullWidth
                                  size="small"
                                  multiline
                                  value={rv[c.id] || ""}
                                  onChange={(e) => setRisk(c.id, e.target.value)}
                                  sx={inputSx}
                                />
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </Box>
            </Box>
          )}

          {mod.careWorkerInstructions && (
            <Box>
              <Typography sx={sectionTitleSx}>Care-worker instructions</Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {mod.careWorkerInstructions.map((i) => (
                  <Field
                    key={i.id}
                    q={{ ...i, type: "textarea" }}
                    name={clientName}
                    value={values[i.id]}
                    onChange={onChange}
                  />
                ))}
              </Box>
            </Box>
          )}

          {mod.ecm && (
            <Box>
              <Typography sx={sectionTitleSx}>Electronic Call Monitoring (ECM) integration</Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {mod.ecm.map((e) => (
                  <Field
                    key={e.id}
                    q={{ ...e, type: "single", note: e.action }}
                    name={clientName}
                    value={values[e.id]}
                    onChange={onChange}
                  />
                ))}
              </Box>
            </Box>
          )}

          <Box>
            <Typography sx={sectionTitleSx}>Review and sign-off</Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {REVIEW_SIGNOFF_QUESTIONS.map((q) => (
                <Field key={q.id} q={q} name={clientName} value={values[q.id]} onChange={onChange} />
              ))}
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
}
