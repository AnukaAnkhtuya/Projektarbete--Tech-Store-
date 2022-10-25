function initSite() {
    addProductsToWebpage();
}


function addProductsToWebpage() {
    let main = document.getElementsByTagName("main")[0];
    main.innerHTML = ""

    let listOfProducts = JSON.parse(localStorage.getItem(shoppingCartList))

    let mainContainer = document.createElement("div")
    mainContainer.classList = "mainContainer"


    let heading = document.createElement("div")
    heading.classList = "heading"

    let cartHeader = document.createElement("h2")
    cartHeader.classList = "cartHeader"

    cartHeader.innerText = "Kundvagn"

    let shoppingIcon = document.createElement("i")
    shoppingIcon.classList = "fas fa-shopping-cart"
    heading.appendChild(headerIcon)
    heading.appendChild(cartHeader)
    main.appendChild(heading)
}
