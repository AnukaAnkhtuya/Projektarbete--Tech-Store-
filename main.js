var listOfProducts;
var inCart = [];

/** Get products from the json file and store it in a gobal variable */
function loadProducts() {
    fetch("./products.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(products) {
        listOfProducts = products;
        addProductsToWebpage();
    });
}




function initSite() {
    loadProducts();
    let itemCart = localStorage.doList;
    if (itemCart) {
        inCart = JSON.parse(itemCart);
    }
   document.getElementById("itemCounter").innerHTML = inCart.length;
}

/** Uses the loaded products data to create a visible product list on the website */
function addProductsToWebpage() {
    let main = document.getElementsByTagName("main")[0];
    let mainContainer = document.createElement("div");
    mainContainer.classList = "container";
    main.appendChild(mainContainer);

    for (let i = 0; i <listOfProducts.length; i++) {
       let selectedItem = listOfProducts[i];

        let itemCard = document.createElement("div");
        itemCard.classList = "itemCardDiv";
        let itemCardInfo = document.createElement("div");
        itemCardInfo.classList = "itemInfo"

        let itemTitle = document.createElement("h2");
        let itemText = document.createElement("p");
        let itemImg = document.createElement("img");
        itemImg.classList = "itemImage";
        itemImg.setAttribute("src", "/assets/" + selectedItem.image); //eftersom bilderna ej ligger i root-mappen
        let itemPrice = document.createElement("h4");

        let itemBtn = document.createElement("button");
        itemBtn.classList = "addItemBtn";
        itemBtn.name = selectedItem.title;
        itemBtn.addEventListener("click", () => {
            addToCart(this.name);
        })
        

        itemTitle.innerText = selectedItem.title;
        itemText.innerText = selectedItem.description;
        itemImg.innerText = selectedItem.image;
        itemPrice.innerText = selectedItem.price + " :-";
        itemBtn.innerHTML = "Lägg i varukorg";

        itemCardInfo.appendChild(itemTitle);
        itemCardInfo.appendChild(itemText);
        itemCardInfo.appendChild(itemImg);
        itemCardInfo.appendChild(itemPrice);
        itemCardInfo.appendChild(itemBtn);

        itemCard.appendChild(itemCardInfo);
        mainContainer.appendChild(itemCard);
    }
}

function addToCart(title) {
    let itemToAdd = title;

    for (let i = 0; i < listOfProducts.length; i++) {
        if (itemToAdd == listOfProducts[i].title) {
            inCart.push(listOfProducts[i]);
            let jsonString = JSON.stringify(inCart);
            localStorage.doList = jsonString;

            counter();

        }
    }
}

function counter() {
    document.getElementById("itemCounter").innerHTML = inCart.length;
}