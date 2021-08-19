const url = new URL(window.location.href);
const urlOrderId = url.searchParams.get("orderId");
const price = url.searchParams.get("price");

document.getElementById('orderId').innerHTML = urlOrderId;
document.getElementById('orderPrice').innerHTML = price;

console.log(url.searchParams.get("price"));