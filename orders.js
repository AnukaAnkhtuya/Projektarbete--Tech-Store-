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
const myOrdersBtn = document.querySelector(".myOrders");

const errormessage = document.querySelector(".errorMessage-text");
const btnCreateUser = document.querySelector(".btnCreateUser");
const btnSaveNewUser = document.querySelector(".btnSaveNewUser");
const errorMessage = document.querySelector(".errorMessage-text");

function getCart() {
    return JSON.parse(localStorage.getItem('doList')) || [];
}

function getUsers() {
    return JSON.parse(localStorage.getItem('users'));
}

function getCurrentUser() {
    return localStorage.getItem('loggedInUser');
}

function getOrders() {
    loggedInUser = localStorage.getItem("loggedInUser");
    return JSON.parse(localStorage.getItem(loggedInUser))  || [];
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
    let cartTitleIcon = document.createElement("h1");
    cartTitleIcon.classList = "cartTitleIcon";
    cartTitle.classList = "cartTitle";
    cartTitleIcon.innerHTML = ' <i class="fa-solid fa-list"></i> ';
    cartTitle.innerHTML = " Orderhistorik";
    cartContent.appendChild(cartTitleDiv);
    cartTitleDiv.appendChild(cartTitleIcon);
    cartTitleDiv.appendChild(cartTitle);

    var totalPrice = 0;
    var cartContainer = document.createElement("div");
    cartContainer.classList = "orderContainer";
    cartContent.appendChild(cartContainer);

    for (let i = 0; i < getOrders().length; i++) {
        var selectedItem = getOrders()[i];
        totalPrice += selectedItem.price;

        let cartItemDiv = document.createElement("div");
        cartItemDiv.classList = "orderItemDiv";

        let cartItemImg = document.createElement("img");
        cartItemImg.classList = "orderItemImg";
        cartItemImg.setAttribute("src", "./assets/" + selectedItem.image);

        let cartItemTitle = document.createElement("h1");
        cartItemTitle.classList = "orderItemTitle";
        let cartItemPrice = document.createElement("h4");
        cartItemPrice.classList = "orderItemPrice";

        cartItemTitle.innerText = selectedItem.title;
        cartItemImg.innerText = selectedItem.image;
        cartItemPrice.innerText = selectedItem.price + ":-";

        cartItemDiv.appendChild(cartItemImg);
        cartItemDiv.appendChild(cartItemTitle);
        cartItemDiv.appendChild(cartItemPrice);

        cartContainer.appendChild(cartItemDiv);   

    }
    
    let totalPriceContainer = getTotalPrice(totalPrice);
    totalPriceContainer.classList = "pricecontainer";
    cartContent.appendChild(totalPriceContainer);

}


    function getTotalPrice (totalPrice) {
    let priceContainer = document.createElement("div");
    let text = document.createElement("p");
    text.classList = "ordertotalPriceText";

    if (getOrders() && getOrders().length) {
        text.innerText = "Total pris:" + " " + " " + totalPrice + " " + " :-";
        priceContainer.appendChild(text);
        return priceContainer;
    } else {
        text.innerText = ""
        priceContainer.appendChild(text);
        return priceContainer;
    }

}

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
            myOrdersBtn.style.display = "none";
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
        myOrdersBtn.style.display = "block";
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

myOrdersBtn.addEventListener("click", () => {
    window.location.replace("orders.html")});

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
            errorCodeTwo("Kontot: " + createUsername.value + " har skapats.");
            createUsername.value=("");
            createPassword.value=("");
            
            }
}

function initDefaultUsers() {
    defUserList = [
        {
            userName: "Fredrik",
            password: "12345"
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

function errorCode(errorCode){
    errormessage.style.display="block";
    errormessage.textContent = errorCode;
    errormessage.style.color = "#ca484c";

};

function errorCodeTwo(errorCode){
    errormessage.style.display="block";
    errormessage.textContent = errorCode;
    errormessage.style.color = "green";
};
