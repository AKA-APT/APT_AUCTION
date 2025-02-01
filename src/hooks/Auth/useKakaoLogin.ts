import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const redirectUri = 'http://localhost:3000/auth/login/kakao';
const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${
  import.meta.env.VITE_REST_API_KEY
}&redirect_uri=${redirectUri}&response_type=code`;

interface KakaoUser {
  id: number;
  nickname: string;
}

interface LoginResponse {
  message: string;
  user: SessionUser;
}

interface SessionUser {
  id: number;
  nickname: string;
  role: 'USER' | 'ADMIN';
}

export const useKakaoLogin = () => {
  const [user, setUser] = useState<KakaoUser | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // 카카오 로그인 팝업으로부터의 메시지 수신
    const handleMessage = async (event: MessageEvent) => {
      if (event.data.type === 'KAKAO_LOGIN') {
        await handleAuthCode(event.data.code);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const login = async () => {
    const popup = window.open(
      kakaoAuthUrl,
      'KakaoLogin',
      'width=600,height=800',
    );

    if (!popup) {
      alert('팝업이 차단되었습니다. 팝업 차단을 해제해주세요.');
    }
  };

  const logout = async () => {
    try {
      const response = await fetch('/api/oauth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        setUser(null);
      }
    } catch (error) {
      console.error('Logout error:', error);
      alert('로그아웃 중 오류가 발생했습니다.');
    }
  };

  const handleAuthCode = async (code: string) => {
    try {
      const response = await fetch(`/api/oauth/kakao/callback?code=${code}`, {
        credentials: 'include',
      });
      console.log(response);

      if (response.ok) {
        console.log(response);
        const data: LoginResponse = await response.json();
        console.log('Login response:', data);

        if (data.message === 'Login successful' && data.user) {
          setUser(data.user);
          navigate('/');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('로그인 중 오류가 발생했습니다.');
    }
  };

  const checkSession = async () => {
    try {
      const response = await fetch('/api/oauth/session-check', {
        credentials: 'include',
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      }
    } catch (error) {
      console.error('Session check error:', error);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      handleAuthCode(code);
    } else {
      checkSession();
    }
  }, []);

  return { user, login, logout };
};
