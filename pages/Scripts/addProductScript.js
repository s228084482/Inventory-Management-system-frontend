//DOM for addproduct.html page.
document.addEventListener("DOMContentLoaded", () => {

    const productForm = document.getElementById("addProductForm");
    if (productForm) {
        productForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const spinner = document.getElementById("loadingSpinner");
            const main = document.getElementById("subAdding");
            try {
                spinner.style.display = "flex";
                main.style.display = "none";

                const formData = new FormData(event.target);

                const productName = formData.get("productName");
                const price = formData.get("price");
                const quantity = formData.get("quantity");
                const description = formData.get("description");

                console.log("Done collecting values for product");

                window.location.href = `product_info.html?productName=${encodeURIComponent(productName)}&price=${encodeURIComponent(price)}&quantity=${encodeURIComponent(quantity)}&description=${encodeURIComponent(description)}`;

                console.log("new Page has been started successfully");
            } catch (error) {
                console.error("Error: ", error);
                alert("Something went wrong, please try again.");

                spinner.style.display = "none";
                main.style.display = "flex";
            }finally{
                spinner.style.display = "none";
                main.style.display = "flex";
            }

        });
    }
});