const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

// fetch returns promise
fetch(endpoint)
    .then(blob => blob.json()) // it return another promise
    .then(data => cities.push(...data)) // Constants can not be changed, however e can handle its array
                                        // remembering that we are using here SPREAD operator

/** Here we are figuring out if the city or state matches what was searched */
function findMatches(wordToMatch, cities) {
    return cities.filter(place => {
        const regex = new RegExp(wordToMatch, 'gi');
        // we are not using regex directly because we are dealing with variable, it is not a static regex
        // 'gi' means Global and insentitive
        return place.city.match(regex) || place.state.match(regex);
    });
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/** Display function */
function displayMatches() {
    const matchArray = findMatches(this.value, cities);
    
    const html = matchArray.map(place => {
        //highlight matched word
        const regex = new RegExp(this.value, 'gi');
        const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
        const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);

        return `
            <li>
                <span class="name">${cityName} - ${stateName}</span>
                <span class="population">${numberWithCommas(place.population)}</span>
            </li>
        `;
    }).join(''); // join() because html is coming as array

    suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('keyup', displayMatches);