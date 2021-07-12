const url = new URL(window.location.href);
const urlOrderId = url.searchParams.get("orderId");

document.getElementById('orderId').innerHTML = urlOrderId;