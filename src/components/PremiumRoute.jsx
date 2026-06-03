import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function PremiumRoute({ children }) {
  const { currentUser, userProfile, isAdmin } = useAuth();

  if (!currentUser && !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  // If they are not admin and their profile says they are not premium, redirect to upgrade paywall.
  if (!isAdmin && userProfile && !userProfile.isPremium) {
    return <Navigate to="/upgrade" replace />;
  }

  return children;
}
