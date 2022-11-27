import React from 'react';
import dayjs from 'dayjs';

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

      <input type="date" className="task__term task-list__term" id="term" name="term"
        value={dayjs(props.term).format('YYYY-MM-DD')} />

      <select className="task__status task-list__status" name="status" value={props.status}>
        <option value="Ожидание">Ожидание</option>
        <option value="В работе">В работе</option>
        <option value="Выполнено">Выполнено</option>
      </select>
    </li>
  );
}

export default TaskListItem;
