document.addEventListener("DOMContentLoaded", () => {
    doValidation();
});



//Validating that the information has indeed updated on UI before sending to back end for updating product.
function doValidation() {
    const param = new URLSearchParams(window.location.search);
    const id = param.get("id");
    const productName = decodeURIComponent(param.get("productName"));
    const price = decodeURIComponent(param.get("price"));
    const desciption = decodeURIComponent(param.get("desc"));
    const qty = decodeURIComponent(param.get("gty"));

    document.getElementById("product-edit-productName").value = productName;
    document.getElementById("product-edit-price").value = price;
    document.getElementById("product-edit-qty").value = qty;
    document.getElementById("product-edit-description").value = desciption;

    document.getElementById("product_editForm").addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);

        const curProductName = formData.get("productName");
        const curPrice = formData.get("price");
        const curQty = formData.get("quantity");
        const curDescription = formData.get("description");

        if (!(curProductName && curPrice && curQty && curDescription)) {
            alert("Something went wrong.");
            return;
        }

        if (curProductName !== productName || curPrice !== price ||
            curQty !== qty || curDescription !== desciption
        ) {
            update(formData, id);
        } else {
            alert("No changes made!");
        }

    });

}

//Do updates in DB my communicating with back end for updating a product information.
async function update(formData, id) {
    const spinner = document.getElementById("loadingSpinner");
    const main = document.getElementById("edit-product-subAdding");
    try {
        spinner.style.display = "flex";
        main.style.display = "none";

        const product = {
            productName: formData.get("productName"),
            price: formData.get("price"),
            quantity: formData.get("quantity"),
            description: formData.get("description")
        };

        const response = await fetch(`http://localhost:8080/api/products/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(product)
        });

        if (!response.ok) {
            const error = await response.json();
            alert(error.message);
            console.error(response);
            return;
        } else {
            loadTableData();
            alert("Product successfully updated!");
        }

    } catch (error) {
        console.error(error);
        alert("Something went wrong, please try again later.");

        spinner.style.display = "none";
        main.style.display = "flex";
    }finally{
        spinner.style.display = "none";
        main.style.display = "flex";
    }
}
