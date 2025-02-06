export function UserProfile() {
  return (
    <div className="flex items-center justify-between rounded-lg bg-gray-100 p-4 shadow-md">
      <div className="flex items-center">
        <img
          src="https://via.placeholder.com/100"
          alt="User Profile"
          className="mr-4 h-24 w-24 rounded-full"
        />
        <div>
          <h2 className="text-xl font-bold">최원빈님</h2>
          <p className="text-gray-600">zad1264@naver.com</p>
        </div>
      </div>
      <button className="rounded-lg bg-blue-500 px-4 py-2 text-white shadow-md">
        내 투자성향 알아보기
      </button>
    </div>
  );
}
