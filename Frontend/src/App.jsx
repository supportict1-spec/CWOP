import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminRoute from '@/components/AdminRoute';

// Auth pages
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import VerifyAccount from './pages/VerifyAccount';

// Layout
import AppLayout from './components/layout/AppLayout';

// Pages
import Home from './pages/Home';
import DepartmentSummary from './pages/DepartmentSummary';
import Hospitals from './pages/Hospitals';
import Workforce from './pages/Workforce';
import Attendance from './pages/Attendance';
import Shifts from './pages/Shifts';
import ShiftCalendar from './pages/ShiftCalendar';
import Staffing from './pages/Staffing';
import Compliance from './pages/Compliance';
import Fatigue from './pages/Fatigue';
import Emergency from './pages/Emergency';
import Analytics from './pages/Analytics';
import AuditLogs from './pages/AuditLogs';
import UserManagement from './pages/UserManagement';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-cwop-canvas">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-cwop-lavender border-t-cwop-indigo rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground font-medium">Loading CWOP...</p>
        </div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/verify-account" element={<VerifyAccount />} />

      <Route element={<ProtectedRoute unauthenticatedElement={<Navigate to="/login" replace />} />}>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/department-summary" element={<DepartmentSummary />} />
          <Route path="/hospitals" element={<Hospitals />} />
          <Route path="/workforce" element={<Workforce />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/shifts" element={<Shifts />} />
          <Route path="/shift-calendar" element={<ShiftCalendar />} />
          <Route path="/staffing" element={<Staffing />} />
          <Route path="/compliance" element={<Compliance />} />
          <Route path="/fatigue" element={<Fatigue />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/audit" element={<AdminRoute><AuditLogs /></AdminRoute>} />
          <Route path="/users" element={<AdminRoute><UserManagement /></AdminRoute>} />
        </Route>
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App