import { useEffect } from 'react';

export default function KakaoCallback() {
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');
    if (code) {
      window.opener?.postMessage({ type: 'KAKAO_LOGIN', code }, '*');
      window.close();
    }
  }, []);

  return <div>로그인 처리중...</div>;
}
