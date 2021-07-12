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

document.querySelector("#teddy-list").addEventListener("click", (e) => {
	UI.deleteTeddy(e.target);
	Store.removeTeddy(e.target.parentElement.parentElement.childNodes[3].textContent);
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
			console.log(index);
			if (teddy.name === name) {
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

    const contact = {firstName, lastName, address, city, email};
    const cart = JSON.parse(localStorage.getItem("teddies"));
    const products = [];

    cart.forEach(element => {
        products.push(element._id)
    });

    fetch('http://localhost:3000/api/teddies/order', {
    method:'POST',
    headers: { 
        'Accept': 'application/json', 
        'Content-Type': 'application/json' 
        },
    body:JSON.stringify({contact, products})

})
.then((res) => res.json())
.then((data) => {
window.open(`order.html?orderId=${data.orderId}`)
})}