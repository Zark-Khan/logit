import { create } from 'zustand';

export const useAssessmentStore = create((set) => ({
  assessments: {
    'personal-care': {
      // Bathing
      canWashThemself: '',
      bathingAdditionalDetails: '',
      
      // Oral Hygiene
      canMaintainOralHygiene: '',
      oralHygieneAdditionalDetails: '',
      wearsDentures: '',
      denturesAdditionalDetails: '',
      
      // Personal appearance
      canMaintainPersonalAppearance: '',
      personalAppearanceAdditionalDetails: '',
      canDressThemself: '',
      dressingAdditionalDetails: '',

      // Toilet
      canToiletThemself: '',
      toiletAdditionalDetails: '',
      bowelControl: '',
      bowelAdditionalDetails: '',
      bladderControl: '',
      bladderAdditionalDetails: '',
      needsSupportWith: [], // array of string values like 'Catheter', 'Incontinence pad'
      supportAdditionalDetails: '',
    },
    'mobility': {
      // Placeholder for mobility data
    },
    // Add other categories as needed
  },

  updateAssessment: (categoryId, field, value) => set((state) => ({
    assessments: {
      ...state.assessments,
      [categoryId]: {
        ...state.assessments[categoryId],
        [field]: value
      }
    }
  })),

  // specific action for arrays like needsSupportWith
  toggleArrayField: (categoryId, field, value) => set((state) => {
    const currentArray = state.assessments[categoryId]?.[field] || [];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(v => v !== value)
      : [...currentArray, value];
      
    return {
      assessments: {
        ...state.assessments,
        [categoryId]: {
          ...state.assessments[categoryId],
          [field]: newArray
        }
      }
    };
  })
}));
