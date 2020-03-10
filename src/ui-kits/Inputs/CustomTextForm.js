import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { AddButton } from '../Buttons';

import './styles/CustomTextForm.scss';

export class CustomTextForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: props.inputValue,
    };
  }

  componentDidUpdate(prevProps) {
    const { inputValue } = this.props;

    if(!prevProps.inputValue && inputValue !== prevProps.inputValue) {
      this.setState({ inputValue });
    }
  }
  

  onChange = e => this.setState({ inputValue: e.target.value });

  onSubmit = e => {
    e.preventDefault();

    const { onSubmit } = this.props;
    const { inputValue } = this.state;

    onSubmit(inputValue);
  };

  render() {
    const { className, buttonContent } = this.props;
    const { inputValue } = this.state;

    return (
      <form className="custom-form" onSubmit={this.onSubmit}>
        <textarea
          value={inputValue}
          onChange={this.onChange}
          placeholder="enter a title for this card"
          className={classNames('custom-form__input-text', className)}
        />
        <AddButton type="submit">{buttonContent}</AddButton>
      </form>
    );
  }
}

CustomTextForm.propTypes = {
  className: PropTypes.string,
  rows: PropTypes.number,
  onSubmit: PropTypes.func,
  buttonContent: PropTypes.string,
  inputValue: PropTypes.string,
};

CustomTextForm.defaultProps = {
  className: '',
  rows: 4,
  onSubmit: () => {},
  buttonContent: 'Create task',
  inputValue: '',
};
