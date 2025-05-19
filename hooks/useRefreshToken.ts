import { useEffect, useState } from 'react';

export const useRefreshToken = () => {
  const [refreshTokenLoading, setRefreshTokenLoading] = useState(false);
  const [refreshTokenError, setRefreshTokenError] = useState<string | null>(null);

  useEffect(() => {
    const refreshToken = async () => {
      setRefreshTokenLoading(true);
      setRefreshTokenError(null);
      const token = localStorage.getItem('auth_token');

      if (!token) {
        setRefreshTokenLoading(false);
        return;
      }

      try {
        const refreshRes = await fetch('/api/auth/refresh', { // Replace with your actual refresh token endpoint
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });

        if (!refreshRes.ok) {
          const errorData = await refreshRes.json();
          setRefreshTokenError(errorData.message || 'Failed to refresh token');
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user');
          window.location.href = '/auth/login'; // Redirect to login
          return;
        }

        const refreshData = await refreshRes.json();
        localStorage.setItem('auth_token', refreshData.token);
        // Optionally update user data if the refresh endpoint returns user info
        // localStorage.setItem('user', JSON.stringify(refreshData.user));
      } catch (error: any) {
        setRefreshTokenError(error.message || 'An error occurred while refreshing token');
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
        window.location.href = '/auth/login'; // Redirect to login
      } finally {
        setRefreshTokenLoading(false);
      }
    };

    // Refresh token every 5 minutes (adjust as needed)
    const intervalId = setInterval(refreshToken, 5 * 60 * 1000);

    // Initial refresh on component mount
    refreshToken();

    return () => clearInterval(intervalId); // Clean up interval on unmount
  }, []);

  return { refreshTokenLoading, refreshTokenError };
};
