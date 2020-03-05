
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { generateArr, random } from '../../utils/helpers';

import './index.scss';

class Paginator extends PureComponent {
  renderItem = (_, index) => {

    return (
      <Link className="pagination__page" to={index === 0 ? '/' : `/${index + 1}`}  key={random()}>
        {index + 1}
      </Link>
    );  
  }
  render() {
    const { count } = this.props
    return (
      <div className="pagination">
        {generateArr(count, this.renderItem)}
      </div>
    )
  }
}

Paginator.propTypes = {
  count: PropTypes.number,
  selected: PropTypes.number
}

Paginator.defaultProps = {
  count: 0,
  selected: 1,
}

export default Paginator;
