import React from "react";
import { SvgIcon } from "@mui/material";

// Thin line icons matching the Figma design (MUI's set is filled/heavier).
// fill is set via sx because MuiSvgIcon's CSS `fill: currentColor` beats the attribute.
const LineIcon = ({ children, size = 24, sx = {} }) => (
  <SvgIcon
    sx={{ fontSize: size, fill: "none", ...sx }}
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.75}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </SvgIcon>
);

export const CheckCircleIcon = (props) => (
  <LineIcon {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="m8.5 12 2.5 2.5 4.5-5" />
  </LineIcon>
);

export const BoltIcon = (props) => (
  <LineIcon {...props}>
    <path d="M13 2 4 14h8l-1 8 9-12h-8l1-8z" />
  </LineIcon>
);

export const MoonIcon = (props) => (
  <LineIcon {...props}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </LineIcon>
);

export const ClockIcon = (props) => (
  <LineIcon {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </LineIcon>
);

export const CalendarIcon = (props) => (
  <LineIcon {...props}>
    <rect x="4" y="5" width="16" height="16" rx="2" />
    <path d="M16 3v4M8 3v4M4 11h16M8 15h2" />
  </LineIcon>
);

export const BookOpenIcon = (props) => (
  <LineIcon {...props}>
    <path d="M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2z" />
    <path d="M22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7z" />
  </LineIcon>
);

export const FlaskIcon = (props) => (
  <LineIcon {...props}>
    <path d="M10 2v7.5L4.5 19a2 2 0 0 0 1.7 3h11.6a2 2 0 0 0 1.7-3L14 9.5V2" />
    <path d="M8.5 2h7M7 16h10" />
  </LineIcon>
);

export const SquarePenIcon = (props) => (
  <LineIcon {...props}>
    <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.4 2.6a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4z" />
  </LineIcon>
);

export const ClipboardCheckIcon = (props) => (
  <LineIcon {...props}>
    <rect x="8" y="2" width="8" height="4" rx="1" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <path d="m9 14 2 2 4-4" />
  </LineIcon>
);
