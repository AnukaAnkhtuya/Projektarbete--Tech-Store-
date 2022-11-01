//INKLISTRAT SKIT

const navRight = document.querySelector(".navRight");
const userBtn = document.querySelector(".user");
const userButton = document.getElementById("userBtn");
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


//SLUT AV INKLISTRAT SKIT





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
    anyoneHome();
    initDefaultUsers();
}


function addProductsToWebpage() {
    document.getElementById("itemCounter").innerHTML = getCart().length;
    var cartContent = document.querySelector(".cartContent");
    cartContent.innerHTML = ""; 

    let cartTitleDiv = document.createElement("div");
    cartTitleDiv.classList = "cartTitleDiv";
    let cartTitle = document.createElement("h1");
    cartTitle.classList = "cartTitle"
    cartContent.appendChild(cartTitleDiv);
    cartTitleDiv.appendChild(cartTitle);
    cartTitle.innerHTML = "Varukorg";

    var totalPrice = 0;
    var cartContainer = document.createElement("div");
    cartContainer.classList = "cartContainer";
    cartContent.appendChild(cartContainer);

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
        cartItemPrice.innerText = selectedItem.price + " " + " " + " :-";
        deleteButton.innerHTML = "Ta bort";

        cartItemDiv.appendChild(cartItemImg);
        cartItemDiv.appendChild(cartItemTitle);
        cartItemDiv.appendChild(cartItemPrice);
        cartItemDiv.appendChild(deleteButton);

        cartContainer.appendChild(cartItemDiv);   

    }
    
    let totalPriceContainer = getTotalPrice(totalPrice);
    cartContent.appendChild(totalPriceContainer);

        var checkOutDiv = document.createElement("div");
        checkOutDiv.classList = "checkOutDiv";
        cartContent.appendChild(checkOutDiv);

    var checkOutButton = document.createElement("button");
    checkOutButton.classList = "checkOutButton";
    checkOutButton.innerHTML = "Bekräfta order";
    checkOutDiv.appendChild(checkOutButton);
    checkOutButton.onclick = function() {
        checkOut()
    };
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
        text.innerText = "Total pris:" + " " + " " + totalPrice + " " + " :-";
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
        if(localStorage.getItem("loggedInUser")){
            let loggedInUser = localStorage.getItem("loggedInUser");
            let fromdoList = JSON.parse(localStorage.getItem("doList"));
            /*
            console.log(cart[0].title) //Kör cart[i] och loopa i lengh
            console.log(cart[0].description)
            console.log(cart[0].image)
            console.log(cart[0].price)
            */ // - Behövdes inte, men kan användas för att köra koden snyggare. 
            if(!localStorage.getItem(loggedInUser)){
                localStorage.setItem(loggedInUser, JSON.stringify(fromdoList)); //Spara kundvagnen som användarnamn(temp)
            } else {
                let fromUser = JSON.parse(localStorage.getItem(loggedInUser));
                //fromUser är en array med objekt ifrån tidigare köp. (Hämta tidigare ordrar)
                fromUser.push(fromdoList); //Lägga till nya varor till historiken
                localStorage.setItem(loggedInUser, JSON.stringify(fromUser)); //Ladda upp uppdaterad lista med inköpta varor
            }
            localStorage.removeItem("doList");
            addProductsToWebpage() //Rendera tom varukorg. 
        }
    }
   
    cart.splice(0, cart.length);
}

// INKLISTRAT SKIT IFRÅN cartContent.JS
// === Script for showing login-form ===
userButton.addEventListener("click", showLoginForm);
userBtn.addEventListener("click", showLoginForm());

function showLoginForm() {
    console.log("click");
    
    errormessage.style.display="none";

    
    if (localStorage.getItem("loggedInUser")) {
        logoutForm();
        console.log("Visa LogUTForm")
    } else {
        if (square.style.display === "none") {
            console.log("Visa LoginForm")
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
        btnBack.style.display = "none";
        btnCreateUser.style.display = "none";
        createUsername.style.display = "none";
        createPassword.style.display = "none";
        btnSaveNewUser.style.display = "none";
        logOut();
    } else {
        square.style.display = "none";
    }
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

function initDefaultUsers() {
    defUserList = [
        {
            userName: "Fredrik",
            password: "12345"
        },
        {
            userName: "Grupp2",
            password: "555"
        },
        {
            userName: "a",
            password: "a"
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

            console.log("Användarnamnet finns inte");
            errorCode("Username doesn´t exist. Try again.")
        }
    });

};
function logOut() {
    logOutBtn.addEventListener("click", (e) => {
        localStorage.removeItem("loggedInUser");

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
        pWelcome.innerText = (loggedInUser);
    }
};