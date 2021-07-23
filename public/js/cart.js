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

	static deleteTeddy(el) {
		if (el.classList.contains("delete")) {
			el.parentElement.parentElement.remove();
		}
	}

	static displayTotalPrice() {
		const teddies = Store.getTeddies();
		let totalPrice = 0;
		teddies.forEach(teddy => {
		for (let i = 0; i < teddy.quantity; i++) {
			totalPrice += teddy.price;
		}
		});
		document.querySelector(".total").innerHTML = `Prix Total: ${totalPrice}€`;
	}
}
document.addEventListener("DOMContentLoaded", UI.displayTeddies);
document.addEventListener("DOMContentLoaded", UI.displayTotalPrice);

document.querySelector("#teddy-list").addEventListener("click", (e) => {
	UI.deleteTeddy(e.target);
	Store.removeTeddy(e.target.parentElement.parentElement.childNodes[3].textContent, e.target.parentElement.parentElement.childNodes[5].textContent);
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

	static sendTeddyToServer() {
		const teddies = Store.getTeddies();
		let ted = {};
		teddies.forEach((teddy, index) => {
			for (let i = 0; i < teddy.quantity; i++) {
				ted = teddy
				teddies.push(ted)
			}
			delete teddies[index]
			delete ted.quantity
			console.log(teddies)
		});
		let teddiesToSend = teddies.flat();
		console.log(teddiesToSend);
		localStorage.setItem("teddies", JSON.stringify(teddiesToSend));
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

    const contact = {firstName, lastName, address, city, email};
	Store.sendTeddyToServer()
    const cart = JSON.parse(localStorage.getItem("teddies"));
	localStorage.clear();
    const products = [];

    cart.forEach(element => {
        products.push(element._id)
    });
	console.log(products);
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