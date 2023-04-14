import React from 'react';
import { useDispatch } from 'react-redux';

import './tasks-filter.css';

import { useFilters } from '../../hooks/use-filters';
import { changeFilter } from '../../store/slices/filter-slice';

const TaskFilter = () => {
  const [filters, selectFilter] = useFilters();
  const dispatch = useDispatch();

  const onFilter = (param: string) => {
    dispatch(changeFilter(param));
    if (typeof selectFilter === 'function') {
      selectFilter(param);
    }
  };

  const filtersElems =
    Array.isArray(filters) &&
    filters.map((filter) => {
      const className = filter.active ? 'selected' : '';

      return (
        <li key={filter.param}>
          <button type="button" className={className} onClick={() => onFilter(filter.param)}>
            {filter.label}
          </button>
        </li>
      );
    });
  return <ul className="filters">{filtersElems}</ul>;
};

export default TaskFilter;
