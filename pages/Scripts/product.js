
let products = [];

//Fetching data from backend.
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
            reportOutComes("",error.message,"");
            return;
        } else {
            products = await response.json();
            renderPorducts(products.sort((a,b) => a.productName.localeCompare(b.productName)));
        }

    } catch (error) {
        reportOutComes(error, "Error loading data", "");
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

//Adding information to a database.
async function renderPorducts(data) {

    const tablebody = document.querySelector("#productTable tbody");
    if (!tablebody) {
        reportOutComes("","Table notfound.","");
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
                <button class="btn_edit" onclick="editProduct(${product.productId},'${product.productName}',${product.price},'${product.description}',${product.qty})">
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button class="btn_delete" onclick="deleteProduct(${product.productId})">
                    <i class="fa-solid fa-trash"></i>
                </button>
                </td>
                `;

        tablebody.appendChild(row);
    });

}

//calling EditProduct.html page, and passing some data in URL
function editProduct(id, productName, price, desc, qty) {
    window.location.href = `EditProduct.html?id=${id}&productName=${encodeURIComponent(productName)}&price=${encodeURIComponent(price)}&desc=${encodeURIComponent(desc)}&gty=${encodeURIComponent(qty)}`;
}

//deleteing product using product id which is a primary key.
async function deleteProduct(id) {
    const confirmDelete = confirm("Are you sure to delete this product?");
    if (confirmDelete) {
        try {

            const response = await fetch(`http://localhost:8080/api/products/${id}`, {
                method: "DELETE"
            });

            if (!response.ok) {
                const error = await response.json();
                alert(error.message, error.detail);
                return;
            }
            reportOutComes("", "Product is Successfully deleted!", "Information");
            loadTableData();

        } catch (error) {
            reportOutComes(error, "Something went wrong.", "Error");
        }
    }
}

//This DOM is for Product.html main page for product usecase.
document.addEventListener("DOMContentLoaded", () => {
    
    loadTableData();
    doFilter();

    const btn_add = document.getElementById("btn_addProduct");
    const btn_search = document.getElementById("btn_searchProduct");

    if (btn_add) {
        btn_add.addEventListener("click", () => {
            window.location.href = "add_product.html";
        });
    }

    if (btn_search) {
        searchFunction(btn_search);
    }
});

function doFilter(){
    const select = document.getElementById("filter-gropdown");
    select.addEventListener("change", function (){
        const value = this.value;

        const group = {
            available: products.filter(prod => prod.status === "available"),
            notAvailable: products.filter(prod => prod.status === "not_available")
        }

        if(value === "all")
            renderPorducts(products.sort((a,b) => a.productName.localeCompare(b.productName)));
        else if(value === "avilable")
            renderPorducts(group.available.sort((a,b) => a.productName.localeCompare(b.productName)));
        else if(value === "notAvailable")
            renderPorducts(group.notAvailable.sort((a,b) => a.productName.localeCompare(b.productName)));

    });
    
}

//searching product by name that is provide on the search box. All the matching name are putted on the top while other in the bottom.
function searchFunction(btn_search) {
    btn_search.addEventListener("click", () => {
        const searchValue = document.getElementById("txt_search").value.toLowerCase().trim();

        try {
            if (searchValue === "") {
                reportOutComes("","Search name is requied!","Requied");
                return;
            }
            if (!searchValue) {
                renderPorducts(products);
            }

            const matched = products.filter(prod => prod.productName.toLowerCase().startsWith(searchValue));
            const notMatched = products.filter(prod => !prod.productName.toLowerCase().includes(searchValue));

            if(Array.isArray(matched) && matched.length === 0){
                reportOutComes("","No matching values","Information");
                document.getElementById("txt_search").value = "";
                return;
            }

            const newList = [...matched, ...notMatched];
            renderPorducts(newList);

            document.getElementById("txt_search").value = "";
            reportOutComes("", "Find the matching at the top.", "Information.")

        } catch (error) {
            reportOutComes(error, "Something went wrong.","");
        }
    });
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




