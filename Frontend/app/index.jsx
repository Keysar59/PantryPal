import { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';

export default function Page() {
  const [authorized, setAuthorized] = useState(null);

  useEffect(() => {
    // Check session status
    const checkSession = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/auth/status', {
          method: 'GET',
          credentials: 'include', // Include cookies in the request
        });

        const data = await response.json();

        console.log("data:", data)

        // If authorized is false, redirect to login
        setAuthorized(data.authorized);
      } catch (error) {
        console.error('Error checking session:', error);
        setAuthorized(false); // Consider unauthorized if there's an error
      }
    };

    checkSession();
  }, []);

  // If authorization status is not yet determined, you can show a loading screen or similar
  if (authorized === null) {
    return null; // Or show a loading indicator
  }

  // If not authorized, redirect to login page
  if (!authorized) {
    return <Redirect href="/login" />;
  }

  // If authorized, render the home page or some other content
  return <Redirect href="/home" />;
}
