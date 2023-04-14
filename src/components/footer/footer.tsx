import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './footer.css';

import TaskFilter from '../tasks-filter';
import { selectTasks, setTaskList } from '../../store/slices/tasks-slice';
import { changeFilter } from '../../store/slices/filter-slice';
import { TaskProps } from '../task/task';

type Tasks = TaskProps[];

const Footer = () => {
  const [todoCount, setTodoCount] = useState(0);
  const tasks: Tasks = useSelector(selectTasks);
  const dispatch = useDispatch();

  useEffect(() => {
    const count = tasks.filter((el: TaskProps) => !el.completed).length;

    setTodoCount(count);
  }, [tasks]);

  const onClearActive = () => {
    const activeTasks = tasks.filter((el: TaskProps) => !el.completed);

    dispatch(setTaskList(activeTasks));
    dispatch(changeFilter('all'));
  };

  return (
    <footer className="footer">
      <span className="todo-count">{todoCount} items left</span>

      <TaskFilter />

      <button className="clear-completed" onClick={onClearActive}>
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;
