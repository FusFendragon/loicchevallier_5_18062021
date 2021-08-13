// Store class is needed 

let storage = Store.getTeddies();

if (storage.length === 0) {
    //Hide Icon alert
    document.querySelector(".alert-circle").classList.add("hidden")
    //Hide Table
	document.querySelector(".table-cart").classList.add("hidden")

} else {
    //Hide Alerte
    document.querySelector(".product-need").classList.add("hidden")
}
