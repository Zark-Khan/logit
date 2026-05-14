import React, { useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import EditIcon from "@mui/icons-material/EditOutlined";

const SUB_TABS = [
  "Personal details",
  "Medical details",
  "Primary Contacts",
  "Advance planning",
  "Admin",
];

function DetailCard({ title, items, actionLabel = "Edit" }) {
  const isAdd = actionLabel.startsWith("+");
  return (
    <Box sx={{ mb: 6 }}>
      {/* Header Section (Outside the Box) */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1.5,
          px: 0.5,
        }}
      >
        <Typography fontSize="16px" fontWeight={700} color="text.primary">
          {title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            color: "#0EA5E9",
            cursor: "pointer",
          }}
        >
          {!isAdd && <EditIcon sx={{ fontSize: 16 }} />}
          <Typography fontSize="12px" fontWeight={700}>
            {actionLabel}
          </Typography>
        </Box>
      </Box>

      {/* Content Container */}
      <Paper
        elevation={0}
        sx={{
          p: 3.5,
          borderRadius: "16px",
          border: "1px solid rgba(138, 198, 66, 0.2)",
          bgcolor: "#FFFFFF",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
          {items.map((item, i) => (
            <Box
              key={i}
              sx={{ display: "flex", alignItems: "flex-start", gap: 8 }}
            >
              <Box sx={{ width: "240px", flexShrink: 0 }}>
                <Typography
                  fontSize="14px"
                  fontWeight={700}
                  color="text.primary"
                  sx={{ lineHeight: 1.4 }}
                >
                  {item.label}
                </Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography
                  fontSize="14px"
                  fontWeight={400}
                  color="text.primary"
                  sx={{ lineHeight: 1.6 }}
                >
                  {item.value}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Paper>
    </Box>
  );
}

export default function ClientDetailsTab({ client }) {
  const [activeSubTab, setActiveSubTab] = useState("Personal details");

  const personalDetailsSections = [
    {
      title: "Culture and religion",
      items: [
        { label: "Ethnicity", value: "White: any other White background" },
        { label: "Religion", value: "Not stated" },
        {
          label:
            "How do culture and/or religion(s) impact Margaret's care needs?",
          value:
            "There are no identified cultural or religious requirements impacting Margaret's care at this time. Care staff should remain respectful of family preferences and seek guidance from parents if any cultural needs arise.",
        },
      ],
    },
    {
      title: "Sexuality",
      items: [
        { label: "Sex", value: "Female" },
        { label: "Gender", value: "Female" },
        {
          label: "Sexual orientation",
          value: "Not applicable - Margaret is a young child.",
        },
        {
          label:
            "How does sex, gender, or sexual orientation impact Margaret's care needs?",
          value:
            "There are no specific impacts on Margaret's care needs in relation to sex or gender. Care should remain age-appropriate and child-centred at all times.",
        },
      ],
    },
    {
      title: "Life history",
      items: [
        {
          label: "Jobs and occupations",
          value:
            "Margaret is a minor and does not have any employment history. She is dependent on her parents for all aspects of care and daily living support.",
        },
        {
          label: "Important people",
          value:
            "Margaret's parents are very important to her and play a central role in her care. She receives short break support at home with at least one parent present. Parents should be kept informed of all activities, wellbeing updates, and any concerns. Their guidance should be followed regarding routines and preferences.",
        },
        {
          label: "Significant places",
          value:
            "Margaret lives at home with her family. The home environment is her primary and most familiar setting. All support is delivered within the family home on Sunday afternoons (14:00-18:00) as part of her short break provision.",
        },
        {
          label: "Other notes",
          value:
            "Margaret is receiving support under short break/respite provision. The purpose of the service is to provide supervision and engagement in activities of her choice while offering respite for her parents. Care should focus on safety, engagement, and and positive interaction.",
        },
      ],
    },
    {
      title: "Preferences",
      items: [
        {
          label: "Routines and preferences",
          value:
            "Margaret receives support every Sunday from 14:00-18:00. She benefits from structured, age-appropriate activities and responds well to consistent routines and familiar carers. Activities should be led by Margaret's interests where possible and delivered in a calm, supportive, and engaging manner.",
        },
        {
          label: "Dislikes",
          value:
            "Margaret may become unsettled by sudden changes, loud noises, or unfamiliar approaches. Carers should use a gentle tone, provide reassurance when needed, and follow parental guidance to minimise distress.",
        },
        {
          label: "Hobbies and interests",
          value:
            "Margaret enjoys engaging in activities of her choice within the home environment. This may include play-based, sensory, or interactive activities appropriate to her age and developmental needs. Carers should actively encourage participation, promote enjoyment, and support her development through positive engagement.",
        },
      ],
    },
  ];

  const medicalDetailsSections = [
    {
      title: "Health details",
      items: [
        { label: "NHS number", value: "2321415421" },
        {
          label: "Medical history",
          value:
            "Epilepsy: Margaret has a diagnosed history of Epilepsy and is under the care of a specialist pediatric consultant.",
        },
        {
          label: "Medical support",
          value: "Has no independent Margaret's medication support.",
        },
      ],
    },
    {
      title: "Allergies and intolerances",
      items: [
        {
          label: "Allergies and intolerances",
          value:
            "Allergies: [ ] Contraindicated medications: Penicillin, Ibuprofen (NSAIDs).",
        },
      ],
    },
    {
      title: "Doctor/GP",
      items: [
        { label: "GP practice name", value: "Abbey Road Medical Practice" },
        { label: "GP practice location", value: "87 Abbey St, London NW1 7JY" },
        { label: "GP's name", value: "Dr. Sarah Williams" },
        { label: "Phone number", value: "020 8475 9232" },
      ],
    },
  ];

  const primaryContactsSections = [
    {
      title: "Next / emergency contacts",
      items: [
        { label: "First name", value: "David" },
        { label: "Last name", value: "Hall" },
        { label: "Relationship", value: "Father" },
        { label: "Phone number", value: "+44 77452 943 21" },
        { label: "Email address", value: "davidhall22@margarethall.com" },
        {
          label: "Primary advocate or legal powers",
          value: "Emergency, Next of kin",
        },
        {
          label:
            "Does this contact as your next of kin or health decision maker on your behalf agree that general care communications can be shared with them via email?",
          value: "Yes",
        },
      ],
    },
    {
      title: "Next / emergency contacts",
      items: [
        { label: "First name", value: "Jane" },
        { label: "Last name", value: "Hall" },
        { label: "Relationship", value: "Mother" },
        { label: "Phone number", value: "+44 77452 943 14" },
        { label: "Email address", value: "janehall@margarethall.com" },
        {
          label: "Primary advocate or legal powers",
          value: "Emergency, Next of kin",
        },
        {
          label:
            "Does this contact as your next of kin or health decision maker on your behalf agree that general care communications can be shared with them via email?",
          value: "Yes",
        },
      ],
    },
  ];

  const advancePlanningSections = [
    {
      title: "Capacity and documentation",
      items: [
        {
          label:
            "Does the person have capacity to make their own decisions in their health and social setting?",
          value: "Yes",
        },
        { label: "Health and Welfare LPA", value: "Yes" },
        { label: "Property and Financial Affairs LPA", value: "Yes" },
        {
          label: "Do Not Attempt Cardiopulmonary Resuscitation (DNACPR)",
          value: "No",
        },
        {
          label: "Advance Decisions to Refuse Treatment (ADRT) / Living Will",
          value: "No",
        },
        {
          label:
            "Does the client have a form for Emergency Care and Treatment (ReSPECT)",
          value: "Yes",
        },
        {
          label: "Full details",
          value:
            "Margaret has full mental capacity and has appointed her parents as legal representatives for all health and welfare decisions.",
        },
      ],
    },
  ];

  const adminSections = [
    {
      title: "Identifiers",
      items: [{ label: "Unique client identity", value: "1243542" }],
    },
    {
      title: "Status",
      items: [
        { label: "Service start date", value: "01 March 2026" },
        { label: "Current status", value: "ACTIVE" },
      ],
    },
    {
      title: "Registered care",
      items: [
        { label: "Is our care part of a regulated service?", value: "Yes" },
      ],
    },
    {
      title: "Risk management",
      items: [
        {
          label:
            "Assess our care of the client's Margaret is low with our care delivery plan.",
          value: "Yes",
        },
        {
          label: "Risk level details",
          value:
            "Margaret is assessed as low risk given the current care provision. Key considerations: Epilepsy management, mobility safety, and consistent routine.",
        },
        { label: "Family live-shared home", value: "They involved" },
        {
          label:
            "What is the best thing to care for Margaret's care, in the case of a choking crisis?",
          value:
            "Call 999 immediately. Follow basic life support protocols. Contact parents immediately.",
        },
        {
          label:
            "What is the best thing to care for Margaret's care, in the case of a seizure or health condition?",
          value:
            "Follow the individual Epilepsy Management Plan. Ensure safety, time the seizure, and do not restrain. Administer rescue medication if prescribed and necessary as per plan.",
        },
      ],
    },
    {
      title: "Accessible Information Standard",
      items: [
        {
          label:
            "Does Margaret have any communication or information support needs?",
          value: "Returns as standard support",
        },
        {
          label: "Additional details",
          value: "INFORMATION IS SHARED THROUGH EMAIL TO THE PARENTS",
        },
        {
          label:
            "What is Margaret's preferred method of communication/contact?",
          value: "Phone",
        },
      ],
    },
    {
      title: "Funding arrangements",
      items: [
        {
          label: "Who is the primary source of funding",
          value: "Local authority",
        },
        { label: "Local authority ID", value: "2434241" },
      ],
    },
    {
      title: "Marketing",
      items: [
        { label: "Care preferences", value: "Simply" },
        {
          label: "Other preferences",
          value:
            "Margaret enjoys quiet activities and responds well to calm environments. Prefers familiar caregivers.",
        },
      ],
    },
  ];

  const renderContent = () => {
    switch (activeSubTab) {
      case "Personal details":
        return personalDetailsSections.map((s, i) => (
          <DetailCard key={i} title={s.title} items={s.items} />
        ));
      case "Medical details":
        return (
          <>
            {medicalDetailsSections.map((s, i) => (
              <DetailCard key={i} title={s.title} items={s.items} />
            ))}
            <DetailCard
              title="Pharmacist"
              items={[]}
              actionLabel="+ PHARMACIST"
            />
          </>
        );
      case "Primary Contacts":
        return (
          <>
            {primaryContactsSections.map((s, i) => (
              <DetailCard key={i} title={s.title} items={s.items} />
            ))}
            <DetailCard title="Other professional details" items={[]} />
          </>
        );
      case "Advance planning":
        return advancePlanningSections.map((s, i) => (
          <DetailCard key={i} title={s.title} items={s.items} />
        ));
      case "Admin":
        return adminSections.map((s, i) => (
          <DetailCard key={i} title={s.title} items={s.items} />
        ));
      default:
        return null;
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" fontWeight={700} color="text.primary">
          Client details
        </Typography>
        <Typography fontSize="14px" color="text.secondary" sx={{ mt: 0.3 }}>
          Manage information and care delivery for {client.name}.
        </Typography>
      </Box>

      {/* Sub-tabs */}
      <Box
        sx={{
          display: "flex",
          gap: 4,
          borderBottom: "1px solid #E2E8F0",
          mb: 4,
          overflowX: "auto",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {SUB_TABS.map((tab) => (
          <Box
            key={tab}
            onClick={() => setActiveSubTab(tab)}
            sx={{
              pb: 1.5,
              cursor: "pointer",
              borderBottom: activeSubTab === tab ? "2px solid #0EA5E9" : "none",
              transition: "all 0.2s ease",
            }}
          >
            <Typography
              fontSize="14px"
              fontWeight={700}
              color={activeSubTab === tab ? "#0EA5E9" : "text.secondary"}
              sx={{ whiteSpace: "nowrap" }}
            >
              {tab}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Content */}
      <Box>{renderContent()}</Box>
    </Box>
  );
}
