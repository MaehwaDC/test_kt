
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { CustomTextForm } from '../../ui-kits/Inputs';
import { updateTask, fetchTask } from '../../store/tasks/actions';

import './index.scss';

class EditPage extends PureComponent {

  componentDidMount() {
    const { fetchTask, match } = this.props;
    fetchTask(match.params.id);
  }
  

  onSubmit = (contentValue) => {
    const { updateTask, history, task } = this.props;

    updateTask({ ...task, content: contentValue }, task.id);
    history.push('/')
  }

  render() {
    const { task } = this.props;
    return (
      <div className="content-wrapper edit-page">
        <div className="edit-page__item">
          <CustomTextForm
            buttonContent="edit task"
            inputValue={task.content} 
            onSubmit={this.onSubmit} 
          />
          <Link to="/" className="edit-page__back-button">Back to main page</Link>
        </div>
      </div>
    )
  }
}

EditPage.propTypes = {
  task: PropTypes.shape({
    content: PropTypes.string,
  }),
}

EditPage.defaultProps = {
  task: {},
}

const mapStateToProps = (state) => ({
  task: state.tasks.selectedTask,
  tasksCount: state.tasks.totalCount,
});

const mapDispatchToProps = {
  updateTask,
  fetchTask,
}

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
);

export default enhance(EditPage);
