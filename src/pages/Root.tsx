import React from 'react';
import { Link } from 'react-router-dom';
import aptLogo from '../assets/apt.png';

const Root = () => {
  return (
    <div>
      {/* 상단 메인 네비게이션 */}
      <nav
        style={{
          padding: '0.5rem 1rem',
          borderBottom: '1px solid #e0e0e0',
          backgroundColor: 'white',
        }}
      >
        <ul
          style={{
            listStyle: 'none',
            display: 'flex',
            gap: '2rem',
            margin: 0,
            padding: 0,
            alignItems: 'center',
          }}
        >
          <li>
            <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
              <img src={aptLogo} alt="APT 로고" style={{ height: '24px' }} />
            </Link>
          </li>
          <li>
            <Link
              to="/apartment"
              style={{ textDecoration: 'none', color: '#666' }}
            >
              아파트
            </Link>
          </li>
          <li>
            <Link
              to="/auction"
              style={{ textDecoration: 'none', color: '#666' }}
            >
              경매
            </Link>
          </li>
        </ul>
      </nav>

      {/* 서브 네비게이션 */}
      <div
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: 'white',
          borderBottom: '1px solid #e0e0e0',
        }}
      >
        <ul
          style={{
            listStyle: 'none',
            display: 'flex',
            gap: '1.5rem',
            margin: 0,
            padding: 0,
            alignItems: 'center',
          }}
        >
          <li style={{ fontWeight: 'bold', color: '#1a73e8' }}>종합검색</li>
          <li style={{ color: '#666' }}>지도로 찾기</li>
          <li style={{ color: '#666' }}>즐겨찾기</li>
          <li style={{ color: '#666' }}>매각통계</li>
        </ul>
      </div>

      {/* 메인 컨텐츠 영역 */}
      <div style={{ display: 'flex', padding: '1rem', gap: '1rem' }}>
        {/* 왼쪽 필터 영역 */}
        <div
          style={{
            width: '280px',
            backgroundColor: 'white',
            border: '1px solid #e0e0e0',
            borderRadius: '4px',
            padding: '1rem',
          }}
        >
          {/* 필터 영역 */}
        </div>

        {/* 오른쪽 메인 컨텐츠 영역 */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              backgroundColor: 'white',
              border: '1px solid #e0e0e0',
              borderRadius: '4px',
              padding: '1rem',
            }}
          >
            {/* 메인 컨텐츠가 들어갈 자리 */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Root;
