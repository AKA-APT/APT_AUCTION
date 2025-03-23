import { InvestmentTag, tagInfo } from '@/components/InvestmentTag';

export function InvestmentPreferences() {
  // TODO: 태그 색깔 추가
  const preferences = [1, 3, 5, 8, 12];

  return (
    <div className="my-8 rounded-lg bg-gray-100 p-4 shadow-md">
      <h2 className="mb-4 text-2xl font-bold">투자 성향</h2>
      <div className="flex flex-wrap gap-2">
        {preferences.map((preference, index) => (
          <InvestmentTag
            key={index}
            name={tagInfo[preference].name}
            description={tagInfo[preference].description}
          />
        ))}
      </div>
    </div>
  );
}
