
import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import qs from 'query-string';

import TaskList from '../../components/TaskList';
import Paginator from '../../components/Pagintor';

import { createTask, deleteTask, editTask } from '../../store/tasks/actions';

import './index.scss';

class HomePage extends PureComponent {
  render() {
    const { 
      taskList,
      createTask,
      deleteTask,
      editTask,
      location,
    } = this.props;

    const { page = 1 } = qs.parse(location.search);

    return (
      <div className="content-wrapper content">
        <div className="content__item">
          <TaskList 
            createTask={createTask} 
            deleteTask={deleteTask} 
            editTask={editTask} 
            list={taskList}
          />
        </div>
        <div className="content__item">
          <Paginator current={page} count={12} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  taskList: state.tasks.list,
})

const mapDispatchToProps = {
  createTask,
  deleteTask,
  editTask,
}

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
)

export default enhance(HomePage);
