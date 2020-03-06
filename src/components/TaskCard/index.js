
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { DeleteEditButton } from '../../ui-kits/Buttons';

import './index.scss';

class TaskCard extends PureComponent {

  onEditClick = () => {
    
  }

  onEditSubmit = () => { 
    const { editTask, id } = this.props;

    editTask({ content: '' }, id);
  }

  onDeleteClick = () => {
    const { deleteTask, id } = this.props

    deleteTask(id);
  }

  render() {
    const { content } = this.props;

    return (
      <div className="task-card">
        <div className="task-card__discription">
          {content}
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
  deleteTask: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
}

TaskCard.defaultProps = {
  content: '',
}

export default TaskCard;
