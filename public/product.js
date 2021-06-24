// Récuperer l'id dans l'URL
const url = new URL(window.location.href);
const urlId = url.searchParams.get("id");

// Trouver une correspondance

fetch("http://localhost:3000/api/teddies")
	.then((res) => res.json())
	.then((data) => {
		let output = "";
		let custom = "";
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
                    <div class"teddy-custom">
                    <form method="post" action="">
                        <p>
                            <label for="color">Couleur de la lentille</label><br />
                            <select name="color" id="color">   
                            </select>
                        </p>
                    </form>
                    </div>
                </div>
                `;

				for (let i = 0; i < teddy.colors.length; i++) {
					custom += `
                <option value=${teddy.colors[i]}>${teddy.colors[i]}</option>
                `;
				}
			}
		});
		document.querySelector("section").innerHTML = output;
		document.querySelector("select").innerHTML = custom;
	});
