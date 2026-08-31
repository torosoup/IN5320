let arr_search = Array.from(document.getElementById("search").children);  // declares all li inside ul as an array - search
let arr_population = Array.from(document.getElementById("population").children); // - population

async function getPopulation(country) {
    console.log(country);
    const path = "https://d6wn6bmjj722w.population.io/1.0/countries/";
    const response = await fetch(path, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })

    if (!response.ok) {
        throw Error(response.statusText);
    }

    const countries = await response.json();
    console.log(countries) // troubleshoot
    const res = countries.countries.filter
    if (!countries.countries.includes(country)) {
        throw Error("Country not found");
    }

    const path2 = "https://d6wn6bmjj722w.population.io/1.0/population";
    const response2 = await fetch(`${path2}/${country}/today-and-tomorrow/`);
    if (!response2.ok) {
        throw Error(response2.statusText);
    }

    const data = await response2.json();
    console.log(data); // troubleshoot
    return data;
}
async function addToListPopulation() { // Step 5* Altered version of step 1 - neccesary because i chose to show both a-4 and 5-6 hehe
    const list = document.getElementById("population");
    const newLi = document.createElement("li");
    const delButton = document.createElement("button"); // Adds del button on creation
    const input = document.getElementById("country").value;

    const data = await getPopulation(input) // important
    let p = data.total_population[0].population
    const cr = await getCountRate(input) // Step 6
    setInterval(() => { // anonymous function
        p += cr;
        populationText.textContent = `${input} - ${p}`;
    }, 1000);

    delButton.innerHTML = "X"; // Declaring the button data
    delButton.type = "button";
    delButton.className = "delBtn";
    delButton.onclick = deleteElementFromList;

    const populationText = document.createTextNode(`${input} - ${p}`);
    newLi.appendChild(populationText);
    newLi.appendChild(delButton);
    list.appendChild(newLi);
    arr_population.push(newLi); // adds to array so it can find it again when not using iterateSearch()
}
function addToList() { // Step 1*
    const list = document.getElementById("search")
    const newLi = document.createElement("li");
    const delButton = document.createElement("button"); // Adds del button on creation
    const input = document.getElementById("currency").value;

    delButton.innerHTML = "X"; // Declaring the button data
    delButton.type = "button";
    delButton.className = "delBtn";
    delButton.onclick = deleteElementFromList;

    newLi.appendChild(document.createTextNode(input));
    newLi.appendChild(delButton);
    list.appendChild(newLi);
    arr_search.push(newLi); // adds to array so it can find it again when not using iterateSearch()
}
function deleteElementFromList() { // Step 2
    const child = this.parentElement
    child.remove()
}
function searchElement(element, searchWord) {
    const elementValue = element.textContent;
    if (elementValue.startsWith(searchWord)) {
        return true;
    } else {
        return false;
    }
}
function iterateSearchPopulation(arr, searchWord) { // Step 5* - Altered version of 3 + 4, need it because of two seperate lists.
    const res = arr.filter(x => searchElement(x, searchWord));
    // update ul
    const list = document.getElementById("population");
    list.innerHTML = "";

    res.forEach(x => list.appendChild(x));
}
function iterateSearch(arr, searchWord) { // Step 3 + 4*
    const res = arr.filter(x => searchElement(x, searchWord));
    // update ul
    const list = document.getElementById("search");
    list.innerHTML = "";

    res.forEach(x => list.appendChild(x));
}
async function getCountRate(input) { // Step 6
    const data = await getPopulation(input) // important
    const today = data.total_population[0].population
    const tomorrow = data.total_population[1].population
    const diff = tomorrow - today;
    const countRate = diff / 86400;
    return countRate
}

