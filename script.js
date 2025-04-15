const cartIcon = document.querySelector("#cartIcon");
const  cart = document.querySelector(".cart");
const cartClose =document.querySelector("#cartClose");
cartIcon.addEventListener("click", () => cart.classList.add("active"));
cartClose.addEventListener("click", () => cart.classList.remove("active"));

const addCartButtons = document.querySelectorAll(".addCart");
addCartButtons.forEach(button => {
    button.addEventListener("click", event => {
        const productBox = event.target.closest(".productBox");
        addToCart(productBox);
        console.log(productBox);
    });
});

const cartContent = document.querySelector(".cartContent");
const addToCart = productBox => {
    const productImgSrc = productBox.querySelector("img").src;
    const productTitle = productBox.querySelector(".productTitle").textContent;
    const productPrice = productBox.querySelector(".price").textContent;

    const cartItems = cartContent.querySelectorAll(".cartProductTitle");
    for (let item of cartItems){
        if (item.textContent === productTitle) {
            alert("This item already exists in your cart.");
            return;
        }
    }

    const cartBox = document.createElement("div");
    cartBox.classList.add("cartBox");
    cartBox.innerHTML = `
                    <img src="${productImgSrc}" alt="" class="cartImg">
                <div class="cartDetail">
                    <h2 class="cartProductTitle">${productTitle}</h2>
                    <span class="cartPrice">${productPrice}</span>
                    <div class="cartQuantity">
                        <button id="minus">-</button>
                        <span class="number">1</span>
                        <button id="plus">+</button>
                    </div>
                </div>
                <i class="ri-delete-bin-6-line cartRemove"></i>
    `;

    cartContent.appendChild(cartBox);

    cartBox.querySelector(".cartRemove").addEventListener("click", () => {
        cartBox.remove();

        updateCartCount(-1);
        
        updateTotalPrice();
    });

    cartBox.querySelector(".cartQuantity").addEventListener("click", event => {
        const numberElement = cartBox.querySelector(".number");
        const minusButton = cartBox.querySelector("#minus");
        const plusButton= cartBox.querySelector("#plus");
        let quantity = numberElement.textContent;

        if (event.target.id === "minus" && quantity > 1) {
            quantity--;
            if (quantity === 1){
                minusButton.style.color = "#999";
            }
        } else if (event.target.id === "plus") {
            quantity++;
            plusButton.style.color = "#333";
        }

        numberElement.textContent = quantity;

        updateTotalPrice();
    });

    updateCartCount(1);

    updateTotalPrice();
};

const updateTotalPrice =  () => {
    const totalPriceElement = document.querySelector(".totalPrice");
    const cartBoxes = cartContent.querySelectorAll(".cartBox");
    let total = 0;
    cartBoxes.forEach(cartBox => {
        const priceElement = cartBox.querySelector(".cartPrice");
        const quantityElement = cartBox.querySelector (".number");
        const price = priceElement.textContent.replace("R", "");
        const quantity = quantityElement.textContent;
        total += price * quantity;
    });
    totalPriceElement.textContent = `R${total}`
};

let cartItemCount = 0;
const updateCartCount = change => {
    const cartItemCountBadge = document.querySelector(".cartItemCount");
    cartItemCount += change;
    if (cartItemCount > 0) {
        cartItemCountBadge.style.visibility = "visible";
        cartItemCountBadge.textContent = cartItemCount;
    } else {
        cartItemCountBadge.style.visibility = "hidden";
    }
};

const buyNowButton = document.querySelector(".btnBuy");
buyNowButton.addEventListener("click", () => {
    const cartBoxes = cartContent.querySelectorAll(".cartBox");
    if (cartBoxes.legth === 0) {
        alert ("Your cart is currently empty. Please add items before checking out.");
        return;
    }

    cartBoxes.forEach(cartBox => cartBox.remove());

    cartItemCount = 0;
    updateCartCount(0);

    updateTotalPrice();

    alert("Thank you for your purchase! Enjoy the rest of your day.");
});