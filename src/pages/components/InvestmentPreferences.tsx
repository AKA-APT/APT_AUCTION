export function InvestmentPreferences() {
  const preferences = ['수익형', '장기투자', '고위험'];

  return (
    <div className="my-8 rounded-lg bg-gray-100 p-4 shadow-md">
      <h2 className="mb-4 text-2xl font-bold">투자 성향</h2>
      <div className="flex flex-wrap gap-2">
        {preferences.map((preference, index) => (
          <span
            key={index}
            className="rounded-full bg-blue-200 px-3 py-1 text-blue-800"
          >
            {preference}
          </span>
        ))}
      </div>
    </div>
  );
}
