import React from "react";

function PageNumber(props) {

    // const pager = props.apiData.pager;
    const page = props.page;
    const pageCount = props.pageCount

    const nextPage = () => {
        props.setPageNumber(page + 1);
    }
    const previousPage = () => {
        props.setPageNumber(page - 1);
    }
    if (pageCount === 1) { // If the results fit on one page, hide both buttons
        return (
            <div className="page-controls">
                <label>Page {page} of {pageCount}</label>
            </div>
        );
    } else if (page === 1) { // If we are on the first page, don't show previous page button
        return (
            <div className="page-controls">
                <label>Page {page} of {pageCount}</label>
                <button onClick={nextPage}>Next page</button>
            </div>
        );
    } else if (page === pageCount) { // If we are on the last page, don't show next page button
        return (
            <div className="page-controls">
                <button onClick={previousPage}>Previous page</button>
                <label>Page {page} of {pageCount}</label>
            </div>
        );
    } else { // If we are on a page in between the first and last page, show both buttons
        return (
            <div className="page-controls">
                <button onClick={previousPage}>Previous page</button>
                <label>Page {page} of {pageCount}</label>
                <button onClick={nextPage}>Next page</button>
            </div>
        );
    }

}

export default PageNumber;