import React, { useState, useEffect } from "react"; // hooks are in brackets
import "./App.css";
import Table from "./Table.js";
import PageNumber from "./PageNumber.js";
import PageSize from "./PageSize.js";
import SearchBar from "./SearchBar.js";

function App() {
  /* Create state:
        - apiData: List containing dictionaries of countries from API.
        - searchQuery: The query parameter that should be added to &search=
        - pageNumber: The page that is requested
  */

  const [apiData, setApiData] = useState([]);
  const [searchQuery, setSearchQuery] = useState(); // Default = No search query
  const [pageNumber, setPageNumber] = useState(1); //Default = Page 1
  const [pageSize, setPageSize] = useState(10);
  const [order, setOrder] = useState();
  const [continentCode, setContinentCode] = useState();

  useEffect(() => {
    // All parameters are appended to this URL.
    let apiQuery = "https://in5430-api.onrender.com/api?";

    // If searchQuery isn't empty add &search=searchQuery to the API request.
    if (searchQuery) {
      apiQuery = apiQuery + "&search=" + searchQuery;
    }

    if (order) {
      apiQuery = apiQuery + "&order=" + order;
    }

    if (continentCode) {
      apiQuery = apiQuery + "&ContinentCode=" + continentCode;
    }

    // Add what page we are requesting to the API request.
    apiQuery = apiQuery + "&page=" + pageNumber;
    apiQuery = apiQuery + "&pageSize=" + pageSize;

    // Query data from API.
    console.log("Querying: " + apiQuery);
    fetch(apiQuery)
      .then((results) => results.json())
      .then((data) => {
        // Then add response to state.
        setApiData(data);
      });
  }, [pageSize, searchQuery, pageNumber, order, continentCode]); // Re-run when search, page or page size changes

  return (
    <div className="App">
      <h1>Countries</h1>
      <SearchBar setSearchQuery={setSearchQuery} />
      <Table apiData={apiData} setOrder={setOrder} order={order} setContinentCode={setContinentCode} />
      <PageNumber page={apiData.pager?.page} pageCount={apiData.pager?.pageCount} setPageNumber={setPageNumber}/>
      <PageSize setPageSize={setPageSize} setPageNumber={setPageNumber} />
    </div>
  );
}

export default App;
