fetch("http://localhost:3000/api/teddies")
	.then((res) => res.json())
	.then((teddies) => {
		let output = "";
		teddies.forEach(function (teddy) {
			output += `
            <a href="product.html?id=${teddy._id}" class="no-style-link">
            <div class="teddies">
                <img src="${teddy.imageUrl}">
                <div class="teddies-text">
                    <h3> ${teddy.name}</h3>
                    <p>${teddy.price / 100} €</p>
                </div>
            </div>
            </a>
        `;
		});
		document.querySelector("section").innerHTML = output;
	});
// Récuperer l'url et afficher la fiche produit
const url = new URL(window.location.href);
const urlId = url.search;
console.log(urlId)