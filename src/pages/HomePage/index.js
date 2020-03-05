
import React, { PureComponent } from 'react'
import TaskList from '../../components/TaskList';

import './index.scss';

class HomePage extends PureComponent {
  render() {
    return (
      <div className="content-wrapper content">
        <TaskList />
      </div>
    );
  }
}

export default HomePage;
