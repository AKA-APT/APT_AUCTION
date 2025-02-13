import { useQueryClient } from '@tanstack/react-query';

const redirectUri = `${window.location.origin}/oauth/login/kakao`;
const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${
  import.meta.env.VITE_REST_API_KEY
}&redirect_uri=${redirectUri}&response_type=code`;

export const useKakaoLogin = () => {
  const queryClient = useQueryClient();

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
        queryClient.invalidateQueries({ queryKey: ['user'] });
      }
    } catch (error) {
      console.error('Logout error:', error);
      alert('로그아웃 중 오류가 발생했습니다.');
    }
  };

  return { login, logout };
};
