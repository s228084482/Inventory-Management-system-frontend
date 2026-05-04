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
    addToSelect("selectorUser",`http://localhost:8080/api/users/getAllUsers`);


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
        };
        console.log(product_Holder);
        insertProduct(product_Holder);

    });

});
async function insertProduct(product_Holder) {
    try {
        const response = await fetch("http://localhost:8080/api/products/save", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(product_Holder)
        });

        const result = await response.json();

        if(result === true){
            reportOutComes("","Product has been saved successfully.", "Information");
            window.location.href = "products.html";
        }else{
            reportOutComes("", result.message, "");
            // alert(result.message);
            console.log(result);
            return;
        }

        

    } catch (error) {
        reportOutComes(error, "Something went wrong while saving.","");
    }
}

async function addToSelect(selectName,api){
    const select = document.getElementById(selectName);

    try {
        const response = await fetch(api);
        const results = await response.json();

        if (!response.ok) {
            reportOutComes(results,results.message,"");
            return;
        }

        results.forEach(data =>{
            const option = document.createElement("option");

            if (selectName === "selectorCategory") {
                option.value = data.name;
                option.textContent = data.name;

                select.appendChild(option);
            }else if (selectName === "selectorSupplier") {
                option.value = data.supplierName;
                option.textContent = data.supplierName;

                select.appendChild(option);
            }else if(selectName === "selectorUser"){
                option.value = data.fullName;
                option.textContent = data.fullName;

                select.appendChild(option);
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