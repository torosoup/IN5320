import React, {useState} from "react";

function SearchBar(props) {
    const [search, setSearch] = useState("");

    const onChange = (event) => {
        setSearch(event.target.value);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        props.setSearchQuery(search);
    }
    return (
        <div>
            <input onChange={onChange} type="text" placeholder="Search for a country"></input>
            <button onClick={onSubmit}>Search</button>
        </div>
    );
}

export default SearchBar;