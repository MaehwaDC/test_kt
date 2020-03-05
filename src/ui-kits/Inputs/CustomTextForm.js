import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { AddButton } from '../Buttons'

import './styles/CustomTextForm.scss';

export class CustomTextForm extends PureComponent {
  onSubmit = (e) => {
    e.preventDefault();

    const { onSubmit } = this.props;
    onSubmit();
  }
  render() {
    const { className, rows, ...props } = this.props;

    return (
      <form className="custom-form" onSubmit={this.onSubmit}>
        <textarea
          placeholder="enter a title for this card"
          className={classNames('custom-form__input-text', className)} 
          {...props}
        />
        <AddButton type="submit">
          Create task
        </AddButton>
      </form>
    );
  }
};

CustomTextForm.propTypes = {
  className: PropTypes.string,
  rows: PropTypes.number,
  onSubmit: PropTypes.func,
}

CustomTextForm.defaultProps = {
  className: '',
  rows: 4,
  onSubmit: () => {},
}

