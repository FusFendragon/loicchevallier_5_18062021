class UI {
	static displayTeddies() {
		const teddies = Store.getTeddies();
		teddies.forEach((teddy) => UI.addTeddyToList(teddy));
	}

	static addTeddyToList(teddy) {
		const list = document.querySelector("#teddy-list");
		const row = document.createElement("tr");

		row.innerHTML = `
					 <td><img src="${teddy.imageUrl}" id="teddy-cart-image" /></td>
                     <td>${teddy.name}</td>
                     <td>${teddy.color}</td>
                     <td>${teddy.price}€</td>
					 <td class="quantity">${teddy.quantity}</td>
                     <td><a class="delete">X</a></td>
                 `;
		list.appendChild(row);
	}

	static displayTotalPrice() {
		const teddies = Store.getTeddies();
		let totalPrice = 0;
		teddies.forEach((teddy) => {
			totalPrice += teddy.price * teddy.quantity;
		});
		document.querySelector(".total").innerHTML = `Prix Total: ${totalPrice}€`;
		return totalPrice
	}

	static deleteTeddy(el) {
			el.parentElement.parentElement.remove();
	}

	static verification() {
		if (Store.getTeddies().length === 0) {
			// Hide table and form
			document.getElementById("table-form").classList.add("hidden");
			//Show alert
			document.querySelector(".product-need").classList.remove("hidden");
		} else {
			//hide alert
			document.querySelector(".product-need").classList.add("hidden");
			//Show Table and form
			document.getElementById("table-form").classList.remove("hidden");
		}
	}
}
document.addEventListener("DOMContentLoaded", UI.displayTeddies);
document.addEventListener("DOMContentLoaded", UI.displayTotalPrice);
document.addEventListener("DOMContentLoaded", UI.verification);

document.querySelector("#teddy-list").addEventListener("click", (e) => {
	if (e.target.classList.contains("delete")) {
		Store.removeTeddy(e.target.parentElement.parentElement.childNodes[3].textContent, e.target.parentElement.parentElement.childNodes[5].textContent);
		UI.displayTotalPrice();
		UI.deleteTeddy(e.target)
		UI.verification();
	}
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

	static getTeddyIds() {
		const teddies = Store.getTeddies();
		let productsIds = [];
		teddies.forEach((teddy) => {
			for (let i = 0; i < teddy.quantity; i++) {
				productsIds.push(teddy._id);
			}
		});
		return productsIds;
	}

	static removeTeddy(name, color) {
		const teddies = Store.getTeddies();

		teddies.forEach((teddy, index) => {
			if (teddy.name === name && teddy.color === color) {
				teddies.splice(index, 1);
			}
		});

		localStorage.setItem("teddies", JSON.stringify(teddies));
	}
}

// Contact

document.getElementById("contact-form").addEventListener("submit", contactPost);

function contactPost(e) {
	e.preventDefault();

	let firstName = document.getElementById("firstName").value;
	let lastName = document.getElementById("lastName").value;
	let address = document.getElementById("address").value;
	let city = document.getElementById("city").value;
	let email = document.getElementById("email").value;

	const contact = { firstName, lastName, address, city, email };

	const products = Store.getTeddyIds();

	fetch("http://localhost:3000/api/teddies/order", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ contact, products }),
	})
		.then((res) => res.json())
		.then((data) => {
			window.open(`order.html?orderId=${data.orderId}&price=${UI.displayTotalPrice()}`, "_self");
			localStorage.clear();
		});
}

