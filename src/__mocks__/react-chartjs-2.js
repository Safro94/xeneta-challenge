import React from 'react';

module.exports = {
  Line: React.forwardRef((props, ref) => (
    <canvas ref={ref} {...props}>
      Graph
    </canvas>
  )),
  Chart: { plugins: { register: () => null } },
};
