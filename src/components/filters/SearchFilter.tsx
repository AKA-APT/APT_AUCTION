import React from 'react';

const SearchFilter = () => {
  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '14px' }}>
          지역(소재지)
        </h4>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <select
            style={{
              flex: 1,
              padding: '0.5rem',
              borderRadius: '4px',
              border: '1px solid #e0e0e0',
            }}
          >
            <option>시도</option>
          </select>
          <select
            style={{
              flex: 1,
              padding: '0.5rem',
              borderRadius: '4px',
              border: '1px solid #e0e0e0',
            }}
          >
            <option>시군구</option>
          </select>
          <select
            style={{
              flex: 1,
              padding: '0.5rem',
              borderRadius: '4px',
              border: '1px solid #e0e0e0',
            }}
          >
            <option>읍면동</option>
          </select>
        </div>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '14px' }}>최저매각가</h4>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input
            type="text"
            placeholder="최소"
            style={{
              flex: 1,
              padding: '0.5rem',
              borderRadius: '4px',
              border: '1px solid #e0e0e0',
            }}
          />
          <span>~</span>
          <input
            type="text"
            placeholder="최대"
            style={{
              flex: 1,
              padding: '0.5rem',
              borderRadius: '4px',
              border: '1px solid #e0e0e0',
            }}
          />
        </div>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '14px' }}>유찰횟수</h4>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            style={{
              flex: 1,
              padding: '0.5rem',
              border: '1px solid #e0e0e0',
              borderRadius: '4px',
              background: 'white',
              cursor: 'pointer',
            }}
          >
            전체
          </button>
          <button
            style={{
              flex: 1,
              padding: '0.5rem',
              border: '1px solid #e0e0e0',
              borderRadius: '4px',
              background: 'white',
              cursor: 'pointer',
            }}
          >
            0회
          </button>
          <button
            style={{
              flex: 1,
              padding: '0.5rem',
              border: '1px solid #e0e0e0',
              borderRadius: '4px',
              background: 'white',
              cursor: 'pointer',
            }}
          >
            1회+
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
