
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { DeleteEditButton } from '../../ui-kits/Buttons';

import './index.scss';

class TaskCard extends PureComponent {

  onEditClick = () => {
    // const { onEdit } = this.props;

    // onEdit()
  }

  onDeleteClick = () => {

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
}

TaskCard.defaultProps = {
  content: '',
}

export default TaskCard;
