import React, { FC } from 'react';
// import { v4 as uuidv4 } from 'uuid';

import TaskList from '../task-list';
import NewTaskForm from '../new-task-form';
import Footer from '../footer';

import './app.css';

const App: FC = () => {
  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm />
      </header>
      <section className="main">
        <TaskList />
      </section>
      <Footer />
    </section>
  );
};

export default App;
