document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("offers-container");
    const filter = document.getElementById("filter");
    const baseURL = window.location.origin + "/";

    fetch(baseURL + "grantors.json")
        .then(response => response.json())
        .then(grantors => {
            function displaygrantors(filteredgrantors) {
                container.innerHTML = "";
                filteredgrantors.forEach(grantor => {
                    const tile = document.createElement("div");
                    tile.className = "grantor-tile";

                    const logo = document.createElement("img");
                    logo.src = baseURL + grantor.logo;
                    logo.alt = `${grantor.name} logo`;

                    const name = document.createElement("h3");
                    name.textContent = grantor.name;

                    const description = document.createElement("p");
                    description.textContent = grantor.description;

                    const promotion = document.createElement("div");
                    promotion.className = "offer";
                    promotion.textContent = grantor.promotion;

                    const seeMore = document.createElement("div");
                    seeMore.className = "see-more";
                    const seeMoreLink = document.createElement("a");
                    seeMoreLink.href = grantor.url;
                    seeMoreLink.textContent = "See more";
                    seeMore.appendChild(seeMoreLink);

                    tile.appendChild(logo);
                    tile.appendChild(name);
                    tile.appendChild(description);
                    tile.appendChild(promotion);
                    tile.appendChild(seeMore);

                    container.appendChild(tile);
                });
            }

            filter.addEventListener("change", function () {
                const selectedCategory = filter.value;
                const filteredgrantors = selectedCategory === "All" ? grantors : grantors.filter(grantor => grantor.category === selectedCategory);
                displaygrantors(filteredgrantors);
            });

            // Initial display
            displaygrantors(grantors);
        })
        .catch(error => console.error("Error fetching grantors:", error));
});