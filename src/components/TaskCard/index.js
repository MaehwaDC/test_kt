
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { DeleteEditButton } from '../../ui-kits/Buttons';
import { CustomCheckBox } from '../../ui-kits/Inputs/CustomCheckBox';

import './index.scss';

class TaskCard extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isChecked: !!props.isChecked,
    }
  }
  

  onEditClick = () => {
    const { onEditClick, task } = this.props;
    
    onEditClick(task);
  }
  onDeleteClick = () => {
    const { onDeleteClick, task } = this.props

    onDeleteClick(task);
  }

  onCheckTask = () => {
    const { onCheckTask, task } = this.props;
    this.toggleCheckTask(() => {
      const { isChecked } = this.state
      onCheckTask(task, isChecked)
    }) 
  }

  toggleCheckTask = (func) =>  this.setState(prevState => ({ isChecked: !prevState.isChecked }), func)

  render() {
    const { task } = this.props;
    const { isChecked } = this.state;

    return (
      <div className="task-card">
        <div
          className={classNames(
            'task-card__discription',
            { 'task-card__ended': isChecked }
          )}
        >
          <CustomCheckBox
            checked={isChecked}
            onChange={this.onCheckTask}
            className="task-card__checkbox"
          />
          {task.content}
        </div>
        <div className="task-card__buttons">
          <DeleteEditButton mode="edit" onClick={this.onEditClick} />
          <DeleteEditButton mode="delete" onClick={this.onDeleteClick} />
        </div>
      </div>
    );
  }
}

TaskCard.propTypes = {
  content: PropTypes.string,
  onDeleteClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onCheckTask: PropTypes.func.isRequired,
}

TaskCard.defaultProps = {
  content: '',
}

export default TaskCard;
