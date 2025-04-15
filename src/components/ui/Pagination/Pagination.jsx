import React from "react";
import Button from "../Button/Button.jsx";
import "./Pagination.css";

function Pagination({
                        currentPage,
                        totalItems,
                        itemsPerPage,
                        onPageChange,
                        scrollToTop = true,
                    }) {

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            const nextPage = currentPage + 1;
            onPageChange(nextPage);

            if (scrollToTop) {
                window.scrollTo(0, 0);
            }
        }
    };

    const goToPrevPage = () => {
        if (currentPage > 1) {
            const prevPage = currentPage - 1;
            onPageChange(prevPage);

            if (scrollToTop) {
                window.scrollTo(0, 0);
            }
        }
    };

    if (totalPages <= 1) {
        return null;
    }

    return (
        <div className="pagination-controls">
            <Button
                onClick={goToPrevPage}
                disabled={currentPage === 1}
                className={currentPage === 1 ? "disabled" : ""}
            >
                Previous
            </Button>

            <span className="pagination-info">
Page {currentPage} of {totalPages}
</span>

            <Button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className={currentPage === totalPages ? "disabled" : ""}
            >
                Next
            </Button>
        </div>
    );
}

export default Pagination;