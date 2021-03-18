if (document.readyState == "loading")
  document.addEventListener("DOMContentLoaded", ready);
else ready();

function ready() {
  const addToCartButtons = document.getElementsByClassName("shop-item-btn");
  for (button of addToCartButtons) {
    button.addEventListener("click", addToCartButtonClicked);
  }

  document
    .getElementsByClassName("btn-purchase")[0]
    .addEventListener("click", purchaseButtonClicked);
}

function purchaseButtonClicked(event) {
  const cartItems = document.getElementsByClassName("cart-items")[0];
  while (cartItems.childElementCount > 0) {
    cartItems.removeChild(cartItems.firstChild);
  }
  updateCartTotal();
  alert("Thank you for your purchase");
}

function addToCartButtonClicked(event) {
  const shopItem = event.target.parentElement.parentElement;
  const shopItemTitles = Array.from(
    shopItem.getElementsByClassName("shop-item-title")
  ).map((element) => {
    return element.innerText;
  });
  const shopItemPrice = shopItem.getElementsByClassName("shop-item-price")[0]
    .innerText;
  const shopItemImage = shopItem.getElementsByClassName("shop-item-image")[0]
    .src;
  addShopItemToCart(shopItemImage, shopItemTitles, shopItemPrice);
  updateCartTotal();
}

function addShopItemToCart(image, titles, price) {
  const cartItemTitle = `${titles[0]} ${titles[1]}`;
  const cartItems = document.getElementsByClassName("cart-items")[0];
  const cartItemTitles = cartItems.getElementsByClassName("cart-item-title");
  for (title of cartItemTitles) {
    if (title.innerText == cartItemTitle) {
      alert("This item is already in your cart");
      return;
    }
  }
  const cartRow = document.createElement("div");
  cartRow.classList.add("cart-row");
  const cartRowContent = `
    <div class="cart-item cart-column">
        <img class="cart-item-image" src="${image}" width="100" />
        <span class="cart-item-title">${cartItemTitle}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1" />
        <button class="btn btn-danger" type="button">REMOVE</button>
    </div>`;
  cartRow.innerHTML = cartRowContent;
  cartItems.append(cartRow);
  cartRow
    .getElementsByClassName("btn-danger")[0]
    .addEventListener("click", removeCartItemButtonClicked);
  cartRow
    .getElementsByClassName("cart-quantity-input")[0]
    .addEventListener("change", quantityChanged);
}

function quantityChanged(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value < 1) input.value = 1;
  updateCartTotal();
}

function removeCartItemButtonClicked(event) {
  event.target.parentElement.parentElement.remove();
  updateCartTotal();
}

function updateCartTotal() {
  const cartRows = document
    .getElementsByClassName("cart-items")[0]
    .getElementsByClassName("cart-row");

  let newCartTotalPrice = 0;

  for (row of cartRows) {
    const cartItemPrice = parseFloat(
      row.getElementsByClassName("cart-price")[0].innerText.replace("$", "")
    );

    const cartItemQuantity = parseInt(
      row
        .getElementsByClassName("cart-quantity")[0]
        .getElementsByClassName("cart-quantity-input")[0].value
    );

    newCartTotalPrice = newCartTotalPrice + cartItemPrice * cartItemQuantity;
  }

  document
    .getElementsByClassName("cart-total")[0]
    .getElementsByClassName("cart-total-price")[0].innerText =
    "$" + Number(newCartTotalPrice).toFixed(2);
}
