

import React from 'react';
import classNames from 'classnames';

import './styles/CustomCheckBox.scss';

export const CustomCheckBox = ({ children, onChange, checked, className }) => (
  <div 
    className={classNames(
      className,
      "custom-check-box", 
      { 'custom-check-box_checked': checked }
    )} 
    onClick={onChange}
  >
    <input type="checkbox" checked={checked}>
      {children}
    </input>
  </div>
)

