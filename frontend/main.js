fetch('http://localhost:3000/api/teddies')
.then((res) => res.json())
.then((data) => {
    let teddies = '';
    data.forEach(function(showTeddies){
        teddies += `
            <a href="${showTeddies.name}.html" class="no-style-link">
            <div class="teddies-sheet">
                <h3>Nom : ${showTeddies.name}</h3>
                <img src="${showTeddies.imageUrl}">
                <p>Prix : ${showTeddies.price / 100} €</p>
            </div>
            </a>
        `;
    });
    document.querySelector("article").innerHTML = teddies;
}
);
