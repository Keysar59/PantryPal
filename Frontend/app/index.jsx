import { useEffect, useState } from 'react';
import { useRouter  } from 'expo-router';
const communication = require('../src/services/communication');

export default function AuthPage() {
  const router = useRouter(); // Use useRouter instead of direct import

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = communication.checkStatus();
        if (response.status === 200) {
          router.replace('/home');
        } else {
          router.replace('/login');
        }
      } catch (error) {
        console.error('Auth check error:', error);
        router.replace('/login');
      }
    };

    checkAuthStatus();
  }, [router]); // Add router as a dependency

  return null; // No UI needed, just redirects

}
