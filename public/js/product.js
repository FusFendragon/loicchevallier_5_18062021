// Récuperer l'id dans l'URL
const url = new URL(window.location.href);
const urlId = url.searchParams.get("id");

// Trouver une correspondance
fetch(`http://localhost:3000/api/teddies/${urlId}`)
	.then((res) => res.json())
	.then((teddy) => {
		let output = "";
		let custom = "";
		output = `
            <img src="${teddy.imageUrl}" id="teddy-sheet-image" />
            <div id="teddy-sheet-texte">
                <h3><span id="name">${teddy.name}</span></h3>
                <p><span id="description">${teddy.description}</span></p>          
                <p><span id="price">${teddy.price / 100}€</span></p>
            </div>
        `;
		// Custom
		for (let i = 0; i < teddy.colors.length; i++) {
			custom += `
                <option value="${teddy.colors[i]}">${teddy.colors[i]}</option>
                `;
		}
		document.querySelector("#teddy-card").innerHTML += output;
		document.querySelector("select").innerHTML = custom;

		document.querySelector("#teddy-form").addEventListener("submit", (e) => {
			e.preventDefault();

			const imageUrl = teddy.imageUrl;
			const name = teddy.name;
			const color = document.querySelector("#color").value;
			const price = teddy.price / 100;
			const _id = teddy._id;
			const quantity = 1;

			const ted = { imageUrl, name, color, price, _id, quantity };

			// Add Teddy to Store
			Store.addTeddy(ted);
			verificationCart();
			UI.showAddToCart();
		});
	});

// UI CLASS

class UI {
	static displayTeddies() {
		const teddies = Store.getTeddies();
		teddies.forEach((teddy) => UI.addTeddyToList(teddy));
	}
	// Add Teddy to cart by UI
	static addTeddyToList(teddy) {
		const list = document.querySelector("#teddy-list");
		const row = document.createElement("tr");

		row.innerHTML = `
			<td><span class="teddy-name">${teddy.name}</span></td>
			<td>${teddy.color}</td>
			<td>${teddy.price}€</td>
			<td class="quantity">${teddy.quantity}</td>
		`;
		list.appendChild(row);
	}
	// ADD 1 at quantity UI
	static refreshQuantity(index, quantity) {
		const row = document.querySelectorAll("tr")[index + 1];
		const element = row.querySelector(".quantity");
		element.innerHTML = quantity;
	}
	static showAddToCart() {
		document.querySelector(".alert-added").classList.remove("hidden");
		setTimeout(function (){ document.querySelector(".alert-added").classList.add("hidden") }, 1100);
	}
}

// display Teddies already on localstorage 
document.addEventListener("DOMContentLoaded", UI.displayTeddies);

// Store Class
class Store {
	// Get Teddies from localstorage
	static getTeddies() {
		let teddies;
		if (localStorage.getItem("teddies") === null) {
			teddies = [];
		} else {
			teddies = JSON.parse(localStorage.getItem("teddies"));
		}

		return teddies;
	}
	// Push teddies on Localstorage
	static addTeddy(teddy) {
		const teddies = Store.getTeddies();
		var needAdd = true;
		teddies.forEach((teddyInCart, index) => {
			if (teddy.name === teddyInCart.name && teddy.color === teddyInCart.color) {
				teddies[index].quantity++;
				localStorage.setItem("teddies", JSON.stringify(teddies));
				// Add quantity for the good item
				UI.refreshQuantity(index, teddies[index].quantity);
				needAdd = false;
			}
		});
		if (needAdd) {
			teddies.push(teddy);
			localStorage.setItem("teddies", JSON.stringify(teddies));
			// // Add Teddy to UI
			UI.addTeddyToList(teddy);
		}
	}
}
