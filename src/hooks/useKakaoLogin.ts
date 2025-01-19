import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const redirectUri = 'http://localhost:8080/api/oauth/kakao/callback';
const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${
  import.meta.env.VITE_REST_API_KEY
}&redirect_uri=${redirectUri}&response_type=code`;

interface KakaoUser {
  profileImage?: string;
  nickname?: string;
  email?: string;
}

export const useKakaoLogin = () => {
  const [user, setUser] = useState<KakaoUser | null>(null);
  const navigate = useNavigate();

  const login = async () => {
    window.open(kakaoAuthUrl);
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
      // 인증 코드를 서버로 전송
      const response = await fetch(`/api/oauth/kakao/callback?code=${code}`, {
        credentials: 'include',
      });
      // const response = await fetch(`/api/oauth/kakao/callback?code=${code}`, {
      //   method: 'POST',
      //   credentials: 'include',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ code }),
      // });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        // data로 이미지, 닉네임, 이메일 정보를 받아올 수 있음

        navigate('/');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('로그인 중 오류가 발생했습니다.');
    }
  };

  // 세션 체크
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
      // checkSession();
    }
  }, []);

  return { user, login, logout };
};
