import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { AddButton } from '../Buttons'

import './styles/CustomTextForm.scss';

export class CustomTextForm extends PureComponent {
  state = {
    inputValue: ''
  }

  onChange = (e) => this.setState({ inputValue: e.target.value })

  onSubmit = (e) => {
    e.preventDefault();

    const { onSubmit } = this.props;
    const { inputValue } = this.state;

    onSubmit(inputValue);
  }

  render() {
    const { className, rows, ...props } = this.props;
    const { inputValue } = this.state;

    return (
      <form className="custom-form" onSubmit={this.onSubmit}>
        <textarea
          value={inputValue}
          onChange={this.onChange}
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

