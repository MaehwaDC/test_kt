
import React from 'react'
import './styles/DeleteEditButton.scss';

export const DeleteEditButton = ({ mode, ...props }) => (
  <img src={`./images/${mode}.svg`} alt="delete" className="delete-button" {...props} />
)

DeleteEditButton.defaultProps = {
  mode: 'delete',
}
