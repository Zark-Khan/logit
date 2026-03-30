import LoginForm        from "../components/auth/LoginForm";
import RegisterForm     from "../components/auth/RegisterForm";
import ForgotPassword   from "../components/auth/ForgotPassword";
import VerifyOTP        from "../components/auth/VerifyOTP";
import SetNewPassword   from "../components/auth/SetNewPassword";
import PasswordReset    from "../components/auth/PasswordReset";
import { AnimatePresence } from "framer-motion";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";

export default function AuthPage() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const onNavigate = (screen) => navigate(`/auth/${screen}`);

  return (
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route index element={<Navigate to="login" replace />} />
          <Route path="login"            element={<LoginForm       onNavigate={onNavigate} />} />
          <Route path="register"         element={<RegisterForm    onNavigate={onNavigate} />} />
          <Route path="forgot-password"  element={<ForgotPassword  onNavigate={onNavigate} />} />
          <Route path="verify-otp"       element={<VerifyOTP       onNavigate={onNavigate} />} />
          <Route path="set-new-password" element={<SetNewPassword  onNavigate={onNavigate} />} />
          <Route path="password-reset"   element={<PasswordReset   onNavigate={onNavigate} />} />
        </Routes>
      </AnimatePresence>
  );
}