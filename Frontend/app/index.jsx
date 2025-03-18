import { useEffect, useState } from 'react';
import { router } from 'expo-router';

import { SERVER_URL } from '../constants/network';

const checkAuthStatus = async () => {
  console.log("indexing")
  try {
    console.log("sending")
    const response = await fetch(`${SERVER_URL}auth/status`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Ensures cookies are sent
    });
    console.log("respond:", response)

    if (response.ok) {
      router.replace('/home'); // Redirect if authenticated
    } else {
      router.replace('/login'); // Redirect to login if not authenticated
    }
  } catch (error) {
    console.error('Auth check error:', error);
    router.replace('/login');
  }
};

export default function AuthPage() {
  useEffect(() => {
    checkAuthStatus();
  }, []);

  return null; // No UI needed, just redirects
}
