import React, {useState} from "react";

function PageSize(props) {
    const [currentPage, setCurrentPage] = useState(10);

    const handleChange = (event) => {
        setCurrentPage(event.target.value);
        props.setPageSize(event.target.value);
        props.setPageNumber(1);
    }

    return (
        <div className="page-controls">
            <label htmlFor="pageSize">Select table size</label>
            <select id="pageSize" name="pageSize" value={currentPage} onChange={handleChange}>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
            </select>
        </div>
    );
}

export default PageSize;