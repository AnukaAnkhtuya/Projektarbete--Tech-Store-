var listOfProducts;
var inCart = [];

var tempUserList;

const navRight = document.querySelector(".navRight");
const userBtn = document.querySelector(".user");
const btnBack = document.querySelector(".btnBack");
const square = document.querySelector(".square");
const btnCancel = document.querySelector(".btnCancelLogIn");
const inputUsername = document.querySelector(".userName");
const inputPassword = document.querySelector(".userPassword");
const createUsername = document.querySelector(".createUsername");
const createPassword = document.querySelector(".createPassword");
const logInBtn = document.querySelector(".btnLogIn");
const logOutBtn = document.querySelector(".btnLogOut");
const pWelcome = document.querySelector(".pWelcome");

const errormessage = document.querySelector(".errorMessage-text");
const btnCreateUser = document.querySelector(".btnCreateUser");
const btnSaveNewUser = document.querySelector(".btnSaveNewUser");

const errorMessage = document.querySelector(".errorMessage-text");

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
console.log(userBtn)

userBtn.addEventListener("click", showLoginForm);

function showLoginForm() {
    errormessage.style.display="none";

    
    if (localStorage.getItem("loggedInUser")) {
        logoutForm();
    } else {
        if (square.style.display === "none") {
            square.style.display = "block";
            logOutBtn.style.display = "none";
            btnBack.style.display ="none";
            inputUsername.style.display = "block";
            inputPassword.style.display = "block";
            logInBtn.style.display = "block";
            btnCreateUser.style.display = "block";
            createUsername.style.display = "none";
            createPassword.style.display = "none";
            btnSaveNewUser.style.display = "none";
            

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
        btnCreateUser.style.display = "none";
        createUsername.style.display = "none";
        createPassword.style.display = "none";
        btnSaveNewUser.style.display = "none";
        logOut();
    } else {
        square.style.display = "none";
    }
    console.log("Visa utloggning")
}

// == END == Script for login-form == END ==

btnCreateUser.addEventListener("click", createUser);

// == CREATE USER FORM ==
function createUser(){
    square.style.display = "block";
    inputUsername.style.display = "none";
    inputPassword.style.display = "none";
    createUsername.style.display = "block";
    createPassword.style.display = "block";
    btnBack.style.display ="block";
    btnBack.addEventListener("click", switchForm)
    logInBtn.style.display = "none";
    logOutBtn.style.display = "none";
    btnCreateUser.style.display = "none";
    btnSaveNewUser.style.display = "block";
    btnSaveNewUser.addEventListener("click", saveNewUser);
}
function switchForm(){
    square.style.display = "block";
    logOutBtn.style.display = "none";
    btnBack.style.display ="none";
    inputUsername.style.display = "block";
    inputPassword.style.display = "block";
    logInBtn.style.display = "block";
    btnCreateUser.style.display = "block";
    createUsername.style.display = "none";
    createPassword.style.display = "none";
    btnSaveNewUser.style.display = "none";
}

function saveNewUser(){
    user ={
        userName: createUsername.value,
        password: createPassword.value
        }
        let obj = userList.find(o => o.userName === createUsername.value);
        if(obj != undefined){
            errorCode("Username occupied. Try another username");
        } else {
            userList.push(user);
            localStorage.setItem("users", JSON.stringify(userList));
            userList = JSON.parse(localStorage.getItem("users", ));
            errorCode();
            errorCode("The account: " + createUsername.value + " was created.");
            createUsername.value=("");
            createPassword.value=("");
            
            }
}
/*
btnCancel.addEventListener("click", (e) => {
    square.style.display = "none";
    inputUsername.value = "";
    inputPassword.value = "";
});
*/

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
            inputPassword.value = "";
            errorCode("Wrong username or password. Try again.");
        } else {
            //logInFail();
            console.log("Användarnamnet finns inte");
            errorCode("Username doesn´t exist. Try again.")
        }
    });

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
    errorMessage.innerText="";

}

function anyoneHome() {
    if (localStorage.getItem("loggedInUser")) {
        loggedInUser = localStorage.getItem("loggedInUser")
        pWelcome.innerText = ("Välkommen tillbaka, " + loggedInUser + "!");
    }
};

function errorCode(errorCode){
    errormessage.style.display="block";
    errormessage.textContent = errorCode;
};



