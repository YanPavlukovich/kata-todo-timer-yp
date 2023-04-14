import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Draft } from 'immer';
import { TaskProps } from '../../components/task/task';


type Timer = {
  [key: number]: number;
}

type TasksState = {
  lastId: number;
  tasks: TaskProps[];
  timers: Timer;
}

const initialState: TasksState = {
  lastId: 100,
  tasks: [],
  timers: {},
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state: Draft<TasksState>, action: PayloadAction<{ label: string; time: number }>) => {
      const { label, time } = action.payload;
      const id = ++state.lastId;
      const task: TaskProps = {
				id,
				label,
				createTime: new Date(Date.now()).toISOString(),
				completed: false,
				title: label
			};

      state.tasks.unshift(task);
      state.timers[id] = time;
    },
    removeTask: (state: Draft<TasksState>, action: PayloadAction<number>) => {
      const idToRemove = action.payload;
      const indexToRemove = state.tasks.findIndex((task) => task.id === idToRemove);

      if (indexToRemove !== -1) {
        state.tasks.splice(indexToRemove, 1);
        delete state.timers[idToRemove];
      }
    },
    editTask: (state: Draft<TasksState>, action: PayloadAction<{ id: number; props: Partial<TaskProps> }>) => {
  const { id, props } = action.payload;
  const task = state.tasks.find((task) => task.id === id);

  if (task) {
    if (props.createTime) {
			props.createTime = new Date(props.createTime).toISOString();
		}
    Object.assign(task, props);
  }
},

    setTaskList: (state: Draft<TasksState>, action: PayloadAction<TaskProps[]>) => {
      state.tasks = action.payload;
    },
    decreaseTimer: (state: Draft<TasksState>, action: PayloadAction<number>) => {
      const id = action.payload;
      const oldValue = state.timers[id];
      const newValue = oldValue > 0 ? oldValue - 1 : 0;

      state.timers[id] = newValue;
    },
  },
});

export const { addTask, removeTask, editTask, setTaskList, decreaseTimer } = tasksSlice.actions;

export const selectTasks = (state: { tasks: TasksState }) => state.tasks.tasks;
export const selectTimers = (state: { tasks: TasksState }) => state.tasks.timers;

export default tasksSlice.reducer;
