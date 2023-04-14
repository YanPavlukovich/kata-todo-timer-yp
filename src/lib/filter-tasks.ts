import { TaskProps } from "../components/task/task";


export const filterTasks = (tasks: Array<TaskProps>, param: string): Array<TaskProps> => {
  if (param === 'all') {
    return tasks;
  }
  if (param === 'completed') {
    return tasks.filter((task) => task.completed);
  }
  if (param === 'active') {
    return tasks.filter((task) => !task.completed);
  }
	throw new Error(`Invalid parameter: ${param}`);
};
