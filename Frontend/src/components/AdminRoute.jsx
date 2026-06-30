import { Navigate } from 'react-router-dom';
import { useUserPermissions } from '@/hooks/useUserPermissions';

export default function AdminRoute({ children }) {
  const { isSystemAdmin } = useUserPermissions();
  if (!isSystemAdmin) return <Navigate to="/" replace />;
  return children;
}