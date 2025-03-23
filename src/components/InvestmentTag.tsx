import { useAuctionInvestmentTags } from '@/hooks/queries/useAuctionInvestmentTags';
import { Tooltip } from 'react-tooltip';

export function InvestmentTags({ auctionId }: { auctionId: string }) {
  const { data: investmentTags } = useAuctionInvestmentTags(auctionId);

  return (
    <div className="flex flex-wrap gap-2">
      {investmentTags.map((tag) => (
        <InvestmentTag
          key={tag.id}
          name={tag.name}
          description={tag.description}
        />
      ))}
    </div>
  );
}

const tagColors = {
  수익형: { bgColor: 'bg-green-600', borderColor: 'border-green-700' },
  장기투자: { bgColor: 'bg-blue-600', borderColor: 'border-blue-700' },
  연금형: { bgColor: 'bg-yellow-600', borderColor: 'border-yellow-700' },
  저위험: { bgColor: 'bg-gray-600', borderColor: 'border-gray-700' },
  고급주거: { bgColor: 'bg-purple-600', borderColor: 'border-purple-700' },
  자가우선: { bgColor: 'bg-indigo-600', borderColor: 'border-indigo-700' },
  임대사업: { bgColor: 'bg-teal-600', borderColor: 'border-teal-700' },
  정부지원형: { bgColor: 'bg-blue-500', borderColor: 'border-blue-600' },
  고위험: { bgColor: 'bg-red-600', borderColor: 'border-red-700' },
  단기투자: { bgColor: 'bg-orange-600', borderColor: 'border-orange-700' },
  갭투자: { bgColor: 'bg-pink-600', borderColor: 'border-pink-700' },
  재개발: { bgColor: 'bg-yellow-700', borderColor: 'border-yellow-800' },
  재건축: { bgColor: 'bg-green-700', borderColor: 'border-green-800' },
  분양권: { bgColor: 'bg-amber-600', borderColor: 'border-amber-700' },
  상업용부동산: { bgColor: 'bg-cyan-600', borderColor: 'border-cyan-700' },
  공유오피스: { bgColor: 'bg-blue-700', borderColor: 'border-blue-800' },
  생애최초: { bgColor: 'bg-violet-600', borderColor: 'border-violet-700' },
  친환경: { bgColor: 'bg-lime-600', borderColor: 'border-lime-700' },
  소형부동산: { bgColor: 'bg-emerald-600', borderColor: 'border-emerald-700' },
  호텔숙박업: { bgColor: 'bg-rose-600', borderColor: 'border-rose-700' },
  공유주택: { bgColor: 'bg-fuchsia-600', borderColor: 'border-fuchsia-700' },
  테마형부동산: { bgColor: 'bg-indigo-700', borderColor: 'border-indigo-800' },
  이색부동산: { bgColor: 'bg-purple-700', borderColor: 'border-purple-800' },
  공장산업단지: { bgColor: 'bg-gray-700', borderColor: 'border-gray-800' },
  물류센터: { bgColor: 'bg-sky-600', borderColor: 'border-sky-700' },
  상업지구개발: { bgColor: 'bg-red-700', borderColor: 'border-red-800' },
  특수상업부동산: { bgColor: 'bg-amber-700', borderColor: 'border-amber-800' },
  토지투자: { bgColor: 'bg-green-800', borderColor: 'border-green-900' },
  농지투자: { bgColor: 'bg-lime-700', borderColor: 'border-lime-800' },
  임야투자: { bgColor: 'bg-emerald-700', borderColor: 'border-emerald-800' },
};

export const tagInfo = {
  1: {
    name: '수익형',
    description: '월세, 리스 수익을 기반으로 안정적인 현금 흐름 확보',
  },
  2: { name: '장기투자', description: '가치 상승을 기다리며 장기간 보유' },
  3: { name: '연금형', description: '노후 대비를 위한 부동산 연금 설계' },
  4: { name: '저위험', description: '공실률이 낮고 입지가 탄탄한 부동산 선호' },
  5: { name: '고급주거', description: '프리미엄 아파트, 주택을 장기 보유' },
  6: {
    name: '자가우선',
    description: '실거주 목적이 우선, 이후 가치 상승 고려',
  },
  7: {
    name: '임대사업',
    description: '다세대, 원룸, 오피스텔을 다수 보유하여 안정적 수익 창출',
  },
  8: {
    name: '정부지원형',
    description: '공공 임대주택, 장기전세주택 등 정책적 혜택을 활용',
  },
  9: { name: '고위험', description: '변동성이 높은 지역과 부동산에 투자' },
  10: {
    name: '단기투자',
    description: '단기간 내 차익 실현을 목표로 하는 투자',
  },
  11: { name: '갭투자', description: '적은 자본으로 레버리지를 활용해 매수' },
  12: { name: '재개발', description: '신축 예정 지역을 미리 선점하여 투자' },
  13: {
    name: '재건축',
    description: '오래된 아파트를 새롭게 개발하는 프로젝트 투자',
  },
  14: { name: '분양권', description: '청약 당첨 후 프리미엄을 노린 거래' },
  15: {
    name: '상업용부동산',
    description: '오피스, 상가, 공장, 창고 등에 투자',
  },
  16: { name: '공유오피스', description: '스타트업·프리랜서를 위한 공간 임대' },
  17: {
    name: '생애최초',
    description: '첫 부동산 투자로 실거주+자산 형성 목표',
  },
  18: {
    name: '친환경',
    description: 'ESG, 태양광 주택, 에너지 절감형 부동산 선호',
  },
  19: {
    name: '소형부동산',
    description: '오피스텔, 도시형 생활주택 등 소규모 부동산 선호',
  },
  20: { name: '호텔숙박업', description: '에어비앤비, 모텔, 리조트 등 운영' },
  21: {
    name: '공유주택',
    description: '쉐어하우스, 코리빙(Co-living) 공간 투자',
  },
  22: {
    name: '테마형부동산',
    description: '실버타운, 한옥, 펜션, 캠핑장 등 특화된 부동산 투자',
  },
  23: {
    name: '이색부동산',
    description: '와이너리, 목장, 골프장, 레저시설 등 특수 부동산',
  },
  24: {
    name: '공장산업단지',
    description: '물류창고, 공장, 제조업 부동산 선호',
  },
  25: {
    name: '물류센터',
    description: '전자상거래 증가로 물류 창고 및 유통센터 확보',
  },
  26: { name: '상업지구개발', description: '도심 내 상권 활성화 지역 투자' },
  27: {
    name: '특수상업부동산',
    description: '병원, 학원, 카페, 프랜차이즈 매장 등',
  },
  28: { name: '토지투자', description: '개발 가능성이 높은 땅에 투자' },
  29: {
    name: '농지투자',
    description: '귀농 목적, 태양광 발전, 스마트팜 운영 목적',
  },
  30: { name: '임야투자', description: '숲, 산을 활용한 친환경 개발' },
} as Record<number, { name: string; description: string }>;

export function InvestmentTag({
  name,
  description,
}: {
  name: string;
  description: string;
}) {
  const tagName = name as keyof typeof tagColors;
  return (
    <>
      <Tooltip id={name} place="top" />
      <div
        data-tooltip-id={name}
        data-tooltip-content={description}
        className={`${tagColors[tagName].bgColor} ${tagColors[tagName].borderColor} rounded-full px-2 py-1 text-xs text-white`}
      >
        {name}
      </div>
    </>
  );
}
