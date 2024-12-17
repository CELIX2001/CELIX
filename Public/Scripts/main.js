let fetchBtn = document.getElementById("getItems");
if (fetchBtn) fetchBtn.addEventListener("click", fetchCompanyProducts);

function fetchCompanyProducts() {
  const apiUrl = "https://raw.githubusercontent.com/CELIX2001/CELIX/refs/heads/main/products.json"; 

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const products = filterItemsByType(data, "service"); 
      displayItems(products);
      console.log("Company Products:", products);
    })
    .catch((error) => console.error("Error fetching products:", error));
}

function filterItemsByType(data, type) {
  return data
    .filter((item) => item.type === type)
    .map((item) => `${item.name} - ${item.description || "No description"}`); 
}

function displayItems(items) {
  let itemsContainer = document.getElementById("itemsList");
  if (itemsContainer) {
    itemsContainer.innerHTML = `<h3>Our Offerings</h3>
      <ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
  }
}
