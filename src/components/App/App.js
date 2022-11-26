import React from 'react';
/* import Api from '../../utils/Api';
import { MAIN_API } from '../../utils/config'; */

import Header from '../Header/Header';
import TaskList from '../TaskList/TaskList';
import Task from '../Task/Task';


function App() {


  return (
    <div className="page">
      <div className="page__container">
        <Header />
        <TaskList />
        <Task />
      </div>
    </div>
  );
}

export default App;
