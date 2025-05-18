import { useUser } from '@/hooks/Auth/useUser';

export function UserProfile() {
  const { data: user } = useUser();
  return (
    <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-md">
      <div className="flex items-center">
        <img
          src={user?.profileImage}
          alt="User Profile"
          className="object-cover w-24 h-24 mr-4 rounded-full"
        />
        <div>
          <h2 className="text-xl font-bold">{user?.nickname}님</h2>
          <p className="text-gray-600">USERID: {user?.providerId}</p>
        </div>
      </div>
    </div>
  );
}
