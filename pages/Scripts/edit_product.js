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

        // if (!(curProductName && curPrice && curQty && curDescription)) {
        //     alert("Something went wrong.");
        //     return;
        // }

        if (curProductName !== productName || curPrice !== price ||
            curQty !== qty || curDescription !== desciption
        ) {
            update(formData, id);
        } else {
            // alert();
            reportOutComes("","No changes made!","Error");
        }

    });

}

//Do updates in DB my communicating with back end for updating a product information.
async function update(formData, id) {
    // const spinner = document.getElementById("loadingSpinner");
    // const main = document.getElementById("edit-product-subAdding");
    try {
        // spinner.style.display = "flex";
        // main.style.display = "none";

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

        console.log("Started to check response.============")
        if (!response.ok) {
            console.log("Response is not okey so there is something went wrong surely from BACKEND.")
            const error = await response.json();
            // alert(error.message);
            reportOutComes(error,error.message,"Error")
            // console.error(response);
            return;
        } else {
            console.log("Done editing.==============================");
            window.location.href = "products.html"
            // loadTableData();
            reportOutComes("","Product successfully updated!","Information");
        }

    } catch (error) {
        console.log("Error has been occured.========================")
        reportOutComes(error, "Something went wrong, please try again later.", "Error");
        console.error(error);

        // spinner.style.display = "none";
        // main.style.display = "flex";
    } finally {
        DoCloses();

        // spinner.style.display = "none";
        // main.style.display = "flex";
    }
}
function DoCloses() {
    document.getElementById("close-btn").addEventListener("click", () => {
        document.getElementById("popup").style.display = "none";
    });

    window.onclick = function (event) {
        let popup = document.getElementById("popup");
        if (event.target === popup) {
            popup.style.display = "none";
        }
    }
}
function reportOutComes(error,message,type) {
    document.getElementById("popup").style.display = "block";

    if(message !== "")
        document.getElementById("popup-message").innerText = message;
    if(type !== "")
        document.getElementById("popup-title").innerText = type;

    if(error !== "")
        console.error("ERROR ", error);

    DoCloses();
}