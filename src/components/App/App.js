import React from 'react';
import Api from '../../utils/Api';
import { MAIN_API } from '../../utils/config';

import Header from '../Header/Header';
import TaskList from '../TaskList/TaskList';
import Task from '../Task/Task';

function App() {

  const [activeTask, setActiveTask] = React.useState(false);
  const [newActiveTask, setNewActiveTask] = React.useState(false);
  const [taskList, setTaskList] = React.useState([]);
  const [task, setTask] = React.useState();

  const api = new Api ({
    baseUrl: MAIN_API,
    /* headers: {
      'Content-Type': 'application/json'
    }, */
  })

  React.useEffect(() => {
    Promise.all([
      api.getTasks()
    ])
    .then(([tasks]) => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
      setTaskList(JSON.parse(localStorage.getItem('tasks')));
    })
    .catch((err) => {
      console.log(err);
    })
  }, [])

  function closePopup() {
    setActiveTask(false);
  }

  function openTask(task) {
    setActiveTask(true);
    setTask(task);
  }

  function createTask(taskData, fileData, fileLatName, task) {

    const data = new FormData();
    data.append('title', taskData.title);
    data.append('description', taskData.description);
    if (fileData) {
      data.append('fileData', fileData, fileLatName);
    }
    data.append('term', taskData.term);
    data.append('status', taskData.status);
    if (task) {
      data.append('id', task._id);
      data.append('file', task.file);
      data.append('fileName', task.fileName);
    }

    if (task) {
      api.editTask(data)
        .then(() => {
          closePopup();
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      api.createTask(data)
        .then(() => {
          closePopup();
        })
        .catch((err) => {
          console.log(err)
        })
    }

  }

  React.useEffect(() => {
    function handleEscClose(e) {
      if (e.key === 'Escape') {
        closePopup();
      }
    }
    function handleOverlayClose (e) {
      if (e.target.classList.contains('popup_active')) {
        closePopup();
      }
    }
    document.addEventListener('keyup', handleEscClose);
    document.addEventListener('click', handleOverlayClose);
  }, [])

  return (
    <div className="page">
      <div className="page__container">
        <Header
          onBtnClick={openTask}
        />
        <TaskList
          openTask={openTask}
          taskList={taskList}
        />
        <Task
          activeTask={activeTask}
          onPopupClose={closePopup}
          onSubmit={createTask}
          task={task}
        />
      </div>
    </div>
  );
}

export default App;
