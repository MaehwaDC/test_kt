import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import qs from 'query-string';

import Paginator from '../../components/Pagintor';
import { CustomTextForm } from '../../ui-kits/Inputs';
import TaskCard from '../../components/TaskCard';
import {
  deleteTask,
  updateTask,
  onUpdateTasksHandler,
  fetchTasks,
} from '../../store/tasks/actions';

import './index.scss';

class HomePage extends PureComponent {
  componentDidMount() {
    const { fetchTasks } = this.props;
    fetchTasks();
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    if (location.search !== prevProps.location.search) {
      const { fetchTasks } = this.props;
      const { page = 1 } = qs.parse(location.search);
      fetchTasks(page);
    }
  }

  componentDidUnMount() {}

  onUpdateTask = (value, id) => {
    const { updateTask } = this.props;

    updateTask({ content: value }, id);
  };

  renderElement = task => {
    const { deleteTask } = this.props;
    return (
      <Fragment key={task.id}>
        <TaskCard
          deleteTask={deleteTask}
          editTask={this.onUpdateTask}
          {...task}
        />
      </Fragment>
    );
  };
  render() {
    const { taskList, location } = this.props;

    const { page = 1 } = qs.parse(location.search);

    return (
      <div className="content-wrapper content">
        <div className="content__item">
          <div className="task-list">
            <div className="task-list__input-wrapper">
              <CustomTextForm onSubmit={this.onUpdateTask} />
            </div>
            {taskList.map(this.renderElement)}
          </div>
        </div>
        <div className="content__item">
          <Paginator current={page} count={12} />
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  taskList: PropTypes.object,
};

const mapStateToProps = state => ({
  taskList: state.tasks.list,
});

const mapDispatchToProps = {
  deleteTask,
  updateTask,
  fetchTasks,
};

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
);

export default enhance(HomePage);
