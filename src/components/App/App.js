import React from 'react';
import Api from '../../utils/Api';
import { MAIN_API } from '../../utils/config';

import Header from '../Header/Header';
import TaskList from '../TaskList/TaskList';
import Task from '../Task/Task';
import PopupDel from '../PopupDel/PopupDel';

function App() {

  const [activeTask, setActiveTask] = React.useState(false);
  const [newActiveTask, setNewActiveTask] = React.useState(false);
  const [taskList, setTaskList] = React.useState([]);
  const [task, setTask] = React.useState();
  const [activePopupDel, setActivePopupDel] = React.useState(false);

  const api = new Api ({
    baseUrl: MAIN_API
  })

  function getData() {
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
  }

  React.useEffect(() => {
    getData();
  }, [])

  function closePopup() {
    setActiveTask(false);
    setActivePopupDel(false);
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
          getData();
          closePopup();
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      api.createTask(data)
        .then(() => {
          getData();
          closePopup();
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  function deleteTask(task) {

    api.deleteTask(task._id)
      .then(() => {
        getData();
        closePopup();
      })
      .catch((err) => {
        console.log(err);
      })

  }

  function openPopupDel(task) {
    setActivePopupDel(true);
    setTask(task);
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

  function completeTask(task) {
    console.log(task.status)
    const type = task.status === 'Выполнено' ? 'В работе' : 'Выполнено';
    let newObj = {};
    newObj = {
      status: type,
      term: task.term
    };
    api.editField({ status: type, term: task.term }, task._id)
      .then(() => {
        getData();
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function editTaskField(taskData, task) {
    const status = taskData.status === undefined ? task.status : taskData.status;
    const term = taskData.term === undefined ? task.term : taskData.term;
    let newObj = {};
    newObj = {
      status,
      term
    };

    api.editField(newObj, task._id)
      .then(() => {
        getData();
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className="page">
      <div className="page__container">
        <Header
          onBtnClick={openTask}
        />
        <TaskList
          openTask={openTask}
          taskList={taskList}
          openPopupDel={openPopupDel}
          completeTask={completeTask}
          editTaskField={editTaskField}
        />
        <Task
          activeTask={activeTask}
          onPopupClose={closePopup}
          onSubmit={createTask}
          task={task}
        />
        <PopupDel
          activePopupDel={activePopupDel}
          onSubmit={deleteTask}
          onPopupClose={closePopup}
          task={task}
        />
      </div>
    </div>
  );
}

export default App;
