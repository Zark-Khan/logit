import { GROUPS, ALL_MODULE_IDS } from "./groups";
import { REFERRAL_ADMIN_MODULES } from "./modules/referralAdmin";
import { CLINICAL_MODULES } from "./modules/clinical";
import { COMMUNICATION_MODULES } from "./modules/communication";

// Every module transcribed from the source documents so far.
// Add each new group file here as it is completed.
export const MODULES = [
  ...REFERRAL_ADMIN_MODULES,
  ...CLINICAL_MODULES,
  ...COMMUNICATION_MODULES,
];

const BY_ID = MODULES.reduce((acc, m) => ({ ...acc, [m.id]: m }), {});

export const getModuleById = (id) => BY_ID[id];

/** Module ids listed in groups.js that have not been transcribed yet. */
export const PENDING_MODULE_IDS = ALL_MODULE_IDS.filter((id) => !BY_ID[id]);

/** Transcription progress, so the UI can state coverage rather than imply completeness. */
export const COVERAGE = {
  done: MODULES.length,
  total: ALL_MODULE_IDS.length,
  pending: PENDING_MODULE_IDS.length,
};

export { GROUPS, ALL_MODULE_IDS };
