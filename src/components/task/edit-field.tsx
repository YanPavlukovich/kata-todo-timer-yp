import React from 'react';

interface EditFieldProps {
  onEditEnd: (label: string, id: number) => void;
  editing: boolean;
  label: string;
  onTaskEdit: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: number;
}

const EditField: React.FC<EditFieldProps> = ({ onEditEnd, editing, label, onTaskEdit, id }) => {
  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onEditEnd(label, id);
  };

  if (editing) {
    return (
      <form onSubmit={onSubmitHandler}>
        <input type="text" className="edit" value={label} onChange={onTaskEdit} autoFocus />
      </form>
    );
  }

  return null;
};

export default EditField;
