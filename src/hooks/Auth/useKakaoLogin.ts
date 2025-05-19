import { httpClient } from '@/utils/http-client';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${
  import.meta.env.VITE_REST_API_KEY
}&redirect_uri=${import.meta.env.VITE_API_URL}/api/oauth/kakao/callback&response_type=code`;

export const useKakaoLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const login = () => {
    window.location.href = kakaoAuthUrl;
  };

  const logout = async () => {
    try {
      const response = await httpClient.post('/api/oauth/logout', {});

      if (response.ok) {
        await queryClient.invalidateQueries({ queryKey: ['user'] });
      }

      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
      alert('로그아웃 중 오류가 발생했습니다.');
    }
  };

  return { login, logout };
};
