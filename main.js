var listOfProducts;
var inCart = [];

var tempUserList;

navRight = document.querySelector(".navRight");
userBtn = document.querySelector(".user");

square = document.querySelector(".square");
btnCancel = document.querySelector(".btnCancelLogIn");
inputUsername = document.querySelector(".userName");
inputPassword = document.querySelector(".userPassword");
logInBtn = document.querySelector(".btnLogIn");
logOutBtn = document.querySelector(".btnLogOut");
pWelcome = document.querySelector(".pWelcome");
//console.log(logInBtn)

/** Get products from the json file and store it in a gobal variable */
function loadProducts() {
    fetch("./products.json")
        .then(function (response) {
            return response.json();
        })
        .then(function (products) {
            listOfProducts = products;
            addProductsToWebpage();
        });
}
function initSite() {

    initDefaultUsers();
    loadProducts();
    let itemCart = localStorage.doList;
    if (itemCart) {
        inCart = JSON.parse(itemCart);
    }
    document.getElementById("itemCounter").innerHTML = inCart.length;
    anyoneHome();
}


/** Uses the loaded products data to create a visible product list on the website */
function addProductsToWebpage() {
    let main = document.getElementsByTagName("main")[0];
    let mainContainer = document.createElement("div");
    mainContainer.classList = "container";
    main.appendChild(mainContainer);

    for (let i = 0; i < listOfProducts.length; i++) {
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
        itemBtn.onclick = function () {
            addToCart(this.name);
        };


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

// === Script for showing login-form ===


userBtn.addEventListener("click", (e) => {
    showLoginForm()
});

function showLoginForm() {
    if (localStorage.getItem("loggedInUser")) {
        logoutForm();
    } else {
        if (square.style.display === "none") {
            square.style.display = "block";
            logOutBtn.style.display = "none";
            inputUsername.style.display = "block";
            inputPassword.style.display = "block";
            logInBtn.style.display = "block";

            login();
        } else {
            square.style.display = "none";
        }
    }
}

function logoutForm() {
    if (square.style.display === "none") {
        square.style.display = "block";
        inputUsername.style.display = "none";
        inputPassword.style.display = "none";
        logInBtn.style.display = "none";
        logOutBtn.style.display = "block";
        logOut();
    } else {
        square.style.display = "none";
    }
    console.log("Visa utloggning")
}





// == END == Script for login-form == END ==
btnCancel.addEventListener("click", (e) => {
    square.style.display = "none";
    inputUsername.value = "";
    inputPassword.value = "";
});

function initDefaultUsers() {
    defUserList = [
        {
            userName: "Fredrik",
            password: "12345"
        },
        {
            userName: "Grupp2",
            password: "555"
        }
    ];
    tempUserList = (localStorage.getItem("users",));
    if (!tempUserList) {
        localStorage.setItem("users", JSON.stringify(defUserList)); //Ladda upp defUserList
    }
    tempUserList = JSON.parse(localStorage.getItem("users",)); //Ladda ner
    userList = tempUserList;
};


function login() {
    logInBtn = document.querySelector(".btnLogIn");
    logInBtn.addEventListener("click", function () {
        let obj = userList.find(o => o.userName === inputUsername.value)
        if (obj != undefined) {
            for (let x of userList) {
                if (inputUsername.value === x.userName && inputPassword.value === x.password) {
                    logInUser(inputUsername.value);
                    return
                }
            };
            console.log("Felaktigt användarnamn eller lösenord");
            //felmeddelande("Felaktigt användarnamn eller lösenord. Försök igen.");
        } else {
            console.log("Användarnamnet finns inte");
            //felmeddelande("Användarnamnet finns inte. Försök igen.")
        }
    });
    //createAccountBtn = document.querySelector("#createAccountBtn");
    //createAccountBtn.addEventListener("click", function() {
    //    showCreateAccount()
    //})
};
function logOut() {
    logOutBtn.addEventListener("click", (e) => {
        localStorage.removeItem("loggedInUser");
        //loginForm.style.display="block";
        //logoutBtn.style.display="none";
        square.style.display = "none";
        pWelcome.innerText = "";
    })
}
function logInUser(username) {

    localStorage.setItem("loggedInUser", username);
    pWelcome.innerText = `Välkommen ${username}!`;
    inputUsername.value = "";
    inputPassword.value = "";
    square.style.display = "none";


}
function anyoneHome() {
    if (localStorage.getItem("loggedInUser")) {
        loggedInUser = localStorage.getItem("loggedInUser")
        pWelcome = document.querySelector(".pWelcome");
        pWelcome.innerText = ("Välkommen tillbaka, " + loggedInUser + "!");
    }
};
