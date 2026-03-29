//DOM foredit_suppler.html page.
document.addEventListener("DOMContentLoaded", ()=>{
   landingElements();

});

async function landingElements() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const old_supplierName = decodeURIComponent(params.get("supplierName"));
    const old_supplierEmail = decodeURIComponent(params.get("supplier_Email"));
    const old_supplierPhoneNo = decodeURIComponent(params.get("supplierPhoneNo"));

    console.log("This ID", id, old_supplierName, old_supplierEmail, old_supplierPhoneNo);
    bindInputsElementWithOldValues(old_supplierName, old_supplierEmail, old_supplierPhoneNo);


    document.getElementById("supplier_editForm").addEventListener("submit", (event) => {
        event.preventDefault();

        try {
            const dataform = new FormData(event.target);
            console.log("Inside form.",old_supplierName, old_supplierEmail, old_supplierPhoneNo);

            //supplierName, supplierEmail, supplierPhoneNO
            if (old_supplierName === dataform.get("supplierName") && old_supplierEmail === dataform.get("supplierEmail") &&
                old_supplierPhoneNo === dataform.get("supplierPhoneNO")) {
                alert("There are no chnages made!");
            } else {
                const supplier = {
                    supplierName: dataform.get("supplierName"),
                    supplierEmail: dataform.get("supplierEmail"),
                    supplierNumber: dataform.get("supplierPhoneNO")
                };

                updateAtBackend(id, supplier);

            }

        } catch (error) {
            console.error(error);
        }

    });
}

//Binding elements with the old values of data so that user can see what to edit.
function bindInputsElementWithOldValues(old_supplierName,old_supplierEmail,old_supplierPhoneNo){
    console.log("INSIRT BIND FUNCTION=", old_supplierName, old_supplierEmail, old_supplierPhoneNo);

    document.getElementById("supplier-edit-name").value = old_supplierName;
    document.getElementById("supplier-edit-email").value = old_supplierEmail;
    document.getElementById("supplier-edit-number").value = old_supplierPhoneNo;
}
async function updateAtBackend(id,supplier) {
    const spinner = document.getElementById("loadingSpinner");
    const main = document.getElementById("edit-product-subAdding");
    try {
        spinner.style.display = "flex";
        main.style.display = "none";

        const response = await fetch(`http://localhost:8080/api/suppliers/${id}`,{
            method: "PUT",
            headers:{
                "Content-type": "application/json"
            },
            body: JSON.stringify(supplier)
        });

        const results = await response.text();
        if(!results.ok){
            alert(results);
            console.log(results);
            return;
        }

        alert("Supplier has been successfully updated.");
        const yes = "yes";
        window.location.href = `suppliers.html?updateTable=${yes}`
    } catch (error) {
        alert("Something went please try again later.")
        console.error(error);
        
        spinner.style.display = "none";
        main.style.display = "flex";
    }finally{
        spinner.style.display = "none";
        main.style.display = "flex";
    }
}