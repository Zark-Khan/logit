import { create } from "zustand";

// Answers to the Verity Healthcare assessment modules, kept per client so two
// clients' assessments never share state.
//
//   byClient[clientId][moduleId][fieldId] = value
//
// Field values are whatever the field type produces: a string for text/single,
// an array for multi, an object keyed by row for matrix, an array of row
// objects for table.
export const useCareAssessmentStore = create((set, get) => ({
  byClient: {},

  getModuleValues: (clientId, moduleId) =>
    (get().byClient[clientId] || {})[moduleId] || {},

  setField: (clientId, moduleId, fieldId, value) =>
    set((state) => {
      const client = state.byClient[clientId] || {};
      const mod = client[moduleId] || {};
      return {
        byClient: {
          ...state.byClient,
          [clientId]: { ...client, [moduleId]: { ...mod, [fieldId]: value } },
        },
      };
    }),

  /** How many fields have been answered in a module — drives the step summary. */
  answeredCount: (clientId, moduleId) => {
    const vals = (get().byClient[clientId] || {})[moduleId] || {};
    return Object.values(vals).filter((v) =>
      Array.isArray(v) ? v.length > 0 : v !== undefined && v !== null && v !== ""
    ).length;
  },
}));
