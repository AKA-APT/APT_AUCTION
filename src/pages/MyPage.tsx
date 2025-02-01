import React from 'react';

function FavoriteListings() {
  const listings = [
    {
      id: 1,
      image: 'https://via.placeholder.com/150',
      title: '반포자이',
      description: '3룸, 2욕실',
      price: '최저낙찰가: 15억',
      times: '유찰횟수: 2회',
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/150',
      title: '요진와이시티',
      description: '4룸, 3욕실',
      price: '최저낙찰가: 20억',
      times: '유찰횟수: 1회',
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/150',
      title: '래미안퍼스티지',
      description: '2룸, 1욕실',
      price: '최저낙찰가: 10억',
      times: '유찰횟수: 3회',
    },
    {
      id: 4,
      image: 'https://via.placeholder.com/150',
      title: '잠실엘스',
      description: '5룸, 4욕실',
      price: '최저낙찰가: 25억',
      times: '유찰횟수: 0회',
    },
  ];

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4">즐겨찾기한 매물</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {listings.map((listing) => (
          <div key={listing.id} className="border rounded-lg overflow-hidden shadow-lg">
            <img src={listing.image} alt={listing.title} className="w-full h-32 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold text-lg">{listing.title}</h3>
              <p className="text-gray-600">{listing.description}</p>
              <p className="text-gray-600">{listing.price}</p>
              <p className="text-gray-600">{listing.times}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecommendedListings() {
  const listings = [
    {
      id: 1,
      image: 'https://via.placeholder.com/150',
      title: '서초아이파크',
      description: '3룸, 2욕실',
      price: '최저낙찰가: 15억',
      times: '유찰횟수: 2회',
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/150',
      title: '용산더프라임',
      description: '4룸, 3욕실',
      price: '최저낙찰가: 20억',
      times: '유찰횟수: 1회',
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/150',
      title: '마포래미안푸르지오',
      description: '2룸, 1욕실',
      price: '최저낙찰가: 10억',
      times: '유찰횟수: 3회',
    },
  ];

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4">추천 매물</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {listings.map((listing) => (
          <div key={listing.id} className="border rounded-lg overflow-hidden shadow-lg">
            <img src={listing.image} alt={listing.title} className="w-full h-32 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold text-lg">{listing.title}</h3>
              <p className="text-gray-600">{listing.description}</p>
              <p className="text-gray-600">{listing.price}</p>
              <p className="text-gray-600">{listing.times}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function UserProfile() {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-md">
      <div className="flex items-center">
        <img
          src="https://via.placeholder.com/100"
          alt="User Profile"
          className="w-24 h-24 rounded-full mr-4"
        />
        <div>
          <h2 className="text-xl font-bold">최원빈님</h2>
          <p className="text-gray-600">zad1264@naver.com</p>
        </div>
      </div>
      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md">
        내 투자성향 알아보기
      </button>
    </div>
  );
}

function InvestmentPreferences() {
  const preferences = ['수익형', '장기투자', '고위험'];

  return (
    <div className="my-8 p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">투자 성향</h2>
      <div className="flex flex-wrap gap-2">
        {preferences.map((preference, index) => (
          <span key={index} className="px-3 py-1 bg-blue-200 text-blue-800 rounded-full">
            {preference}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function MyPage() {
  return (
    <div className="container mx-auto p-4">
      <UserProfile />
      <InvestmentPreferences />
      <FavoriteListings />
      <RecommendedListings />
      <div className='p-8'></div>
    </div>
  );
}