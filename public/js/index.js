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
}

document.addEventListener("DOMContentLoaded", UI.displayTeddies);

fetch("http://localhost:3000/api/teddies")
	.then((res) => res.json())
	.then((teddies) => {
		let output = "";
		teddies.forEach(function (teddy) {
			output += `
            <a href="product.html?id=${teddy._id}" class="teddies">
                <img src="${teddy.imageUrl}">
                <div class="teddies-text">
                    <h3> ${teddy.name}</h3>
                    <p>${teddy.price / 100} €</p>
                </div>
            </a>
        `;
		});
		document.querySelector("section").innerHTML = output;
	});
