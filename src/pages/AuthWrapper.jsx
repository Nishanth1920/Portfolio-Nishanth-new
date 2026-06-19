import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function AuthWrapper({ children }) {
  const [authed, setAuthed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/admin', { replace: true });
      } else {
        setAuthed(true);
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate('/admin', { replace: true });
      } else {
        setAuthed(true);
      }
    });

    return () => listener?.subscription?.unsubscribe();
  }, [navigate]);

  if (!authed) return null;

  return children;
}
