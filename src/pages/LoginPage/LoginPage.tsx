import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import React from 'react';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegisterForm';
import PasswordRecoveryForm from './components/PasswordRecoveryForm';
import NewPasswordForm from './components/NewPasswordForm';

const supabase = createClient(
  'https://amuoysjxhphfkehwljev.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtdW95c2p4aHBoZmtlaHdsamV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4OTk3MjgsImV4cCI6MjA1ODQ3NTcyOH0.tWrkEp5lGAYJyVC008wINyYz2MkdGSNmcOD4cYlcBsM',
);

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    //return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />;
    return (
      <div>
        <RegistrationForm />
        <LoginForm />
        <PasswordRecoveryForm />
        <NewPasswordForm />
      </div>
    );
  } else {
    return <div>Logged in!</div>;
  }
}
