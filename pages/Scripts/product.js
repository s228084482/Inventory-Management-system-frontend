
document.getElementById("btn_searchProduct"), addEventListener("click", () => {
    const searchValue = document.getElementById("txt_search").value.toLowerCase();
    const row = document.querySelectorAll("#productTable tbody tr");

    row.forEach(row => {
        const productName = row.cells[0].textContent.toLowerCase();
        if (productName.includes(searchValue)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const btn_add = document.getElementById("btn_addProduct");

    if (btn_add) {
        btn_add.addEventListener("click", () => {
            window.location.href = "add_product.html";
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
//                 console, log(result);
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
//         , then(result => {
//             console.log(result);
//             alert("Saved successfully.");
//         }).catch(err => console.error(err));

// });


// fetch("http://localhost:8080/api/products/getProduct")
//     .then(response => response.json())
//     .then(products => {
//         const tablebody = document.querySelector("#productTable tbody");
//         tablebody.innerHTML = "";

//         // products.forEach(product => {
//         //     const row = document.createElement("tr");

//         //     row.innerHTML = '
//         //     <td>${product.}</td>
//         //     <td></td>
//         //     <td></td>
//         //     <td></td>
//         //     ';
//         // });
//     })