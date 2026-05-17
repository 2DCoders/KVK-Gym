import { Route, Routes, Navigate } from "react-router-dom"
import Login from "./pages/login"
import Dashboard from "./pages/dashboard"
import Members from "./pages/members"
import Trainers from "./pages/trainers"
import Payments from "./pages/payments"
import Attendance from "./pages/attendance"
import Reports from "./pages/reports"
import SettingsPage from "./pages/settings"
import AdminLayout from "./layouts/admin-layout"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      
      {/* Admin Dashboard Routes */}
      <Route element={<AdminLayout><Dashboard /></AdminLayout>} path="/dashboard" />
      <Route element={<AdminLayout><Members /></AdminLayout>} path="/members" />
      <Route element={<AdminLayout><Trainers /></AdminLayout>} path="/trainers" />
      <Route element={<AdminLayout><Payments /></AdminLayout>} path="/payments" />
      <Route element={<AdminLayout><Attendance /></AdminLayout>} path="/attendance" />
      <Route element={<AdminLayout><Reports /></AdminLayout>} path="/reports" />
      <Route element={<AdminLayout><SettingsPage /></AdminLayout>} path="/settings" />
      
      {/* Redirect to dashboard */}
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  )
}

export default App
