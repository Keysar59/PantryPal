import { useEffect, useState } from 'react';
import { useRouter  } from 'expo-router';
import axios from 'axios';
const SERVER_URL = "https://pantry-pal-git-keysar59-dev.apps.rm2.thpm.p1.openshiftapps.com/api/v1"

export default function AuthPage() {
  const router = useRouter(); // Use useRouter instead of direct import

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/auth/status`, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });

        // Ensure response status is checked properly
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
