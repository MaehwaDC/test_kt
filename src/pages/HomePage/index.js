import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import qs from 'query-string';

import Paginator from '../../components/Pagintor';
import { CustomTextForm } from '../../ui-kits/Inputs';
import TaskCard from '../../components/TaskCard';
import { deleteTask, updateTask, onUpdateTasksHandler } from '../../store/tasks/actions';

import './index.scss';

class HomePage extends PureComponent {
  pageLimit = 9;
  unsubscribe = () => {}
  componentDidMount() {
    const { onUpdateTasksHandler, location } = this.props;
    const { page = 1 } = qs.parse(location.search);
    onUpdateTasksHandler(page, this.pageLimit).then(unsubscribe => this.unsubscribe = unsubscribe);
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;

    // resubscribe to new tasks page
    if(location.search !== prevProps.location.search) {
      const { onUpdateTasksHandler, tasksCount } = this.props;
      const { page = 1 } = qs.parse(location.search);
      this.unsubscribe();
      onUpdateTasksHandler(page, this.pageLimit, tasksCount).then(unsubscribe => this.unsubscribe = unsubscribe);
    }
  }

  componentWillUnmount() {
    this.unsubscribe()
  }
  
  
  onUpdateTask = (value, id) => {
    const { updateTask } = this.props;

    updateTask({ content: value }, id);
  };

  onSubmit = (value, id) => {
    const { history } = this.props;
    this.onUpdateTask(value, id);

    history.push('/');
  }

  onEditTask = (id) => {
    const { history } = this.props;

    history.push(`/edit/${id}`)
  }

  renderElement = task => {
    const { deleteTask } = this.props;
    return (
      <Fragment key={task.id}>
        <TaskCard
          deleteTask={deleteTask}
          editTask={this.onEditTask}
          {...task}
        />
      </Fragment>
    );
  };
  render() {
    const { 
      taskList,
      location,
      tasksCount,
    } = this.props;
    const { page = 1 } = qs.parse(location.search);
    const count = Math.ceil(tasksCount/this.pageLimit)

    return (
      <div className="content-wrapper content">
        <div className="content__item">
          <div className="task-list">
            <div className="task-list__input-wrapper">
              <CustomTextForm onSubmit={this.onSubmit} />
            </div>
            {taskList.map(this.renderElement)}
          </div>
        </div>
        <div className="content__item">
          <Paginator current={page} count={count || 1} />
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  taskList: PropTypes.array,
  tasksCount: PropTypes.number,
}

const mapStateToProps = state => ({
  taskList: state.tasks.list,
  tasksCount: state.tasks.totalCount,
})

const mapDispatchToProps = {
  deleteTask,
  updateTask,
  onUpdateTasksHandler,
}

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
);

export default enhance(HomePage);
