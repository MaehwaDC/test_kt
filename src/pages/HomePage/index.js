
import React, { PureComponent } from 'react'
import TaskList from '../../components/TaskList';
import Paginator from '../../components/Pagintor';

import './index.scss';

class HomePage extends PureComponent {
  render() {
    return (
      <div className="content-wrapper content">
        <div className="content__item">
          <TaskList />
        </div>
        <div className="content__item">
          <Paginator count={12} />
        </div>
      </div>
    );
  }
}

export default HomePage;
