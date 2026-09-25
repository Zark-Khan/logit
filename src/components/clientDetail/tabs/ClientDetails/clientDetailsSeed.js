// Mock "Client details" answers for clients that already have a profile.
// Keys match the step/field names used by ClientDetailsForm.jsx.
export const CLIENT_DETAILS_SEED = {
  // Margaret Hall
  "0041": {
    personalDetails: {
      ethnicity: "White: any other White background",
      religion: "Not stated",
      cultureReligionImpact:
        "There are no identified cultural or religious requirements impacting Margaret's care at this time. Care staff should remain respectful of family preferences and seek guidance from parents if any cultural needs arise.",
      sex: "Female",
      gender: "Female",
      sexualOrientation: "Not applicable - Margaret is a young child.",
      sexGenderImpact:
        "There are no specific impacts on Margaret's care needs in relation to sex or gender. Care should remain age-appropriate and child-centred at all times.",
      jobsOccupations:
        "Margaret is a minor and does not have any employment history. She is dependent on her parents for all aspects of care and daily living support.",
      importantPeople:
        "Margaret's parents are very important to her and play a central role in her care. She receives short break support at home with at least one parent present. Parents should be kept informed of all activities, wellbeing updates, and any concerns. Their guidance should be followed regarding routines and preferences.",
      significantPlaces:
        "Margaret lives at home with her family. The home environment is her primary and most familiar setting. All support is delivered within the family home on Sunday afternoons (14:00-18:00) as part of her short break provision.",
      otherLifeHistoryNotes:
        "Margaret is receiving support under short break/respite provision. The purpose of the service is to provide supervision and engagement in activities of her choice while offering respite for her parents. Care should focus on safety, engagement, and positive interaction.",
      dailyRoutines:
        "Margaret receives support every Sunday from 14:00-18:00. She benefits from structured, age-appropriate activities and responds well to consistent routines and familiar staff. Activities should be led by Margaret's interests where possible and delivered in a calm, supportive, and engaging manner.",
      dislikesTriggers:
        "Margaret may become unsettled by sudden changes, loud voices, or unfamiliar approaches. Staff should use a gentle tone, provide reassurance when needed, and follow parental guidance to minimise distress.",
      hobbiesInterests:
        "Margaret enjoys engaging in activities of her choice within the home environment. Staff should use play-based, sensory, or interactive activities appropriate to her age and developmental needs. Staff should actively encourage participation, promote enjoyment, and support her development through positive engagement.",
    },
    medicalDetails: {
      nhsNumber: "7209545425",
      medicalHistory: "Epilepsy\nSE - status epilepticus",
      medicalSupport: "We do not provide Margaret's medicine support",
      allergiesIntolerances: [
        "Allergies / Contraindicated Medications:",
        "• Phenytoin.",
        "• All sodium channel blockers (contraindicated due to genetic mutation).",
        "• Suxamethonium.",
        "• Lamotrigine (reaction noted as unknown).",
      ].join("\n"),
      gpPracticeName: "Albion Street Group Practice",
      gpPracticeLocation: "87 Albion St, London SE16 7JX",
      gpName: "Dr. Sarah Williams",
      gpPhone: "020 3474 6200",
      pharmacistDetails: "",
    },
    primaryContacts: {
      contacts: [
        {
          firstName: "Elena",
          lastName: "Re",
          relationship: "Parent",
          phone: "+447456718122",
          email: "architettare.elena@gmail.com",
          contactType: "Emergency, Next of kin",
          bestInterest: "No",
        },
        {
          firstName: "Luca",
          lastName: "Pucacco",
          relationship: "Parent",
          phone: "+447454890704",
          email: "luca.pucacco@gmail.com",
          contactType: "Emergency, Next of kin",
          bestInterest: "No",
        },
      ],
      otherProfessionals: "",
    },
    advancePlanning: {
      hasCapacity: "No",
      healthWelfareLpa: "No",
      propertyFinancialLpa: "No",
      dnacpr: "No",
      adrt: "No",
      respect: "No",
    },
    admin: {
      uniqueClientIdentifier: "1065940",
      serviceStartDate: "01 March 2026",
      currentStatus: "Active",
      regulatedCare: "Yes",
      riskLevel: "Red",
      riskLevelDetails: [
        "Margaret is assessed as Red risk due to:",
        "• Diagnosed epilepsy including history of status epilepticus.",
        "• Requirement for emergency rescue medication (buccal midazolam and rectal paraldehyde).",
        "• Multiple prescribed anti-epileptic medications.",
        "• Documented medication contraindications due to genetic mutation.",
        "• Young age and full dependence on adults for safety.",
        "",
        "There is a risk of prolonged seizures requiring emergency intervention. Staff must be trained in epilepsy management and familiar with her seizure protocol.",
      ].join("\n"),
      familyInvolvement: "Very Involved",
      staffingCrisisPlan: [
        "• Office to prioritise cover due to Red risk status.",
        "• Only staff trained in epilepsy management and rescue medication to attend.",
        "• If no trained staff available, parents to be informed immediately.",
        "• As support is respite-based (with parent present), the family can safely manage short-term cancellation if necessary.",
        "• Missed calls must be documented and escalated to management.",
      ].join("\n"),
      adverseWeatherPlan: [
        "• Office to confirm attendance in advance where possible.",
        "• If travel disruption occurs, parents to be informed immediately.",
        "• As care takes place in the family home with a parent present, immediate safety risk is reduced.",
        "• Where possible, adjusted arrival times may be agreed with family.",
      ].join("\n"),
      communicationNeeds: "Requires communication support",
      communicationAdditionalDetails:
        "All administrative contact should be directed to her parents.",
      preferredContactMethod: "Phone",
      fundingOptions: "Local Authority",
      localAuthorityId: "1065940",
      staffPreferences: "Female",
      otherPreferences: [
        "• Staff must be trained in epilepsy management and administration of rescue medication.",
        "• Calm, patient, child-centred approach required.",
        "• Non-smoker preferred.",
        "• Consistency of staff important to reduce anxiety and promote routine.",
        "• Staff must follow parental guidance at all times.",
      ].join("\n"),
    },
  },
};
