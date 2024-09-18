// import React from "react";
// import { Pagination } from "react-bootstrap";

// const PagingComponent = ({ currentPage, totalPages, onPageChange }) => {
//     const handlePageClick = (page) => {
//         onPageChange(page);
//     };

//     return (
//         <Pagination>
//             <Pagination.First onClick={() => handlePageClick(1)} />
//             <Pagination.Prev
//                 onClick={() => handlePageClick(Math.max(1, currentPage - 1))}
//             />
//             {[...Array(totalPages)].map((_, index) => (
//                 <Pagination.Item
//                     key={index + 1}
//                     active={index + 1 === currentPage}
//                     onClick={() => handlePageClick(index + 1)}
//                 >
//                     {index + 1}
//                 </Pagination.Item>
//             ))}
//             <Pagination.Next
//                 onClick={() =>
//                     handlePageClick(Math.min(totalPages, currentPage + 1))
//                 }
//             />
//             <Pagination.Last onClick={() => handlePageClick(totalPages)} />
//         </Pagination>
//     );
// };

// export default PagingComponent;

import React from "react";
import { Button } from "react-bootstrap";

const PagingComponent = ({
    currentPage,
    totalPages,
    onPageChange,
    onFirstPage,
    onLastPage,
    onPrevPage,
    onNextPage,
}) => (
    <div className="pagination">
        <Button onClick={onFirstPage} disabled={currentPage === 1}>
            &laquo;&laquo;
        </Button>
        <Button onClick={onPrevPage} disabled={currentPage === 1}>
            &laquo;
        </Button>
        <span>
            Page {currentPage} of {totalPages}
        </span>
        <Button onClick={onNextPage} disabled={currentPage === totalPages}>
            &raquo;
        </Button>
        <Button onClick={onLastPage} disabled={currentPage === totalPages}>
            &raquo;&raquo;
        </Button>
    </div>
);

export default PagingComponent;
