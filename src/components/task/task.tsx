import React, { FC, useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { useDispatch } from 'react-redux';

import './task.css';

import { editTask, removeTask } from '../../store/slices/tasks-slice';
import Timer from '../timer/timer';
import EditField from './edit-field';

export type TaskProps = {
  id: number;
  label: string;
  createTime: string;
  completed: boolean;
  title: string;
};

const Task: FC<TaskProps> = ({ id, title, completed, createTime }) => {
  const [editing, setEditing] = useState(false);
  const [taskLabel, setTaskLabel] = useState(title || '');
  const [formattedCreateTime, setFormattedCreateTime] = useState(formatDistanceToNow(new Date(createTime)));
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      setFormattedCreateTime(formatDistanceToNow(new Date(createTime)));
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const getPayload = (props: Partial<TaskProps>) => {
    return editTask({
      id,
      props,
    });
  };

  const onCompleteToggle = () => {
    const dispatchCb = getPayload({
      completed: !completed,
    });

    dispatch(dispatchCb);
  };

  const onEditEnd = () => {
    const dispatchCb = getPayload({
      label: taskLabel,
    });

    setEditing(false);
    dispatch(dispatchCb);
  };

  const onTaskEdit = (e: React.ChangeEvent<HTMLInputElement>) => setTaskLabel(e.target.value);

  const classNames = [completed ? 'completed' : '', editing ? 'editing' : ''].join(' ');

  return (
    <li className={classNames} key={id}>
      <div className="view">
        <input className="toggle" type="checkbox" id={`${id}__check`} onChange={onCompleteToggle} checked={completed} />
        <label htmlFor={`${id}__check`}>
          <span className="title">{taskLabel}</span>
          <Timer id={id} />
          <span className="description">{formattedCreateTime}</span>
        </label>
        <button className="icon icon-edit" onClick={() => setEditing(true)} />
        <button className="icon icon-destroy" onClick={() => dispatch(removeTask(id))} />
      </div>

      <EditField editing={editing} onTaskEdit={onTaskEdit} onEditEnd={onEditEnd} label={taskLabel} id={id} />
    </li>
  );
};

export default Task;
