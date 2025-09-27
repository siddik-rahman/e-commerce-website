//  product list
const products = [
  {name: "Wireless Mouse", price: 20, img: "images/img-1.jpg"},
  {name: "Headphone", price: 25, img: "images/img-2.jpg"},
  {name: "Pant", price:15, img: "images/img-3.jpg"},
  {name: "T-shirt", price: 12.99, img: "images/img-4.jpg"},
  {name: "Laptop", price: 399.99, img: "images/img-5.jpg"},
  {name: "T-shirt", price: 10.99, img: "images/img-6.jpg"},
  {name: "Parts", price: 12.99, img: "images/img-7.jpg"},
  {name: "Shoes", price: 13.99, img: "images/img-8.jpg"},
  {name: "Hanger", price: 15.99, img: "images/img-9.jpg"},
  {name: "Shallar", price: 18.99, img: "images/img-10.jpg"},
  {name: "Pant", price: 20.99, img: "images/img-11.jpg"},
  {name: "Coat", price: 22.99, img: "images/img-12.jpg"},
 
];

// Selecting elements 
 const searchBox = document.getElementById("searchBox");
 const container = document.getElementById("productContainer");
 const cartBtn = document.getElementById("cartBtn");
 const cartDropdown = document.getElementById("cartDropdown");
 const cartItems = document.getElementById("cartItems");
 const cartTotal = document.getElementById("cartTotal");
 const darkToggle = document.getElementById("darkToggle");

let total = 0;


//  Function to render products
let cartCountNum = 0;
function renderProducts(list){
   container.innerHTML = "";
   list.forEach(p=>{
     const card = document.createElement("div");
     card.className = "bg-white p-4 rounded-xl shadow hover:shadow-xl text-center transition";
     card.innerHTML = `
       <img src="${p.img}" alt="${p.name}" class="h-72 w-full object-cover rounded">
       <h2 class="text-lg font-semibold mt-2">${p.name}</h2>
       <p class="text-gray-600 mb-2">$${p.price}</p>
       <button class="addCart bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg">Add to Cart</button>
     `;
     container.appendChild(card);

    // Add to cart button click
   
    card.querySelector(".addCart").addEventListener("click", ()=>{
      const li = document.createElement("li");
      li.className = "flex justify-between items-center mb-2";
      li.innerHTML = `${p.name} - $${p.price}
      <button class="removeItem text-red-600 ml-3">❌</button>
   `;

      
      cartItems.appendChild(li);

      total += p.price;
      cartTotal.textContent = `Total: $${total.toFixed(2)}`;

      cartCountNum++;
      document.getElementById("cartCount").textContent = cartCountNum;
    });
  });
}
renderProducts(products);



// Search filter
searchBox.addEventListener("input", ()=>{
  const val = searchBox.value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(val));
  renderProducts(filtered);
});
// Cart toggle 
cartBtn.addEventListener("click", ()=> {
  cartDropdown.classList.toggle("hidden");
});


// Remove from cart
cartItems.addEventListener("click", (e)=>{
   if(e.target.classList.contains("removeItem")){
      const li = e.target.parentElement;

     
      const priceText = li.textContent.match(/\$([0-9.]+)/)[1];
      const price = parseFloat(priceText);

      li.remove(); // Remove the cart item
        
      total -= price;
      cartTotal.textContent = `Total: $${total.toFixed(2)}`;
         // Update cart count
      cartCountNum--;
      document.getElementById("cartCount").textContent = cartCountNum;
   }
});
