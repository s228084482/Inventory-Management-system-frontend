document.addEventListener("DOMContentLoaded", ()=>{
    const Form = document.getElementById("stockOUTForm");
    const lbl_products = document.getElementById("selectorStockOUT");

    addProducts(lbl_products);

    if(Form){
        Form.addEventListener("submit", (event)=>{
            event.preventDefault();
            const dataForm = new FormData(event.target);

            updateStock(dataForm);
        });
    }
});

async function updateStock(dataForm) {
    try {
        
        const Product = {
            productName: dataForm.get("product_name"),
            qty: dataForm.get("quantity")
        };

        const response = await fetch(``,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Product)
        });
        
        const results = await response.json();

        if(!results.ok){
            alert(results.message);
            console.log(results);
            return;
        }
        alert("Stock successfully moved out.");
        
    } catch (error) {
        console.error("Error: ", error);
        alert("Something went wrong.");
    }
}

async function addProducts(select) {
    try {
        const response = await fetch("http://localhost:8080/api/products/getAllProducts");
        const results = await response.json();

        if(!results.ok){
            alert(results.message);
            console.log(results);
            return;
        }

        results.forEach(product => {
            const option = document.createElement("option");

            option.value = product.productName;
            option.value = product.productName;

            select.appendChild(option);
        });

    } catch (error) {
        console.error(error);
    }finally{

    }
}