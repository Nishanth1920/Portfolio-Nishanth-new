import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { PortfolioProvider } from '../context/PortfolioContext';
import AdminLogin from './AdminLogin';
import AuthWrapper from './AuthWrapper';
import AdminDashboard from './AdminDashboard';
import EditPersonalInfo from './EditPersonalInfo';
import EditSkills from './EditSkills';
import EditExperience from './EditExperience';
import EditProjects from './EditProjects';
import EditSiteContent from './EditSiteContent';
import EditColors from './EditColors';

export default function AdminApp() {
  const [checking, setChecking] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setLoggedIn(!!session);
      setChecking(false);
    });
  }, []);

  if (checking) return null;

  if (!loggedIn) {
    return (
      <Routes>
        <Route path="login" element={<AdminLogin onLogin={() => setLoggedIn(true)} />} />
        <Route path="*" element={<Navigate to="/admin/login" replace />} />
      </Routes>
    );
  }

  return (
    <AuthWrapper>
      <PortfolioProvider>
        <Routes>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="personal-info" element={<EditPersonalInfo />} />
          <Route path="skills" element={<EditSkills />} />
          <Route path="experience" element={<EditExperience />} />
          <Route path="projects" element={<EditProjects />} />
          <Route path="site-content" element={<EditSiteContent />} />
          <Route path="colors" element={<EditColors />} />
          <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
        </Routes>
      </PortfolioProvider>
    </AuthWrapper>
  );
}
