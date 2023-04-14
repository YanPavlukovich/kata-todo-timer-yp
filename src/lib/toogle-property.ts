import { TaskProps } from "../components/task/task";

export const toggleProperty = (arr: Array<TaskProps>, id: string, prop:keyof TaskProps): Array<TaskProps> => {
  const elIdx = arr.findIndex((el) => el.id === parseInt(id));
  const el = arr[elIdx];

  const newEl = {
    ...el,
    [prop]: !el[prop],
  };

  return [...arr.slice(0, elIdx), newEl, ...arr.slice(elIdx + 1, arr.length)];
};
