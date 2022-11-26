import React from 'react';
import TaskListItem from '../TaskListItem/TaskListItem';

function TaskList(props) {


  return (
    <ul className="task-list">
      <TaskListItem
        onTaskClick={props.openTask}
      />
      <TaskListItem />
    </ul>
  );
}

export default TaskList;
