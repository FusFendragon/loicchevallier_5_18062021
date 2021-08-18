// Store class is needed
function verificationCart() {
	let storage = Store.getTeddies();
	if (storage.length === 0) {
		//Hide Icon alert
		document.querySelector(".alert-circle").classList.add("hidden");
		//Hide Table
		document.querySelector(".table-cart").classList.add("hidden");
        //Show Alerte
		document.querySelector(".product-need").classList.remove("hidden");
	} else {
		//Hide Alerte
		document.querySelector(".product-need").classList.add("hidden");
        //Show Icon alert
		document.querySelector(".alert-circle").classList.remove("hidden");
		//Show Table
		document.querySelector(".table-cart").classList.remove("hidden");
	}
}
verificationCart()