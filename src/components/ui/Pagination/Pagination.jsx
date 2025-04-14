import React from "react";
import Button from "../Button/Button.jsx";
import "./Pagination.css";

// /**
//  * Reusable pagination component for navigating through paginated data
//  *
//  * @param {Object} props
//  * @param {number} props.currentPage - Current active page number
//  * @param {number} props.totalItems - Total number of items across all pages
//  * @param {number} props.itemsPerPage - Number of items displayed per page
//  * @param {Function} props.onPageChange - Callback function when page changes, receives new page number
//  * @param {boolean} props.scrollToTop - Whether to scroll to top on page change (default: true)
//  * @param {string} props.className - Additional CSS class for the pagination container
//  */

function Pagination({
                        currentPage,
                        totalItems,
                        itemsPerPage,
                        onPageChange,
                        scrollToTop = true,
                        className = ""
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