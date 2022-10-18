var listOfProducts;
const itemContainer = document.getElementById('itemContainer');

/** Get products from the json file and store it in a gobal variable */
function loadProducts() {
    fetch("./products.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(products) {
        listOfProducts = products;
        addProductsToWebpage(listOfProducts);
    });
}

function initSite() {
        loadProducts();
    // This would also be a good place to initialize other parts of the UI
}

/** Uses the loaded products data to create a visible product list on the website */
function addProductsToWebpage() {
    for (let i = 0; i < listOfProducts.length; i++) {
        let itemCard = createItemCard("itemCart", itemContainer);
        let itemBtn = cartBtn(listOfProducts[i]);

        itemCard.appendChild(getItemTitle(listOfProducts[i], "itemTitle"));
        itemCard.appendChild(getItemText(listOfProducts[i], "itemText"));
        itemCard.appendChild(getItemImg(listOfProducts[i], "itemImg"));
        itemCard.appendChild(getItemPrice(listOfProducts[i], "itemPrice"));
        itemCard.appendChild(itemBtn);
    }
}
    // Check your console to see that the products are stored in the listOfProducts varible.
    console.log(listOfProducts);

    /** Create and get Title-element  */
function getItemTitle(product, itemClass) {
    let itemTitle = document.createElement('h2');
    itemTitle.className = itemClass
    itemTitle.innerText = product.title;
    return itemTitle;
}

    /** Create and get Price-element  */
function getItemPrice(product, itemClass) {
    let itemPrice = document.createElement('p');
    itemPrice.className = itemClass
    itemPrice.innerText = product.price + ':-';
    return itemPrice;
}

    /** Create and get Description-element  */
function getItemText(product, itemClass) {
    let itemText = document.createElement('div');
    itemText.className = itemClass
    itemText.innerText = product.description;
    return itemText;
}

    /** Create Img-element append to parent container div and get src */
function getItemImg(product, itemClass) {
    let itemImgContainer = document.createElement('div');
    itemImgContainer.className = 'itemImgContainer';
    let itemImg = document.createElement('img');
    itemImg.className = itemClass;
    itemImg.src = product.image;
    itemImgContainer.appendChild(itemImg);
    return itemImgContainer;
}

    /** Create itemCard and append to itemConatiner  */
function createItemCard (itemClass, appendTo) {
    let itemCard = document.createElement('div');
    itemCard.className = itemClass;
    appendTo.appendChild(itemCard);
    return itemCard;
}

    /** Create  button for itemCard  */

function createItemBtn (item) {
    let itemBtn = document.createElement("button");
    itemBtn.className = "cartBtn";
    itemBtn.innerText = "Lägg i kundkorg";
    let iconBtn = "fas fa-cart-arrow-down";
    itemBtn.addEventListener("click", () => {
        addToCart(item)
    })
    itemBtn.appendChild(iconBtn)
    return itemBtn;
}



    // Add your code here, remember to brake your code in to smaller function blocks
    // to reduce complexity and increase readability. Each function should have
    // an explainetory comment like the one for this function, see row 22.
    
    // TODO: Remove the console.log and these comments when you've read them.
