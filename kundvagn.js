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
    let cartTitleIcon = document.createElement("h1");
    cartTitleIcon.classList = "cartTitleIcon";
    cartTitle.classList = "cartTitle";
    cartTitleIcon.innerHTML = ' <i class="fa-solid fa-cart-shopping"></i> ';
    cartTitle.innerHTML = " Varukorg";
    cartContent.appendChild(cartTitleDiv);
    cartTitleDiv.appendChild(cartTitleIcon);
    cartTitleDiv.appendChild(cartTitle);

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
        let deleteButtonOutput = document.createElement("p");
         deleteButton.classList = "deleteButton";
         deleteButtonOutput.classList = "deleteButtonOutput";

        deleteButton.onclick = function () {
            deleteItem();
        }

        cartItemTitle.innerText = selectedItem.title;
        cartItemImg.innerText = selectedItem.image;
        cartItemPrice.innerText = selectedItem.price + " " + " " + " :-";
        deleteButtonOutput.innerHTML = ' <i class="fa-solid fa-trash"> </i>' + " Ta bort";
        deleteButton.appendChild(deleteButtonOutput);

        cartItemDiv.appendChild(cartItemImg);
        cartItemDiv.appendChild(cartItemTitle);
        cartItemDiv.appendChild(cartItemPrice);
        cartItemDiv.appendChild(deleteButton);
        cartContainer.appendChild(cartItemDiv);   
    }
    
    let totalPriceContainer = getTotalPrice(totalPrice);
    cartContent.appendChild(totalPriceContainer);
    let checkOutDiv = document.createElement("div");
    checkOutDiv.classList = "checkOutDiv";
    cartContent.appendChild(checkOutDiv);
    let checkOutButton = document.createElement("button");
    let checkOutButtonText = document.createElement("p");
    checkOutButtonText.classList = "checkOutButtonText"
    checkOutButton.classList = "checkOutButton";
    checkOutButtonText.innerHTML = '<i class="fa-solid fa-check"></i>' + " Bekr??fta order";
    checkOutButton.appendChild(checkOutButtonText)
    checkOutDiv.appendChild(checkOutButton);
    checkOutButton.onclick = function() {
       controlCheckOut()
    };
    if (totalPrice < 1) {
        checkOutButton.style.display = "none";
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
        text.innerText = "Total pris:" + " " + " " + totalPrice + " " + " :-";
        priceContainer.appendChild(text);
        return priceContainer;
    } else {
        text.innerText = "Varukorgen ??r tom."
        priceContainer.appendChild(text);
        return priceContainer;
    }
}

function controlCheckOut () {
    if (!localStorage.getItem("loggedInUser")) {
        showLoginForm();
        errorCode(" Du m??ste vara inloggad f??r att bekr??fta din order, v??nligen logga in eller skapa ett konto!"); 
    } else {
        checkOut();
    }
}

function checkOut() {
    if (confirm("Vill du slutf??ra ditt k??p?")) {
        var cart = getCart();
        if(localStorage.getItem("loggedInUser")){
            let loggedInUser = localStorage.getItem("loggedInUser");
            let fromdoList = getCart();

            if(!localStorage.getItem(loggedInUser)){
                localStorage.setItem(loggedInUser, JSON.stringify(fromdoList));
            } else {
                let fromUser = JSON.parse(localStorage.getItem(loggedInUser));
               fromUser = fromUser.concat(fromdoList); 
                localStorage.setItem(loggedInUser, JSON.stringify(fromUser)); 
            }
            localStorage.removeItem("doList");
            addProductsToWebpage()  
        }
    }
   
    cart.splice(0, cart.length);
}

userButton.addEventListener("click", showLoginForm);
userBtn.addEventListener("click", showLoginForm());

function showLoginForm() {    
    errormessage.style.display="none";

    if (localStorage.getItem("loggedInUser")) {
        logoutForm();
    } else {
        if (square.style.display === "none") {
            square.style.display = "block";
            logOutBtn.style.display = "none";
            myOrdersBtn.style.display= "none";
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

btnCreateUser.addEventListener("click", createUser);

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
    btnSaveNewUser.addEventListener("click", () => {
        saveNewUser();
        switchForm();
    });
}

function switchForm() {
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
        localStorage.setItem("users", JSON.stringify(defUserList));
    }
    tempUserList = JSON.parse(localStorage.getItem("users",));
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
            inputPassword.value = "";
            errorCode("Fel anv??ndarnamn eller l??senord, f??rs??k igen");
        } else {
            errorCode("Anv??ndarnamnet finns inte")
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
    pWelcome.innerText = `V??lkommen ${username}!`;
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