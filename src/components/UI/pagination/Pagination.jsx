import React from 'react';
import classes from './Pagination.module.css'

const Pagination = ({ pagesArray, page, changePage }) => {
  const rootClass = [classes.page, classes.page__current];

  return (
    <div>
      {pagesArray.map(el =>
        <span
          onClick={() => changePage(el)}
          key={el}
          className={page === el ? rootClass.join(' ') : classes.page}
        >
          {el}
        </span>
      )}
    </div>
  )
}

export default Pagination;
