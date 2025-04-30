import { useState } from 'react';

export function FilterBar({
  failedBidCount,
  setFailedBidCount,
}: {
  failedBidCount: number;
  setFailedBidCount: (value: number) => void;
}) {
  const [filterList, setFilterList] = useState([]);

  return (
    <div className="fixed right-0 z-10 top-16">
      <div className="p-2 rounded-bl-md bg-slate-100">
        <div>
          <button
            disabled
            className="px-4 py-2 ml-2 text-white bg-blue-500 rounded-lg shadow-md"
          >
            최소 유찰횟수
          </button>
          <select
            className="px-4 py-2 ml-2 font-bold text-black bg-white rounded-lg shadow-md"
            onChange={(e) => setFailedBidCount(Number(e.target.value))}
            value={failedBidCount}
          >
            <option value="0">없음</option>
            <option value="1">1회 이상</option>
            <option value="2">2회 이상</option>
            <option value="3">3회 이상</option>
            <option value="4">4회 이상</option>
            <option value="5">5회 이상</option>
          </select>
        </div>
      </div>
    </div>
  );
}
