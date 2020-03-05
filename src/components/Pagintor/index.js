
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { generateArr } from '../../utils/helpers';

import './index.scss';

class Paginator extends PureComponent {
  renderItem = (_, index) => {
    const { current } = this.props


    const page = index + 1;
    return (
      <Link 
        className={classNames('pagination__page', { 'pagination__seleted': +current === page })} 
        to={index === 0 ? '/' : `/?page=${page}`}  
        key={index}
      >
        {page}
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
