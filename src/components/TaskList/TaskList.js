import React from 'react';
import TaskListItem from '../TaskListItem/TaskListItem';

function TaskList() {


  return (
    <ul className="task-list">
      <TaskListItem />
      <TaskListItem />
    </ul>
  );
}

export default TaskList;
