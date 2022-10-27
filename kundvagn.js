function getCart() {
    return JSON.parse(localStorage.getItem('doList')) || [];
}

function getUsers() {
    return JSON.parse(localStorage.getItem('users'));
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem('loggedInUser'));
}

var emptyCart = [];

function initSite() {
    addProductsToWebpage();
}


function addProductsToWebpage() {
    document.getElementById("itemCounter").innerHTML = getCart().length;
    var main = document.getElementsByTagName("main")[0];
    main.innerHTML = "";

    let cartTitleDiv = document.createElement("div");
    cartTitleDiv.classList = "cartTitleDiv";
    let cartTitle = document.createElement("h1");
    cartTitle.classList = "cartTitle"
    main.appendChild(cartTitleDiv);
    cartTitleDiv.appendChild(cartTitle);
    cartTitle.innerHTML = "Kundvagn";

    var totalPrice = 0;
    var cartContainer = document.createElement("div");
    cartContainer.classList = "cartContainer";
    main.appendChild(cartContainer);

    for (let i = 0; i < getCart().length; i++) {
        var selectedItem = getCart()[i];
        totalPrice += selectedItem.price;

        let cartItemDiv = document.createElement("div");
        cartItemDiv.classList = "cartItemDiv";

        let cartItemImg = document.createElement("img");
        cartItemImg.classList = "cartItemImg";
        cartItemImg.setAttribute("src", "./assets/" + selectedItem.image);

        let cartItemTitle = document.createElement("h1");
        cartItemTitle.classList = "cartItemTitle";
        let cartItemPrice = document.createElement("h4");
        cartItemPrice.classList = "cartItemPrice";
        let deleteButton = document.createElement("button");
        deleteButton.classList = "deleteButton";

        deleteButton.onclick = function () {
            deleteItem();
        }

        cartItemTitle.innerText = selectedItem.title;
        cartItemImg.innerText = selectedItem.image;
        cartItemPrice.innerText = selectedItem.price + " " + " " + "SEK";
        deleteButton.innerHTML = "Delete item";

      
        cartItemDiv.appendChild(cartItemImg);
        cartItemDiv.appendChild(cartItemTitle);
        cartItemDiv.appendChild(cartItemPrice);
        cartItemDiv.appendChild(deleteButton);

        cartContainer.appendChild(cartItemDiv);   

    }
    
    let totalPriceContainer = getTotalPrice(totalPrice);
    main.appendChild(totalPriceContainer);

        var checkOutDiv = document.createElement("div");
        checkOutDiv.classList = "checkOutDiv";
        main.appendChild(checkOutDiv);

    var checkOutButton = document.createElement("button");
    checkOutButton.classList = "checkOutButton";
    checkOutButton.innerHTML = "Bekräfta order";
    checkOutDiv.appendChild(checkOutButton);
    checkOutButton.onclick = function() {
        checkOut()
    }
}

function deleteItem(title) {
    var cart = getCart();
    var itemName = title;

    cart.splice(itemName, 1);
    var jsonString = JSON.stringify(cart);
    localStorage.setItem("doList", jsonString);
    addProductsToWebpage();

}

function getTotalPrice (totalPrice) {
    let priceContainer = document.createElement("div");
    let text = document.createElement("p");
    text.classList = "totalPriceText";

    if (getCart() && getCart().length) {
        text.innerText = "Total price: " + " " + " " + totalPrice + " " + "Kr";
        priceContainer.appendChild(text);
        return priceContainer;
    } else {
        text.innerText = "Varukorgen är tom."
        priceContainer.appendChild(text);
        return priceContainer;
    }

}

function checkOut() {
    if (confirm("Vill du slutföra ditt köp?")) {
        var cart = getCart();
        if(getCurrentUser() !=null) {
            addToUser(cart);
        }

        cart.splice(0, cart.length);
        var jsonString = JSON.stringify(cart);
        localStorage.doList = jsonString;
        console.log("ditt köpt är genomfört");
        addProductsToWebpage();
    }

    function addToUser (cart) {
        var addToCurrentUser;
        var users = getCurrentUser();
        users.forEach(user => {
            if (
                user.userName == getCurrentUser().userName &&
                user.password == getCurrentUser().password
            ) {
                addToCurrentUser = user;
                var order = {
                    items: cart
                };
                user.order.push(order);
                localStorage.setItem("Current User", JSON.stringify(user));
                localStorage.setItem ("loggedInUser", JSON.stringify(users))
            }
            
        });

    }

    cart.splice(0, cart.length);
}