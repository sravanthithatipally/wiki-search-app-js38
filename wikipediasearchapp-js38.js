let inputele = document.getElementById("searchInput");
let resultcontainer = document.getElementById("searchResults");
let spinnerele = document.getElementById("spinner");

function createandappend(result) {
    let {
        link,
        title,
        description
    } = result;

    let containerele = document.createElement("div");
    containerele.classList.add("result-item");
    resultcontainer.appendChild(containerele);

    let titleel = document.createElement("a");
    titleel.classList.add("result-title");
    titleel.href = link;
    titleel.target = "_blank";
    titleel.textContent = title;
    containerele.appendChild(titleel);

    let linebreakel = document.createElement("br");
    containerele.appendChild(linebreakel);

    let linkel = document.createElement("a");
    linkel.href = link;
    linkel.target = "_blank";
    linkel.classList.add("result-url");
    linkel.textContent = link;
    containerele.appendChild(linkel);

    let linebreakel2 = document.createElement("br");
    containerele.appendChild(linebreakel2);

    let descriptionel = document.createElement("p");
    descriptionel.textContent = description;
    descriptionel.classList.add("link-description");
    containerele.appendChild(descriptionel);
}


function displayresult(searchResults) {
    spinnerele.classList.add("d-none");
    for (let result of searchResults) {
        createandappend(result);
    }
}


function searchwiki(event) {
    if (event.key === "Enter") {
        spinnerele.classList.remove("d-none");
        resultcontainer.textContent = "";

        let valuetosearch = inputele.value;
        let urlele = "https://apis.ccbp.in/wiki-search?search=" + valuetosearch;

        let options = {
            method: "GET",
        };
        fetch(urlele, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayresult(search_results);
            });
    }
}
inputele.addEventListener("keydown", searchwiki);