
import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';

import { CustomTextForm } from '../../ui-kits/Inputs';
import TaskCard from '../TaskCard';

import './index.scss';

class TaskList extends PureComponent {
  renderElement = (el) => (
    <Fragment key={el.id}>
      <TaskCard {...el} />
    </Fragment>
  );

  render() {
    const { list } = this.props;
    return (
      <div className="task-list">
        <div className="task-list__input-wrapper">
          <CustomTextForm />
        </div>
        {list.reverse().map(this.renderElement)}
      </div>
    );
  }
}

TaskList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object),
}

TaskList.defaultProps = {
  list: [{ content: 'qwe', id: 1, }, { content: 'qwe1', id: 2 }, { content: 'qwe2', id: 3 }, { content: 'qwe3', id: 4 }],
}

export default TaskList;
