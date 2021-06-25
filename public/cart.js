class Teddy {
	constructor(name, color, price) {
		this.imageUrl = imageUrl;
		this.name = name;
		this.color = color;
		this.price = price;
	}
}

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
		         <td><a href="#" class="delete">X</a></td>
		     `;
		list.appendChild(row);
	}
}
document.addEventListener("DOMContentLoaded", UI.displayTeddies);

// class UI {
// 	static displayTeddies() {
// 		const teddies = Store.getTeddies();
// 		teddies.forEach((teddy) => UI.addTeddyToList(teddy));
// 	}

// 	static addTeddyToList(teddy) {
// 		const list = document.querySelector("#teddy-list");
// 		const row = document.createElement("tr");

// 		row.innerHTML = `
//                      <td>${teddy.name}</td>
//                      <td>${teddy.color}</td>
//                      <td>${teddy.price}</td>
//                      <td><a href="#" class="delete">X</a></td>
//                  `;
// 		list.appendChild(row);
// 	}

// 	static deleteTeddy(el) {
// 		if (el.classList.contains("delete")) {
// 			el.parentElement.parentElement.remove();
// 		}
// 	}
// }
// document.addEventListener("DOMContentLoaded", UI.displayTeddies);

// document.querySelector("#teddy-form").addEventListener("submit", (e) => {
// 	e.preventDefault();
// 	const imageUrl = document.querySelector("#teddy-sheet-image").src;
// 	const name = document.querySelector("#name").textContent;
// 	const color = document.querySelector("#color").value;
// 	const price = document.querySelector("#price").textContent;

// 	const teddy = new Teddy(imageUrl, name, color, price);

// 	// Add Teddy to UI
// 	UI.addTeddyToList(teddy);

// 	// Add Teddy to Store
// 	Store.addTeddy(teddy);

// });

// document.querySelector("#teddy-list").addEventListener("click", (e) => {
//     // Remove Teddy From UI
// 	UI.deleteTeddy(e.target);

//     // Remove Teddy From Store
//     Store.removeTeddy(e.target.parentNode.firstChild.textContent);

// });

// // Store Class
// class Store {
// 	static getTeddies() {
// 		let teddies;
// 		if (localStorage.getItem("teddies") === null) {
// 			teddies = [];
// 		} else {
// 			teddies = JSON.parse(localStorage.getItem("teddies"));
// 		}

// 		return teddies;
// 	}

// 	static addTeddy(teddy) {
// 		const teddies = Store.getTeddies();
// 		teddies.push(teddy);
// 		localStorage.setItem("teddies", JSON.stringify(teddies));
// 	}

// 	static removeTeddy(name) {
// 		const teddies = Store.getTeddies();

// 		teddies.forEach((teddy, index) => {
// 			if (teddy.name === name) {
// 				teddies.splice(index, 1);
// 			}
// 		});

// 		localStorage.setItem("teddies", JSON.stringify(teddies));
// 	}
// }
