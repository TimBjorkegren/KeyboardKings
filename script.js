let summa = 0;
let cart = []
let categoryDiscountApplied = false

window.addEventListener('scroll', function () {
    const topButtons = document.querySelector('.Top-Buttons');
    if (window.scrollY > 650) {
        topButtons.classList.add('scrolled');
    } else {
        topButtons.classList.remove('scrolled');
    }
});

function loadStore() {
    location.hash = "#Store-page";

    const storeElement = document.getElementById("Store-page");

    storeElement.style.display = "flex";
    storeElement.scrollIntoView({ behavior: "smooth" });
}



function hideAllMenus() {
    const shop_view = document.querySelector('#shop-view')
    shop_view.innerHTML = "";
}


$(".Store").on("click", "button", function () {
    const categoryID = $(this).attr("id")
    displayProductsByCategory(categoryID)
});


const productlist = [
    {
        name: "Plastic Case", price: "50", category: "case", imageURL: "https://m.media-amazon.com/images/I/61GgYFA0twS.jpg",
        addons: [
            { name: "Extra Padding", price: 10 },
            { name: "Insurance", price: 15 }]
    },
    {
        name: "Zinc Case", price: "119", category: "case", imageURL: "https://mx2games.com/wp-content/uploads/2024/04/Untitled-2003.png",
        addons: [
            { name: "Extra Padding", price: 10 },
            { name: "Insurance", price: 15 }]
    },
    {
        name: "Gold Case", price: "230", category: "case", imageURL: "https://ae01.alicdn.com/kf/S5e7f158ca48f4581ac05651696a6b338k/MATHEW-TECH-MK80-Gasket-Mechanical-Keyboard-Kit-with-Metal-Knob-Hot-swappable-Three-mode-Wireless-Dynamic.png",
        addons: [
            { name: "Extra Padding", price: 10 },
            { name: "Insurance", price: 15 }]
    },
    {
        name: "V3 Cream Black Pro", price: "20", category: "Switches", imageURL: "https://www.maxgaming.se/bilder/artiklar/zoom/31942_1.jpg?m=1725604652",
        discount:
            { discountText: "Buy 4 and get 20$ discount", discountPrice: 20, minQuantity: 4, }

    },
    {
        name: "Glorious Mechanical", price: "30", category: "Switches", imageURL: "https://cdn.webhallen.com/images/product/374276?trim",
        discount:
            { discountText: "Buy 3 and get 30$ discount", discountPrice: 30, minQuantity: 3, }
    },
    { name: "Milky Yellow Pro", price: "50", category: "Switches", imageURL: "https://m.media-amazon.com/images/I/31A6LluEv8L._SY445_SX342_QL70_ML2_.jpg" },
    { name: "Lynx Switches", price: "80", category: "Switches", imageURL: "https://www.maxgaming.se/img/bilder/artiklar/19335.jpg?m=1642774880&w=720" },
    { name: "Plastic Key", price: "50", category: "Keycaps", imageURL: "https://littlebirdelectronics.com.au/cdn/shop/products/image_2544d8d0-c756-494b-aa9e-c2a2e963d10e_700x700.jpg?v=1698753111" },
    { name: "Varmilo Moonlight Keycaps", price: "30", category: "Keycaps", imageURL: "https://www.maxgaming.se/bilder/artiklar/liten/21881_S.jpg" },
    {
        name: "X-ray pad Keycap Set", price: "120", category: "Keycaps", imageURL: "https://www.maxgaming.se/img/bilder/artiklar/31187.jpg?m=1717140291&w=720",
        discount: {
            type: "percentage", discountPercentage: 20
        }
    },
    {
        name: "MAMBASNAKE C01", price: "70", category: "Cables", imageURL: "https://m.media-amazon.com/images/I/61ega5YRPkL._AC_UF1000,1000_QL80_.jpg",
        addons: [
            { name: "Your own design pattern cable", price: 15 }]
    },
    {
        name: "Ducky Premicord Pure", price: "100", category: "Cables", imageURL: "https://www.maxgaming.se/bilder/artiklar/zoom/27065_1.jpg?m=1681399551",
        addons: [
            { name: "Your own design pattern cable", price: 15 }]
    },
    {
        name: "Keychron Coiled Aviator Cable ", price: "30", category: "Cables", imageURL: "https://www.maxgaming.se/bilder/artiklar/21277.jpg?m=1647604676",
        addons: [
            { name: "Your own design pattern cable", price: 15 }]
    },
    {
        name: "Wooting Detachable USB-C", price: "90", category: "Cables", imageURL: "https://mx2games.com/wp-content/uploads/2024/04/Untitled-1995.png",
        addons: [
            { name: "Your own design pattern cable", price: 15 }]
    },
    { name: "Assembly Keyboard?", price: "20", category: "assembly", imageURL: "https://www.modelfkeyboards.com/wp-content/uploads/2024/06/2024-04-01_22-29-44-848x1024.jpg" },
]


function displayProductsByCategory(category) {
    hideAllMenus();
    const shop_view = document.getElementById("shop-view");
    shop_view.classList.remove("shop-viewBackground");
    console.log(shop_view, `hiiiiiiiiiii`)

    const filteredProducts = productlist.filter(product => product.category === category);

    filteredProducts.forEach(product => {
        createProduct(product, shop_view);
    });
}


function createProduct(product, container) {
    const productItem = document.createElement("li");
    productItem.classList.add("product-item");

    const productImage = document.createElement("img");
    productImage.src = product.imageURL;
    productImage.classList.add("product-image");

    const productInfo = document.createElement("span");
    productInfo.textContent = `${product.name} ${product.price} USD`;
    productInfo.dataset.name = product.name

    const discountContainer = document.createElement("div");
    discountContainer.classList.add("discount-container")

    const addToCartButton = document.createElement("button");
    addToCartButton.classList.add("add-to-cart");
    addToCartButton.textContent = "Add to Cart";
    addToCartButton.dataset.price = product.price;

    // Skapa en container för tillägg
    const addonsContainer = document.createElement("div");
    addonsContainer.classList.add("addons-container");


    if (product.discount && product.discount.minQuantity) {
        const discountOption = document.createElement("span");
        discountOption.classList.add("discount-option");
        discountOption.textContent = product.discount.discountText;
        discountContainer.appendChild(discountOption)
    }

    if (product.discount && product.discount.type === "percentage") {
        const discountOption = document.createElement("span")
        discountOption.classList.add("discount-option")
        discountOption.textContent = `Discount: ${product.discount.discountPercentage}% off`
        discountContainer.appendChild(discountOption)
    }



    if (product.addons) {
        product.addons.forEach(addon => {
            const addonOption = document.createElement("label");
            addonOption.classList.add("addon-option");

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.classList.add("addon-checkbox");
            checkbox.dataset.price = addon.price;
            checkbox.dataset.name = addon.name;

            addonOption.appendChild(checkbox);
            addonOption.appendChild(document.createTextNode(`${addon.name} +${addon.price} USD`));
            addonsContainer.appendChild(addonOption);
        });
    }

    productItem.appendChild(productImage);
    productItem.appendChild(productInfo);
    productItem.appendChild(addonsContainer);
    productItem.appendChild(discountContainer);
    productItem.appendChild(addToCartButton);
    container.appendChild(productItem);
}



$("#shop-view").on("click", ".add-to-cart", addItemPriceToSum);

function addItemPriceToSum(event) {

    const price = parseFloat(event.target.dataset.price);
    let totalPrice = price;



    // Hämta valda tillägg
    const productItem = event.target.closest(".product-item");
    const selectedAddons = productItem.querySelectorAll(".addon-checkbox:checked");
    console.log(selectedAddons)

    const addonPrices = []
    selectedAddons.forEach(addon => {
        const addonPrice = parseFloat(addon.dataset.price);
        totalPrice += addonPrice
        addonPrices.push({ price: addonPrice })
        console.log("totala pris med addon", totalPrice)
    });



    const nameElement = productItem.querySelector("span").dataset.name
    let product = productlist.find(product => product.name === nameElement)
    addToCart(product, addonPrices)

    updateCart()
}


function applyAddons() {
    let totalAddonPrice = 0
    cart.forEach((item) => {
        console.log("proccessing item in apply addons", item)
        if (item.addons) {
            item.addons.forEach(addon => {
                totalAddonPrice += addon.price
                console.log("addon price is now", addon.price)
            })
        } else {
            console.log("no item was added", item)
        }
    })
    console.log("totaladdon price is now", totalAddonPrice)
    return totalAddonPrice
}

function calcDiscount() {
    let totalprice = 0;


    cart.forEach((item) => {
        let totalItemPrice
        const price = Number(item.price);
        const quantity = item.quantity;

        totalItemPrice = quantity * price

        if (item.discount && item.discount.minQuantity) {
            const discountTimes = Math.floor(item.quantity / item.discount.minQuantity);
            console.log("Antal gånger discount", discountTimes);
            totalItemPrice = price * quantity - item.discount.discountPrice * discountTimes;
            console.log("Pris produkt", totalItemPrice);
        }
        if (item.discount && item.discount.type === "percentage") {
            const percentageDiscount = (price * quantity) * (item.discount.discountPercentage / 100)
            totalItemPrice -= percentageDiscount
        }
        totalprice += totalItemPrice;
        console.log(item);
    });

    const hasKeycaps = cart.find(item => item.category === "Keycaps")
    const hasSwitches = cart.find(item => item.category === "Switches")
    console.log("CHEEEECK", hasKeycaps, hasSwitches)

    if (cart.length === 0 || !(hasKeycaps && hasSwitches)) {
        categoryDiscountApplied = false
    }

    if (hasKeycaps && hasSwitches) {
        const discountAmount = (Number(hasKeycaps.price) + Number(hasKeycaps.price)) * categoryDiscount.discountPercentage
        console.log(discountAmount, `DETTA ÄR DISCOUNTAMOUNT`)
        totalprice -= discountAmount
        console.log(`totala priset efter rabatt är nu`, totalprice)
        if (!categoryDiscountApplied) {
            alert(`You just got ${categoryDiscount.discountPercentage * 100}% off your total for buying both a switch and keycaps!`)
            categoryDiscountApplied = true
            console.log(categoryDiscountApplied)
        }
    }
    console.log(`totala priset är nu `, totalprice)
    return totalprice;
}

function addToCart(product, addonPrices) {
    let existingProduct = cart.find(item => item.name === product.name);

    if (existingProduct) {
        existingProduct.quantity += 1
        existingProduct.addons = existingProduct.addons.concat(addonPrices)
        console.log("exiting products", existingProduct)
    } else {
        cart.push({
            ...product, quantity: 1,
            addons: addonPrices

        })
    } console.log("cart after adding", cart)
    updateCart()


}

function updateCart() {
    let shoppingCart = document.querySelector('.shoppingCart-container');
    shoppingCart.innerHTML = "";

    summa = calcDiscount() + applyAddons()
    console.log("summa efter discount och addons", summa)


    cart = cart.filter(item => item.quantity >= 1)

    cart.forEach(item => {
        displayItemShoppingCart(item, shoppingCart)
        console.log(item)
    })
    $('.totalsum .sum').text(summa)
    console.log(summa)

}

function displayItemShoppingCart(product, shoppingCart_container) {
    if (typeof product.quantity !== 'number') {
        product.quantity = 1;
    }


    const productItem = document.createElement("li");
    productItem.classList.add("product-item");
    productItem.dataset.name = product.name

    const productInfo = document.createElement("span");
    productInfo.textContent = `${product.name} ${product.price} USD`;
    productInfo.dataset.name = product.name

    let productQuantity = document.createElement("span")
    productQuantity.classList.add("item-quantity")
    productQuantity.textContent = `Quantity: ${product.quantity || 1}`


    const removeItemButton = document.createElement("Button");
    removeItemButton.classList.add("remove-item");
    removeItemButton.textContent = "-";
    removeItemButton.dataset.price = product.price;

    const addItemButton = document.createElement("Button");
    addItemButton.classList.add("add-item");
    addItemButton.textContent = "+";
    addItemButton.dataset.price = product.price;

    productItem.appendChild(removeItemButton)
    productItem.appendChild(productInfo)
    productItem.appendChild(productQuantity)
    productItem.appendChild(addItemButton)
    shoppingCart_container.appendChild(productItem)



    removeItemButton.addEventListener("click", function () {
        if (product.quantity > 0) {
            product.quantity -= 1
            productQuantity.textContent = `Quantity: ${product.quantity}`
            if (product.quantity < product.addons.length) {
                product.addons.pop()
            }
        }
        if (product.quantity == 0) {
            cart = cart.filter(item => item.name != product.name)
            productItem.remove()
            console.log(1)
        }
        updateCart()
    })

    addItemButton.addEventListener("click", function () {
        product.quantity += 1
        productQuantity.textContent = `Quantity: ${product.quantity}`
        console.log("en quantity har lagt till", product.quantity)
        updateCart()
    })

}

const categoryDiscount = {
    requiredCategories: ["Keycaps", "Switches"],
    discountPercentage: 0.3
};

