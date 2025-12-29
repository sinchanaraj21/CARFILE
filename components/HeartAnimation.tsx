
import React from 'react';
import { HeartIcon } from '../constants';

const HeartAnimation: React.FC = () => {
  return (
    <div className="fixed top-5 left-6 z-50 pointer-events-none select-none">
      <div className="text-red-600 animate-heartbeat drop-shadow-sm">
        <HeartIcon className="w-8 h-8" />
      </div>
    </div>
  );
};

export default HeartAnimation;
