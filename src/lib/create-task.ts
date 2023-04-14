export const createTask = (label: string, id: number) => {
  return {
    description: label,
    createTime: Date.now(),
    completed: false,
    id,
  };
};
