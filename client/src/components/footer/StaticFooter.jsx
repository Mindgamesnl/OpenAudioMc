import React from 'react';
import './staticFooter.css';

export function StaticFooter(props) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div {...props} className="staticFooter">
      {props.children}
    </div>
  );
}
