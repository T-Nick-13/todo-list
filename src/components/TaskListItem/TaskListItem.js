import React from 'react';

import completeLogo from '../../images/free-icon-tick-3106690.png';
import editLogo from '../../images/free-icon-edit-157325.png';
import deletetLogo from '../../images/free-icon-delete-4974628.png';

function TaskListItem(props) {

  function openTask() {
    props.onTaskClick(props.task);
  }

  return (
    <li className="task-list__item">
      <div className="task-list__container">
        <button className="task__btn task-list__btn" title="выполнить">
          <img src={completeLogo} alt="complete" className="task-list__complete-logo"></img>
        </button>
        <h3 className="task__title task-list__title" onClick={openTask} title="открыть задачу">{props.title}</h3>
      </div>
      <div className="task-list__tools">
        <img src={editLogo} alt="edit" title="редактировать"></img>
        <img src={deletetLogo} alt="delete" title="удалить"></img>
      </div>
      <div className="task__term task-list__term" title="срок выполнения">23.11.22</div>
      <div className="task__status task-list__status" title="статус">Ожидание</div>
    </li>
  );
}

export default TaskListItem;
