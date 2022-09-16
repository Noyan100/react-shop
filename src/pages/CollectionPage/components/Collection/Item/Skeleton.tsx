import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = () => (
  <ContentLoader
    speed={2}
    width={280}
    height={250}
    viewBox="0 0 280 250"
    backgroundColor="#f3f3f3"
    foregroundColor="#ccc">
    <rect x="0" y="0" rx="0" ry="0" width="280" height="180" />
    <rect x="0" y="195" rx="0" ry="0" width="280" height="20" />
    <rect x="0" y="230" rx="0" ry="0" width="280" height="20" />
  </ContentLoader>
);

export default Skeleton;
