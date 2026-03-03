
async function loadTableData() {

    fetch("http://localhost:8080/api/products/getAllProducts")
        .then(response => response.json())
        .then(products => {
            const tablebody = document.querySelector("#productTable tbody");
            tablebody.innerHTML = "";

            products.forEach(product => {
                const row = document.createElement("tr");

                row.innerHTML = `
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.description}</td>
                <td>${product.qauntity}</td>
                <td>${product.status}</td>
                <td>
                <button class="btn_edit" onclick="editProduct(${product.id})">
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button class="btn_delete" onclick="deleteProduct(${product.id})">
                    <i class="fa-solid fa-trash"></i>
                </button>
                </td>
                `;

                tablebody.appendChild(row);
            });
        })

}
document.addEventListener("DOMContentLoaded", ()=>{
loadTableData();
});

async function editProduct(id) {
     window.location.href = "EditProduct.html";
     handleEditFunctionality(id,productName);
}
async function handleEditFunctionality(id) {

    document.getElementById("product_editForm").addEventListener("submit", (event)=>{
        event.preventDefault();

        const formData = new FormData(event.target);

        update(formData,id);
    });
}
async function update(formData,id) {
    try {

        const product ={
            productName: formData.get("productName"),
            price: formData.get("price"),
            quantity: formData.get("quantity"),
            description: formData.get("description")
        };

        await fetch(`http://localhost:8080/api/products/${id}`, {
            method: "PUT",
            headers:{
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
        if(confirm){
            try {
            
                await fetch(`http://localhost:8080/api/products/${id}`, {
                    method: "DELETE"
                });
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

    const searchValue = document.getElementById("txt_search").value.toLowerCase();
    const row = document.querySelectorAll("#productTable tbody tr");


    if (btn_add) {
        btn_add.addEventListener("click", () => {
            window.location.href = "add_product.html";
        });
    }

    if (btn_search) {
        btn_search.addEventListener("click", () => {
            row.forEach(row => {
                const productName = row.cells[0].textContent.toLowerCase();
                if (productName.includes(searchValue)) {
                    row.style.display = "";
                } else {
                    row.style.display = "none";
                }
            });
            document.getElementById("txt_search").innerHTML = "";
        });
    }
});

// const productForm = document.getElementById("addProductForm");
// if (productForm) {
//     productForm.addEventListener("submit", (event) => {
//         event.preventDefault();

//         const formData = new FormData(event.target);

//         const productName = formData.get("productName");
//         const price = formData.get("price");
//         const quantity = formData.get("quantity");
//         const description = formData.get("description");

//         console.log(productName, price, quantity, description);

//         fetch("http://localhost:8080/api/products/save", {
//             method: "POST",
//             body: formData  
//         }).then(response => response.text)
//             .then(result => {
//                 console.log(result);
//                 alert("Product saved successfully");
//             }).catch(err => console.error(err));
//     });
// }


// document.getElementById("formProductInfo").addEventListener("submit", (event) => {
//     event.preventDefault();

//     const dataForm = new dataForm(event.target);

//     fetch("http://localhost:8080/api/products/saveProductInfo", {
//         method: "POST",
//         body: dataForm
//     }).then(response => response.text)
//         .then(result => {
//             console.log(result);
//             alert("Saved successfully.");
//         }).catch(err => console.error(err));

// });

