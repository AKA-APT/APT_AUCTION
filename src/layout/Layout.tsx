import { Link } from 'react-router-dom';
import aptLogo from '@/assets/apt.png';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white border-b">
        <div className="flex items-center justify-between h-16 px-4">
          <Link to="/">
            <img src={aptLogo} alt="APT 로고" className="w-auto h-8" />
          </Link>
          <button className="px-4 py-2 text-sm text-black bg-yellow-400 rounded-lg">
            카카오로 시작하기
          </button>
        </div>
      </header>
      <main className="flex-1 bg-gray-50">{children}</main>
    </div>
  );
}
