import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { SquarePenIcon } from "../../staffOverview/LineIcons";

export const EditButton = ({ onClick }) => (
  <Button
    size="small"
    onClick={onClick}
    startIcon={<SquarePenIcon size={14} />}
    sx={{
      flexShrink: 0,
      alignSelf: "center",
      minWidth: 0,
      px: 1,
      textTransform: "none",
      fontSize: "12px",
      fontWeight: 600,
      color: "primary.main",
      "& .MuiButton-startIcon": { mr: 0.5 },
      "&:hover": { bgcolor: "rgba(14,165,233,0.08)" },
    }}
  >
    Edit
  </Button>
);

export const DetailCard = ({ label, value, sub, children, sx, onEdit }) => (
  <Box
    sx={{
      flex: 1,
      display: "flex",
      alignItems: "stretch",
      bgcolor: "#fff",
      borderRadius: "12px",
      minHeight: "72px",
      px: 2.5,
      py: 1.75,
      ...sx,
      gap: 2, // sx.gap applies to the inner content column
    }}
  >
    <Box
      sx={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "start",
        gap: sx?.gap ?? 0.5,
      }}
    >
      {label && (
        <Typography
          fontSize="10px"
          fontWeight={700}
          color="text.grey"
          textTransform="uppercase"
        >
          {label}
        </Typography>
      )}
      {value && (
        <Typography fontSize="14px" fontWeight={700} color="text.primary">
          {value}
        </Typography>
      )}
      {sub && (
        <Typography fontSize="10px" fontWeight={400} color="text.grey" mt={0.3}>
          {sub}
        </Typography>
      )}
      {children}
    </Box>
    <EditButton onClick={onEdit} />
  </Box>
);

export default DetailCard;
