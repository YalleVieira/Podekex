import React from "react";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import "./Pagination.scss";

const Pagination = (props) => {
  const { page, totalPages, onLeftClick, onRightClick } = props;
  return (
    <div className="pagination-container">
      <button className="btn-left" onClick={onLeftClick}>
        <AiFillCaretLeft />
      </button>
      <span>
        {page} de {totalPages}
      </span>
      <button className="btn-right" onClick={onRightClick}>
        <AiFillCaretRight />
      </button>
    </div>
  );
};

export default Pagination;
