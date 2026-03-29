//DOM for adding productInfor.html page
document.addEventListener("DOMContentLoaded", () => {

    const param = new URLSearchParams(window.location.search);

    const productName = decodeURIComponent(param.get("productName"));
    const price = decodeURIComponent(param.get("price"));
    const quantity = decodeURIComponent(param.get("quantity"));
    const description = decodeURIComponent(param.get("description"));

    // addSuppliersToSelect();
    // addCategoryToSelect();
    addToSelect("selectorSupplier",`http://localhost:8080/api/suppliers/getAll`);
    addToSelect("selectorCategory",`http://localhost:8080/api/category/getAllCategoryData`);
    // addToSelect("selectorUser",`http://localhost:8080/api/users/`);


    document.getElementById("formProductInfo").addEventListener("submit", (event) => {
        event.preventDefault();

        const dataForm = new FormData(event.target);

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
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(product_Holder)
        }).then(response => response.json())
            .then(result => {

                if (result.ok) {
                    alert("Product has been saved successfully.");
                } else {
                    alert("Something went wrong, please try again.");
                }

            }).catch(err => console.error(err));

    });
    // addSuppliersToSelect();
    

});
async function addCategoryToSelect() {
    const spinner = document.getElementById("loadingSpinner");
    const main = document.getElementById("product-subAdding");

    const select = document.getElementById("selectorCategory");

    try {
        spinner.style.display = "flex";
        main.style.display = "none";

        const response = await fetch(`http://localhost:8080/api/category/getAllCategoryData`);
        const results = await response.json();

        console.log(results);

        // if (!results.ok) {
        //     alert(results.message);
        //     console.log(results);
        //     return;
        // }

        results.forEach(category =>{
            const op = document.createElement("option");
            console.log("Starting to add element for select category.");

            op.value = category.name;
            op.textContent = category.name;

            select.appendChild(op);
            console.log("Done adding category elements.");
        });
        
    } catch (error) {
        alert("Something went wrong, please try again later.");
        console.error("Error: ", error);

        spinner.style.display = "none";
        main.style.display = "flex";
    }finally{
        spinner.style.display = "none";
        main.style.display = "flex";
    }
}

async function addToSelect(selectName,api){
    const select = document.getElementById(selectName);

    try {
        const response = await fetch(api);
        const results = await response.json();

        // if (!results.ok) {
        //     alert(results.message);
        //     console.log(results);
        //     return;
        // }

        results.forEach(data =>{
            const option = document.createElement("option");

            if (selectName === "selectorCategory") {
                option.value = category.name;
                option.textContent = category.name;

                select.appendChild(option);
            }

            if (selectName === "selectorSupplier") {
                option.value = data.supplierID;
                option.textContent = data.supplierName;
                select.appendChild(option);
            }

            if(selectName === "selectorUser"){
                
            }
            
        });
        
    } catch (error) {
        console.error("ERROR TO addSuppliersToSelect() FUNCTION: ", error);
    }
}

async function addUsersToSelect(){
    const select = document.getElementById("selectorUser");

    try {
        const response = await fetch(`http://localhost:8080/api/users/`);
        const results = await response.json();

        // if (!results.ok) {
        //     alert(results.message);
        //     console.log(results);
        //     return;
        // }

        results.forEach(supplier =>{
            const option = document.createElement("option");
            option.value = supplier.supplierID;
            option.textContent = supplier.supplierName;

            select.appendChild(option);
        });
        
    } catch (error) {
        console.error("ERROR ON addUsersToSelect() FUNCTION : ", error);
    }
}
