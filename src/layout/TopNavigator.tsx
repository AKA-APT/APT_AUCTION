import { Link } from 'react-router-dom';
import aptLogo from '@/assets/apt.png';
import { useKakaoLogin } from '@/hooks/Auth/useKakaoLogin';
import { useUser } from '@/hooks/Auth/useUser';

export default function TopNavigator({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: user } = useUser();
  const { login, logout } = useKakaoLogin();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-white">
        <div className="flex h-16 items-center justify-between px-4">
          <Link to="/">
            <img src={aptLogo} alt="APT 로고" className="h-8 w-auto" />
          </Link>
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/my-page">{user.nickname}</Link>
              <button
                onClick={logout}
                className="rounded-lg bg-gray-200 px-4 py-2 text-sm text-black"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <button
              onClick={login}
              className="rounded-lg bg-[#FEE500] px-4 py-2 text-sm text-black"
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
