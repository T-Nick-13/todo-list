import React from 'react';
/* import Api from '../../utils/Api';
import { MAIN_API } from '../../utils/config'; */

import Header from '../Header/Header';
import TaskList from '../TaskList/TaskList';


function App() {


  return (
    <div className="page">
      <div className="page__container">
        <Header />
        <TaskList />
      </div>
    </div>
  );
}

export default App;
