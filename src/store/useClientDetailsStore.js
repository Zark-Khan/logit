import { create } from "zustand";
import { CLIENT_DETAILS_SEED } from "../components/clientDetail/tabs/ClientDetails/clientDetailsSeed";

// The "Client details" tab is always the multi-step form
// (tabs/ClientDetails/ClientDetailsForm.jsx). Clients in the seed open with
// their existing answers pre-filled and every step unlocked; everyone else
// starts with an empty form.
export const useClientDetailsStore = create((set, get) => ({
  // { [clientId]: { [step]: { [field]: value } } }
  formsByClient: CLIENT_DETAILS_SEED,
  completedClients: Object.keys(CLIENT_DETAILS_SEED),

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
