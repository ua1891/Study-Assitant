import React from 'react';

function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div>
        <div className="skeleton skeleton-title" />
        <div className="skeleton skeleton-text" />
        <div className="skeleton skeleton-text" style={{ width: '80%' }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <div className="skeleton" style={{ width: '30%', height: '16px' }} />
        <div className="skeleton" style={{ width: '20%', height: '16px' }} />
      </div>
    </div>
  );
}

export default SkeletonCard;
