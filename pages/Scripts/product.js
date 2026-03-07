let products = [];
async function loadTableData() {
    const tableBody = document.getElementById("tableBody");
    const spinner = document.getElementById("loadingSpinner");
    const table = document.getElementById("productTable");

    if (!spinner || !table || !tableBody) {
        console.error("One or more elements not found in DOM.");
        return;
    }


    try {
        spinner.style.display = "flex";
        table.style.display = "none";

        const response = await fetch("http://localhost:8080/api/products/getAllProducts");

        if (!response.ok) {
            const error = await response.json();

            spinner.style.display = "none";
            table.style.display = "table";
            alert(error.message, error.detail);
            return;
        } else {
            products = await response.json();
            renderPorducts(products);
        }

    } catch (error) {
        console.error(error);
        tableBody.innerHTML = `
        <tr>
        <td colspan="4">Error loading data</td>
        </tr> 
        `;
        spinner.style.display = "none";
        table.style.display = "table";
    } finally {
        spinner.style.display = "none";
        table.style.display = "table";
    }

}
document.addEventListener("DOMContentLoaded", () => {
    loadTableData();
});
async function renderPorducts(data) {

    const tablebody = document.querySelector("#productTable tbody");
    if (!tablebody) {
        console.error("Table notfound.");
        return;
    }

    tablebody.innerHTML = "";

    data.forEach(product => {
        const row = document.createElement("tr");

        row.innerHTML = `
                <td>${product.productName}</td>
                <td>${product.price}</td>
                <td>${product.description}</td>
                <td>${product.qty}</td>
                <td>${product.status}</td>
                <td>
                <button class="btn_edit" onclick="editProduct(${product.productId})">
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button class="btn_delete" onclick="deleteProduct(${product.productId},${product.productName},
                ${product.price},${product.description},${product.qty},${product.status})">
                    <i class="fa-solid fa-trash"></i>
                </button>
                </td>
                `;

        tablebody.appendChild(row);
    });

}

async function editProduct(id,productName,price,desc,gty,status) {
    
    window.location.href = `EditProduct.html?id=${id}&productName=${encodeURIComponent(productName)}&price=${encodeURIComponent(price)}&desc=${encodeURIComponent(desc)}&gty=${encodeURIComponent(gty)}&status=${encodeURIComponent(status)}`;
    // handleEditFunctionality(id, productName);
}
document.addEventListener("DOMContentLoaded", ()=>{

    const param = new URLSearchParams(window.location.search);
    const id = param.get("id");
    const productName = decodeURIComponent(param.get("productName"));
    const price = decodeURIComponent(param.get("price"));
    const desciption = decodeURIComponent(param.get("desc"));
    const gty = decodeURIComponent(param.get("gty"));
    const status = decodeURIComponent(param.get("status"));

    document.getElementById("product_editForm").addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        //, , 
        const curProductName = formData.get("productName");
        const curPrice = formData.get("price");
        const curQty = formData.get("quantity");
        const curDescription = formData.get("description");

        if(!(curProductName & curPrice & curQty & curDescription)){
            alert("Something went wrong.");
            return;
        }

        curProductName.value = productName;
        curPrice.value = price;
        curQty.value = gty;
        curDescription.value = desciption;

        
        update(formData, id);
    });


});

async function update(formData, id) {
    try {

        const product = {
            productName: formData.get("productName"),
            price: formData.get("price"),
            quantity: formData.get("quantity"),
            description: formData.get("description")
        };

        await fetch(`http://localhost:8080/api/products/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(product)
        });
        loadTableData();
        alert("Product successfully updated!");
    } catch (error) {
        console.error(error);
    }
}
async function deleteProduct(id) {
    const confirm = confirm("Are you sure to delete this product?");
    if (confirm) {
        try {

            const response = await fetch(`http://localhost:8080/api/products/${id}`, {
                method: "DELETE"
            });

            if(!response.ok){
                const error = await response.json();
                alert(error.message, error.detail);
                return;
            }

            loadTableData();
            alert("Product is Successfully deleted!")
        } catch (error) {
            console.error(error);
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const btn_add = document.getElementById("btn_addProduct");
    const btn_search = document.getElementById("btn_searchProduct");

    const searchValue = document.getElementById("txt_search").value.toLowerCase().trim();;
    // const row = document.querySelectorAll("#productTable tbody tr");


    if (btn_add) {
        btn_add.addEventListener("click", () => {
            window.location.href = "add_product.html";
        });
    }

    if (btn_search) {
        btn_search.addEventListener("click", () => {
            try {
                if (searchValue === "") {
                    alert("Search name is requied!");
                    return;
                }
                if (!searchValue) {
                    renderPorducts(products);
                }

                const matched = products.filter(prod => prod.productName.toLowerCase().includes(searchValue));
                const notMatched = products.filter(prod => !prod.productName.toLowerCase().includes(searchValue));
                const newList = [...matched, ...notMatched];
                renderPorducts(newList);

                document.getElementById("txt_search").innerHTML = "";
                alert("Note! all matching values will be displayed at the top, otherwise not found.");

            } catch (error) {
                console.error(error);
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {

    const productForm = document.getElementById("addProductForm");
    if (productForm) {
        productForm.addEventListener("submit", (event) => {
            event.preventDefault();
            try {
                const formData = new FormData(event.target);

                const productName = formData.get("productName");
                const price = formData.get("price");
                const quantity = formData.get("quantity");
                const description = formData.get("description");


                window.location.href = `product_info.html?productName=${encodeURIComponent(productName)}&price=${encodeURIComponent(price)}&quantity=${encodeURIComponent(quantity)}&description=${encodeURIComponent(description)}`;

            } catch (error) {
                console.error("Error: ", error);
                alert("Something went wrong, please try again.")
            }

        });
    }
});

document.addEventListener("DOMContentLoaded", () => {

    const param = new URLSearchParams(window.location.search);

    const productName = decodeURIComponent(param.get("productName"));
    const price = decodeURIComponent(param.get("price"));
    const quantity = decodeURIComponent(param.get("quantity"));
    const description = decodeURIComponent(param.get("description"));


    document.getElementById("formProductInfo").addEventListener("submit", (event) => {
        event.preventDefault();

        const dataForm = new dataForm(event.target);
        const supplierName = dataForm.get("supplierName");
        const move = dataForm.get("move");
        const category_name = dataForm.get("category_name");
        const user_name = dataForm.get("user_name");

        const product_Holder = {
            productName: productName,
            price: price,
            quantity: quantity,
            description: description,
            supplierName: supplierName,
            move: move,
            category_name: category_name,
            user_name: user_name
        }

        fetch("http://localhost:8080/api/products/save", {
            method: "POST",
            body: JSON.stringify(product_Holder)
        }).then(response => response.text)
            .then(result => {

                if (result) {
                    alert("Saved successfully.");
                } else {
                    alert("Something went wrong, please try again.");
                }

            }).catch(err => console.error(err));

    });

});




