import React from 'react';

function SkeletonLoading({ width, height, rounded }) {
    return (
        <div
            style={{ width: `${width}px`, height: `${height}px` }}
            className={`bg-gray-300 animate-pulse rounded-${rounded}`}
        />
    );
}

export default SkeletonLoading;
