import React from 'react';
import Api from '../../utils/Api';
import { MAIN_API } from '../../utils/config';

import Header from '../Header/Header';
import TaskList from '../TaskList/TaskList';
import Task from '../Task/Task';


function App() {

  const [activeTask, setActiveTask] = React.useState(false);
  const [newActiveTask, setNewActiveTask] = React.useState(false);

  const api = new Api ({
    baseUrl: MAIN_API,
    /* headers: {
      'Content-Type': 'application/json'
    }, */
  })

  function closePopup() {
    setActiveTask(false);
  }

  function openTask() {
    setActiveTask(true);
  }

  function createTask(taskData, fileData, fileLatName) {

    const data = new FormData();
    data.append('title', taskData.title);
    data.append('description', taskData.description);
    data.append('fileData', fileData, fileLatName);

    api.createTask(data)
      .then(() => {
        closePopup();
    })
      .catch((err) => {
      console.log(err)
      })
  }

  React.useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === 'Escape') {
        closePopup();
      }
    }
    function handleOverlayClose (evt) {
      if (evt.target.classList.contains('popup_active')) {
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
        />
        <Task
          activeTask={activeTask}
          onPopupClose={closePopup}
          onSubmit={createTask}
        />
      </div>
    </div>
  );
}

export default App;
