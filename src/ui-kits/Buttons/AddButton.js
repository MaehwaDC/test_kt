import React from 'react';
import './styles/AddButton.scss';

export const AddButton = ({ children, ...props }) => {
  return (
    <button {...props} className="add-button">
      {children}
    </button>
  );
};
