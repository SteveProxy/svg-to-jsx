import { HTMLAttributes } from 'react';

import './Icon.css';

export interface IIconProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Size
   */
  size: number;
}

export function Icon({ size = 100, className = '', children }): JSX.Element {

  return (
    <span className={`icon icon--size-${size} ${className}`}>
      {children}
    </span>
  );
}
