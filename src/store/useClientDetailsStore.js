import { create } from "zustand";

// Clients that already ship with fully populated "Client details" content
// (the static read-only sections rendered in tabs/ClientDetails/index.jsx).
// Any client id NOT in this list has no data yet, so the multi-step
// "Client Details" form (tabs/ClientDetails/ClientDetailsForm.jsx) is shown
// instead until the form is completed.
const PREFILLED_CLIENT_IDS = ["0041", "0045"];

export const useClientDetailsStore = create((set, get) => ({
  // { [clientId]: { [step]: { [field]: value } } }
  formsByClient: {},
  completedClients: PREFILLED_CLIENT_IDS,

  isComplete: (clientId) => get().completedClients.includes(clientId),

  getForm: (clientId, step) => get().formsByClient[clientId]?.[step] || {},

  updateField: (clientId, step, field, value) =>
    set((state) => ({
      formsByClient: {
        ...state.formsByClient,
        [clientId]: {
          ...state.formsByClient[clientId],
          [step]: {
            ...state.formsByClient[clientId]?.[step],
            [field]: value,
          },
        },
      },
    })),

  markComplete: (clientId) =>
    set((state) => ({
      completedClients: state.completedClients.includes(clientId)
        ? state.completedClients
        : [...state.completedClients, clientId],
    })),
}));
