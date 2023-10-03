const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

// Función para agregar un producto al carrito
document.getElementById("addToCart").addEventListener("click", function () {
    addToCart();
});

function addToCart () {
    const productSelect = document.getElementById("productSelect");
    const selectedProduct = productSelect.options[productSelect.selectedIndex].text;
    const selectedProductId = productSelect.value;

    const quantityInput = document.getElementById(`quantity-${selectedProductId}`);

    // Obtener el precio del producto seleccionado (asumimos que está en el formato "Producto - Precio")
    const price = parseFloat(selectedProduct.split("-")[1].trim().replace("$", ""));

    // Verificar si el producto ya está en el carrito
    let cartItem = document.getElementById(`cartItem-${selectedProductId}`);

    if (!cartItem) {
        // Si no está en el carrito, crear una nueva fila
        cartItem = document.createElement("tr");
        cartItem.id = `cartItem-${selectedProductId}`;
        cartItem.classList.add("cart-item"); // Agregar clase "cart-item" para identificar elementos del carrito
        cartItem.setAttribute("data-product-id", selectedProductId); // Agregar atributo "data-product-id"
        cartItem.innerHTML = `
            <td>${selectedProduct}</td>
            <td><input type="number" id="quantity-${selectedProductId}" class="quantity-input" value="1" min="1" data-product-id="${selectedProductId}" readonly></td>
            <td id="price-${selectedProductId}">$${price}</td>
            <td id="total-${selectedProductId}">$${price}</td>
            <td><button class="btn btn-danger" onclick="removeFromCart('${selectedProductId}')">Quitar</button></td>
        `;
        cartItems.appendChild(cartItem);
    } else {
        // Si ya está en el carrito, actualizar la cantidad y el total
        const currentQuantity = parseInt(quantityInput.value);
        quantityInput.value = currentQuantity + 1;
        const currentTotal = parseFloat(document.getElementById(`total-${selectedProductId}`).textContent.replace("$", ""));
        const newTotal = (currentTotal + price).toFixed(2);
        document.getElementById(`total-${selectedProductId}`).textContent = `$${newTotal}`;
    }

    // Actualizar el total del carrito
    updateCartTotal();
}

// Función para quitar un producto del carrito
function removeFromCart (productId) {
    const quantityInput = document.getElementById(`quantity-${productId}`);
    const quantity = parseInt(quantityInput.value);
    const price = parseFloat(document.getElementById(`total-${productId}`).textContent.replace("$", ""));

    const currentTotal = parseFloat(cartTotal.textContent);
    cartTotal.textContent = (currentTotal - price).toFixed(2);

    const cartItem = document.getElementById(`cartItem-${productId}`);
    cartItems.removeChild(cartItem);

    // Actualizar el total del carrito
    updateCartTotal();
}

// Función para actualizar el total del carrito
function updateCartTotal () {
    let total = 0;
    const cartItems = document.querySelectorAll("tr.cart-item");
    cartItems.forEach(function (cartItem) {
        const productId = cartItem.getAttribute("data-product-id");
        const quantity = parseInt(document.getElementById(`quantity-${productId}`).value);
        const price = parseFloat(document.getElementById(`price-${productId}`).textContent.replace("$", ""));
        total += quantity * price;
    });
    cartTotal.textContent = total.toFixed(2);
}

// Agregar un oyente de eventos "change" a todos los inputs de cantidad


document.getElementById("generateInvoice").addEventListener("click", function () {
    const customerType = document.getElementById("customerType").value;
    const customerName = document.getElementById("customerName").value;
    const customerRUT = document.getElementById("customerRUT").value;

    // Mostrar información del cliente en la boleta
    if (customerType === "rut") {
        document.getElementById("customerNameDisplay").textContent = customerName;
        document.getElementById("customerRUTDisplay").textContent = customerRUT;
    } else {
        document.getElementById("customerNameDisplay").textContent = customerName;
        document.getElementById("customerRUTDisplay").textContent = "CONSUMIDOR FINAL";
    }

    // Mostrar la información del cliente
    document.getElementById("customerInfo").style.display = "block";
});
