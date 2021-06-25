class teddy {
	constructor(name, color, price) {
		this.name = name;
		this.color = color;
		this.price = price;
	}
}

class UI {
	static displayTeddies() {
		const shopTeddies = [
			{
				name: "Francis",
				color: "blue",
				price: "4000",
			},
			{
				name: "Jack",
				color: "red",
				price: "2800",
			},
		];
		const teddies = shopTeddies;
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
document.addEventListener("DOMcontentLoaded", UI.displayTeddies);
document.addEventListener("DOMContentLoaded", UI.displayTeddies);
