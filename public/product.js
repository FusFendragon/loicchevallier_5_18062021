// Récuperer l'id dans l'URL
const url = new URL(window.location.href);
const urlId = url.searchParams.get("id");
console.log(urlId);

// Trouver une correspondance

fetch("http://localhost:3000/api/teddies")
	.then((res) => res.json())
	.then((data) => {
		let output = "";
		data.forEach((teddy) => {
			if (urlId === teddy._id) {
				output += `
                <div id="teddy-sheet">
                    <img src="${teddy.imageUrl}" id="teddy-sheet-image" />
                    <div id="teddy-sheet-texte">
                        <h3>${teddy.name}</h3>
                        <p>${teddy.description}</p>
                        <p>${teddy.price / 100} €</p>
                    </div>
                </div>
                `;
			}
		});
		document.querySelector("section").innerHTML = output;
	});
