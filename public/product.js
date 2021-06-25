class Teddy {
	constructor(imageUrl, name, color, price) {
		this.imageUrl = imageUrl;
		this.name = name;
		this.color = color;
		this.price = price;
	}
}

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
            </div>
        `;

		for (let i = 0; i < teddy.colors.length; i++) {
			custom += `
                <option value="${teddy.colors[i]}">${teddy.colors[i]}</option>
                `;
		}
		document.querySelector("#teddy-sheet").innerHTML = output;
		document.querySelector("select").innerHTML = custom;
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
                     <td>${teddy.name}</td>
                     <td>${teddy.color}</td>
                     <td>${teddy.price}</td>
                     <td><a class="delete">X</a></td>
                 `;
		list.appendChild(row);
	}

	static deleteTeddy(el) {
		if (el.classList.contains("delete")) {
			el.parentElement.parentElement.remove();
		}
	}
}
document.addEventListener("DOMContentLoaded", UI.displayTeddies);

document.querySelector("#teddy-form").addEventListener("submit", (e) => {
	e.preventDefault();
	const imageUrl = document.querySelector("#teddy-sheet-image").src;
	const name = document.querySelector("#name").textContent;
	const color = document.querySelector("#color").value;
	const price = document.querySelector("#price").textContent;

	const teddy = new Teddy(imageUrl, name, color, price);

	// Add Teddy to UI
	UI.addTeddyToList(teddy);

	// Add Teddy to Store
	Store.addTeddy(teddy);
});

document.querySelector("#teddy-list").addEventListener("click", (e) => {
	UI.deleteTeddy(e.target);
    Store.removeTeddy(e.target.parentElement.parentElement.childNodes[1].textContent)
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
		const teddies = Store.getTeddies();
		teddies.push(teddy);
		localStorage.setItem("teddies", JSON.stringify(teddies));
	}

	static removeTeddy(name) {
		const teddies = Store.getTeddies();

		teddies.forEach((teddy, index) => {
            console.log(index)
			if (teddy.name === name) {
				teddies.splice(index, 1);		
            }
		});

		localStorage.setItem("teddies", JSON.stringify(teddies));
	}
}
