// Récuperer l'id dans l'URL
const url = new URL(window.location.href);
const urlId = url.searchParams.get("id");

// Trouver une correspondance
fetch(`http://localhost:3000/api/teddies/${urlId}`)
	.then((res) => res.json())
	.then((teddy) => {
		let output = "";
		let custom = "";
		output += `
            <img src="${teddy.imageUrl}" id="teddy-sheet-image" />
            <div id="teddy-sheet-texte">
                <h3><span id="name">${teddy.name}</span></h3>
                <p><span id="description">${teddy.description}</span></p>          
                <p><span id="price">${teddy.price / 100}€</span></p>
				<p><span id="id">${teddy._id}</span></p>
            </div>
        `;

		for (let i = 0; i < teddy.colors.length; i++) {
			custom += `
                <option value="${teddy.colors[i]}">${teddy.colors[i]}</option>
                `;
		}
		document.querySelector("#teddy-sheet").innerHTML = output;
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
			const teddies = Store.getTeddies();
			var needAdd = true;
			teddies.forEach((teddyInCart, index) => {
				if (ted.name === teddyInCart.name && ted.color === teddyInCart.color) {
					teddies[index].quantity++;
					console.log(index);
					needAdd = false;
					localStorage.setItem("teddies", JSON.stringify(teddies));
					UI.refreshQuantity(index, teddies[index].quantity);
				}
			});
			console.log(needAdd);
			if (needAdd) {
				console.log("un autre ours +");
				Store.addTeddy(ted);
				// // Add Teddy to UI
				UI.addTeddyToList(ted);
			}
		});
	});

class UI {
	static displayTeddies() {
		const teddies = Store.getTeddies();
		teddies.forEach((teddy) => UI.addTeddyToList(teddy));
	}

	static addTeddyToList(teddy) {
		const list = document.querySelector("#teddy-list");
		const row = document.createElement("tr");

		row.innerHTML = `
			<td><span class="teddy-name">${teddy.name}</span></td>
			<td>${teddy.color}</td>
			<td>${teddy.price}€</td>
			<td class="quantity">${teddy.quantity}</td>
			<td><a class="delete">X</a></td>
		`;
		list.appendChild(row);
	}

	static deleteTeddy(el) {
		if (el.classList.contains("delete")) {
			el.parentElement.parentElement.remove();
		}
	}

	static refreshQuantity(index, quantity) {
		const row = document.querySelectorAll("tr")[index + 1];
		console.log(row);
		const element = row.querySelector(".quantity");
		element.innerHTML = quantity;
	}
}
document.addEventListener("DOMContentLoaded", UI.displayTeddies);

document.querySelector("#teddy-list").addEventListener("click", (e) => {
	UI.deleteTeddy(e.target);
	Store.removeTeddy(e.target.parentElement.parentElement.childNodes[1].textContent);
});

// Store Class
class Store {
	static getTeddies() {
		let teddies;
		if (localStorage.getItem("teddies") === null) {
			teddies = [];
		} else {
			teddies = JSON.parse(localStorage.getItem("teddies"));
		}

		return teddies;
	}

	static addTeddy(teddy) {
		const teddiesAdd = Store.getTeddies();
		teddiesAdd.push(teddy);
		localStorage.setItem("teddies", JSON.stringify(teddiesAdd));
	}

	static removeTeddy(name) {
		const teddies = Store.getTeddies();

		teddies.forEach((teddy, index) => {
			if (teddy.name === name) {
				teddies.splice(index, 1);
			}
		});

		localStorage.setItem("teddies", JSON.stringify(teddies));
	}
}
