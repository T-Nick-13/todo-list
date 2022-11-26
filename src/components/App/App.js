import React from 'react';
/* import Api from '../../utils/Api';
import { MAIN_API } from '../../utils/config'; */

import Header from '../Header/Header';
import TaskList from '../TaskList/TaskList';
import Task from '../Task/Task';


function App() {

  const [activePopup, setActivePopup] = React.useState(false);

  function closePopup() {
    setActivePopup(false);
  }

  function openTask() {
    setActivePopup(true);
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
        <Header />
        <TaskList
          openTask={openTask}
        />
        <Task
          activePopup={activePopup}
          onPopupClose={closePopup}
        />
      </div>
    </div>
  );
}

export default App;
