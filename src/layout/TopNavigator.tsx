import { Link } from 'react-router-dom';
import aptLogo from '@/assets/apt.png';
import { useKakaoLogin } from '@/hooks/Auth/useKakaoLogin';

export default function TopNavigator({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, login, logout } = useKakaoLogin();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white border-b">
        <div className="flex items-center justify-between h-16 px-4">
          <Link to="/">
            <img src={aptLogo} alt="APT 로고" className="w-auto h-8" />
          </Link>
          {user ? (
            <div className="flex items-center gap-4">
              <span>{user.nickname}</span>
              <button
                onClick={logout}
                className="px-4 py-2 text-sm text-black bg-gray-200 rounded-lg"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <button
              onClick={login}
              className="px-4 py-2 text-sm text-black bg-[#FEE500] rounded-lg"
            >
              카카오로 시작하기
            </button>
          )}
        </div>
      </header>
      <main className="flex-1 bg-gray-50">{children}</main>
    </div>
  );
}
