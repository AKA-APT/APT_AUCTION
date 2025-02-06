export function RecommendedListings() {
  const listings = [
    {
      id: 1,
      image:
        'https://i.namu.wiki/i/goz0dTitukTVa-6xVPs8Oh8O6wpRrJ9LA25pUDPD2tiocXB4dXG8RmCRlcaFE-5re5UKxSzo_yyCNmRGJhGwMA.webp',
      title: '서초아이파크',
      description: '3룸, 2욕실',
      price: '최저낙찰가: 15억',
      times: '유찰횟수: 2회',
    },
    {
      id: 2,
      image:
        'https://i.namu.wiki/i/goz0dTitukTVa-6xVPs8Oh8O6wpRrJ9LA25pUDPD2tiocXB4dXG8RmCRlcaFE-5re5UKxSzo_yyCNmRGJhGwMA.webp',
      title: '용산더프라임',
      description: '4룸, 3욕실',
      price: '최저낙찰가: 20억',
      times: '유찰횟수: 1회',
    },
    {
      id: 3,
      image:
        'https://i.namu.wiki/i/goz0dTitukTVa-6xVPs8Oh8O6wpRrJ9LA25pUDPD2tiocXB4dXG8RmCRlcaFE-5re5UKxSzo_yyCNmRGJhGwMA.webp',
      title: '마포래미안푸르지오',
      description: '2룸, 1욕실',
      price: '최저낙찰가: 10억',
      times: '유찰횟수: 3회',
    },
  ];

  return (
    <div className="my-8">
      <h2 className="mb-4 text-2xl font-bold">추천 매물</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {listings.map((listing) => (
          <div
            key={listing.id}
            className="overflow-hidden rounded-lg border shadow-lg"
          >
            <img
              src={listing.image}
              alt={listing.title}
              className="h-32 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{listing.title}</h3>
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
