import React, { useState } from "react";

function Table(props) {
  console.log(props.apiData);
  const data = props.apiData.results;
  const [selectedContinents, setSelectedContinents] = useState([]);

  if (!props.apiData.results) {
    // If the API request isn't completed return "loading...""
    return <p>Loading...</p>;
  } else {
      const listElements = data.map((elements) =>
        <tr key={elements.Country}>
          <td>{elements.Country}</td>
          <td>{elements.Continent}</td>
          <td>{elements.Population}</td>
          <td>{elements.PopulationGrowth}</td>
      </tr>
    );
    const handleOrder = (event) => {
      if (props.order === event.target.dataset.value +":ASC"){
        props.setOrder(event.target.dataset.value +":DESC");
      } else {
        props.setOrder(event.target.dataset.value +":ASC");
      }
    }
    const handleFilter = (continentCode) => {
      setSelectedContinents((current) => {
        let updatedContinents;

        if (current.includes(continentCode)) {
          updatedContinents = current.filter((code) => code !== continentCode);
        } else {
          updatedContinents = [...current, continentCode];
        }

        props.setContinentCode(updatedContinents.join(","));
        return updatedContinents;
      });
    };

    const continents = [
      ["AF", "Africa"],
      ["AS", "Asia"],
      ["EU", "Europe"],
      ["NA", "North America"],
      ["OC", "Oceania"],
      ["SA", "South America"],
    ];

    return (
      <div>
      <div className="continent-filters">
        {continents.map(([code, name]) => (
          <button
            className={selectedContinents.includes(code) ? "continent-button active" : "continent-button"}
            key={code}
            type="button"
            onClick={() => handleFilter(code)}
          >
            {name}
          </button>
        ))}
      </div>
      <table>
        <thead>
          <tr>
            <th onClick={handleOrder} data-value="Country">Country</th>
            <th onClick={handleOrder} data-value="Continent">Continent</th>
            <th onClick={handleOrder} data-value="Population">Population</th>
            <th onClick={handleOrder} data-value="PopulationGrowth">Population growth</th>
          </tr>
        </thead>
        <tbody>
          {listElements}
        </tbody>
      </table>
    </div>);
  }
}

export default Table;
