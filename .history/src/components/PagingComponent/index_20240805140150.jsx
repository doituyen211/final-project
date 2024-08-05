<<<<<<< HEAD
import React, { useState } from "react";
=======
>>>>>>> crm_education
import Pagination from "react-bootstrap/Pagination";

function PagingComponent() {
  const [totalPage, setTotalPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

<<<<<<< HEAD
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
=======
            {[...Array(totalPage).keys()].map((number) => {
                const pageNumber = number + 1;
                return (
                    <Pagination.Item
                        key={pageNumber}
                        active={pageNumber === currentPage}
                        onClick={() => onPageChange(pageNumber)}
                    >
                        {pageNumber}
                    </Pagination.Item>
                );
            })}
>>>>>>> crm_education

  return (
    <Pagination>
      <Pagination.First
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
      />
      <Pagination.Prev
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />

      {[...Array(totalPage).keys()].map((number) => {
        const pageNumber = number + 1;
        return (
          <Pagination.Item
            key={pageNumber}
            active={pageNumber === currentPage}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </Pagination.Item>
        );
      })}

      <Pagination.Next
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPage}
      />
      <Pagination.Last
        onClick={() => handlePageChange(totalPage)}
        disabled={currentPage === totalPage}
      />
    </Pagination>
  );
}

export default PagingComponent;
