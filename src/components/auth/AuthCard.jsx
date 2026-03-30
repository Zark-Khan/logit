import React from "react";
import { Box, Card, CardContent, Typography, useMediaQuery, useTheme } from "@mui/material";
import LogoDesktop from "../../assets/logit-desktop.svg";
import LogoMobile from "../../assets/logit-mobile.svg";

function Logo() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box sx={{ mb: 3, display: "flex", justifyContent: "center" }}>
      <Box
        component="img"
        src={isMobile ? LogoMobile : LogoDesktop}
        alt="Logit"
      />
    </Box>
  );
}

// ─── AuthCard ─────────────────────────────────────────────────────────────────
// Props:
//   title       — heading text e.g. "Welcome Back"
//   subtitle    — subheading text e.g. "Sign in to access your account"
//   children    — form fields + button
export default function AuthCard({ title, subtitle, children }) {
  return (
    <Box className="auth-background">
      <Logo />
      <Card
        elevation={0}
        sx={{
          borderRadius: 4,
          px: { xs: 2, sm:5.125 },
          py: 4,
          maxWidth: { xs: "382px", sm: "480px" },
          width: "100%",
          boxShadow: "0 8px 40px rgba(0,0,0,0.10)",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: `linear-gradient(
              90deg,
              rgba(254,165,0,0) 0%,
              rgba(254,165,0,0.25) 25%,
              rgba(14,165,233,0.55) 50%,
              rgba(138,198,66,0.25) 75%,
              rgba(138,198,66,0) 100%
            )`,
          },
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 0,
            "&:last-child": { pb: 0 },
          }}
        >
          <Typography variant="h1" fontWeight={700} textAlign="center" gutterBottom>
            {title}
          </Typography>
          {subtitle && (
            <Typography
              variant="body1"
              color="text.secondary"
              textAlign="center"
              sx={{ mb: 3.5, px:1.9 }}
            >
              {subtitle}
            </Typography>
          )}
          {children}
        </CardContent>
      </Card>
    </Box>
  );
}