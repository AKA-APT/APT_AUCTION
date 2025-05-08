import { Link } from 'react-router-dom';
import { useKakaoLogin } from '@/hooks/Auth/useKakaoLogin';
import { useUser } from '@/hooks/Auth/useUser';
import { User, HomeIcon } from 'lucide-react';

export default function TopNavigator({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: user } = useUser();
  const { login, logout } = useKakaoLogin();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white border-b">
        <div className="flex items-center justify-between h-16 px-4">
          <div className="flex pl-4 gap-2 items-center">
            <HomeIcon />
            <Link to="/" className="text-xl font-bold text-gray-800">
              APT Auction
            </Link>
          </div>
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/my-page" className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>{user.nickname}</span>
              </Link>
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
