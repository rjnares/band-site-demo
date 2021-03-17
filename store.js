const removeCartItemButtons = document.getElementsByClassName("btn-danger");
for (let i = 0; i < removeCartItemButtons.length; i++) {
  const btn = removeCartItemButtons[i];
  btn.addEventListener("click", (e) =>
    removeCartItem(e.target.parentElement.parentElement)
  );
}

function removeCartItem(cartRow) {
  const cartItemPrice = parseFloat(
    cartRow.getElementsByClassName("cart-price")[0].innerText.replace("$", "")
  );

  const cartItemQuantity = parseInt(
    cartRow
      .getElementsByClassName("cart-quantity")[0]
      .getElementsByClassName("cart-quantity-input")[0].value
  );

  cartRow.remove();

  updateCartTotal(cartItemPrice, cartItemQuantity);
}

function updateCartTotal(price, quantity) {
  const cartTotalPriceElement = document
    .getElementsByClassName("cart-total")[0]
    .getElementsByClassName("cart-total-price")[0];

  const cartTotalPrice = parseFloat(
    cartTotalPriceElement.innerText.replace("$", "")
  );

  const newCartTotalPrice = Number(cartTotalPrice - price * quantity).toFixed(
    2
  );

  cartTotalPriceElement.innerText = "$" + newCartTotalPrice;
}
