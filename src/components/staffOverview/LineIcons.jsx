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

export const PillIcon = (props) => (
  <LineIcon {...props}>
    <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
    <path d="m8.5 8.5 7 7" />
  </LineIcon>
);

export const ClipboardPlusIcon = (props) => (
  <LineIcon {...props}>
    <rect x="8" y="2" width="8" height="4" rx="1" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <path d="M9 14h6M12 11v6" />
  </LineIcon>
);

export const FileIcon = (props) => (
  <LineIcon {...props}>
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
  </LineIcon>
);

export const DownloadIcon = (props) => (
  <LineIcon {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <path d="m7 10 5 5 5-5M12 15V3" />
  </LineIcon>
);

export const TriangleAlertIcon = (props) => (
  <LineIcon {...props}>
    <path d="m21.7 18-8-14a2 2 0 0 0-3.5 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3" />
    <path d="M12 9v4M12 17h.01" />
  </LineIcon>
);

export const RouteIcon = (props) => (
  <LineIcon {...props}>
    <circle cx="6" cy="19" r="2" />
    <path d="M8 19h8.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H16" />
    <path d="M18 3v4M20 5h-4" />
  </LineIcon>
);

export const ActivityIcon = (props) => (
  <LineIcon {...props}>
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </LineIcon>
);

export const TargetIcon = (props) => (
  <LineIcon {...props}>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </LineIcon>
);

export const ClipboardListIcon = (props) => (
  <LineIcon {...props}>
    <rect x="8" y="2" width="8" height="4" rx="1" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <path d="M12 11h4M12 16h4M8 11h.01M8 16h.01" />
  </LineIcon>
);

export const ShieldAlertIcon = (props) => (
  <LineIcon {...props}>
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    <path d="M12 8v4M12 16h.01" />
  </LineIcon>
);

export const RefreshIcon = (props) => (
  <LineIcon {...props}>
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
    <path d="M8 16H3v5" />
  </LineIcon>
);

export const PencilIcon = (props) => (
  <LineIcon {...props}>
    <path d="M21.17 6.81a1 1 0 0 0-3.98-3.98L3.84 16.17a2 2 0 0 0-.5.83l-1.32 4.35a.5.5 0 0 0 .62.62l4.35-1.32a2 2 0 0 0 .83-.5z" />
    <path d="m15 5 4 4" />
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
