import { LoginResponse } from '@/models/user';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function LoginListener() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleAuthCode = async (code: string) => {
    try {
      const response = await fetch(`/api/oauth/kakao/callback?code=${code}`, {
        credentials: 'include',
      });

      if (response.ok) {
        const data: LoginResponse = await response.json();

        if (data.message === 'Login successful' && data.user) {
          queryClient.invalidateQueries({ queryKey: ['user'] });
          navigate('/');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('로그인 중 오류가 발생했습니다.');
    }
  };

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

  return null;
}
