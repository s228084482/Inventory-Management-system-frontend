let suppliers = [];
async function loadTableData() {
    const tableBody = document.getElementById("tableBody");
    const spinner = document.getElementById("loadingSpinner");
    const table = document.getElementById("supplierTable");


    try {
        spinner.style.display = "flex";
        table.style.display ="none";

        const response = await fetch(`http://localhost:8080/api/suppliers/getAll`);
        const results = await response.json();
        if (!results.ok) {
            alert(results.message);
            console.log(results);
            return;
        }
        suppliers = results;
        renderTable(suppliers);
    } catch (error) {
        console.error("Error: ", error);

        tableBody.innerHTML = `
        <tr>
           <td colspan="4">Error loading data</td>
        </tr> 
        `;
        spinner.style.display = "none";
        table.style.display ="table";
    }finally{
        spinner.style.display = "none";
        table.style.display ="table";
    }

}

async function renderTable(results) {

    const tablebody = document.querySelector("#supplierTable tbody");
    tablebody.innerHTML = "";

    results.forEach(data => {
        const row = document.createElement("tr");

        row.innerHTML = `
                <td>${data.supplierName}</td>
                <td>${data.supplierEmail}</td>
                <td>${data.supplierPhoneNumber}</td>
                <td>
                <button class="btn_edit" onclick="editSupplier(${data.supplierID},${data.supplierName},
                ${data.supplierEmail},${data.supplierPhoneNumber})">
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button class="btn_delete" onclick="deleteSupplier(${data.supplierID})">
                    <i class="fa-solid fa-trash"></i>
                </button>
                </td>
                `;
        tablebody.append(row);
    });
}

//DOM for supplier main page.
document.addEventListener("DOMContentLoaded", () => {

    //loading data to the table.
    loadTableData();
    const supplierForm = document.getElementById("AddSupplierForm");
    const btn_search = document.getElementById("btn_searchSupplier");


    if (supplierForm) {
        saveSupplier(supplierForm);
    }

    if(btn_search){
        searchSupplier(btn_search);
    }
});

function saveSupplier(supplierForm){
    supplierForm.addEventListener("submit", (event) => {
            event.preventDefault();

            confirm("Are you sure to add a new supplier.");

            const dataForm = new FormData(event.target);
            //supplierName, supplierPhoneNO, supplierEmail
            const supplierDTO = {
                supplierName: dataForm.get("supplierName"),
                supplierEmail: dataForm.get("supplierEmail"),
                supplierNumber: dataForm.get("supplierPhoneNO")
            };

            fetch(`http://localhost:8080/api/suppliers/saveSupplier`, {
                method: "POST",
                headers:{
                    "Content-type": "application/json"
                },
                body: JSON.stringify(supplierDTO)
            }
            ).then(response => response.json())
                .then(result => {
                    if(result.ok){
                        console.log(result);
                        alert("Suplier is Successfully added");
                    }else{
                        alert(result.message);
                        console.error(result);
                        return;
                    }
                    
                }).catch(err => console.error(err));

        });
}
function searchSupplier(btn_search) {

    btn_search.addEventListener("click", () => {
        const searchValue = document.getElementById("txt_searchSupplier").value.toLowerCase();

        const matched = suppliers.filter(sup => sup.supplierName.toLowerCase().includes(searchValue));
        const notMatched = suppliers.filter(sup => !sup.supplierName.toLowerCase().includes(searchValue));

        const orderedSuppliers = [...matched, ...notMatched];
        renderTable(orderedSuppliers);

        document.getElementById("txt_searchSupplier").innerHTML = "";
        alert("Note! all matching values will be displayed at the top, otherwise not found.");
    });
}

async function editSupplier(id,supplierName,supplierEmail,supplierPhoneNo) {
    window.location.href = `adit_supplier.html?id=${id}&supplierName=${encodeURIComponent(supplierName)}&
    supplierEmail=${encodeURIComponent(supplierEmail)}&supplierPhoneNo=${encodeURIComponent(supplierPhoneNo)}`;
}

//DOM foredit_suppler.html page.
document.addEventListener("DOMContentLoaded", ()=>{
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const old_supplierName = params.get("supplierName");
    const old_supplierEmail = params.get("supplierEmail");
    const old_supplierPhoneNo = params.get("supplierPhoneNo");

    const supplier_editForm = document.getElementById("supplier_editForm");
    if(supplier_editForm){
        supplier_editForm.addEventListener("submit", (event)=>{
            event.preventDefault();

            try {
                const dataform = new FormData(event.target);
                bindInputsElementWithOldValues(old_supplierName, old_supplierEmail, old_supplierPhoneNo);

                //supplierName, supplierEmail, supplierPhoneNO
                if (old_supplierName === dataform.get("supplierName") && old_supplierEmail === dataform.get("supplierEmail") &&
                    old_supplierPhoneNo === dataform.get("supplierPhoneNO")) {
                        alert("There no chnages made!");
                }else{
                    const supplier = {
                        supplierName: dataform.get("supplierName"),
                        supplierEmail: dataform.get("supplierEmail"),
                        supplierNumber: dataform.get("supplierPhoneNO")
                    };

                    updateAtBackend(id,supplier);

                }
                
            } catch (error) {
                console.error(error);
            }
            
        });
    }
    
});

//Binding elements with the old values of data so that user can see what to edit.
function bindInputsElementWithOldValues(old_supplierName,old_supplierEmail,old_supplierPhoneNo){
    //, , 
    document.getElementById("supplier-edit-name").value = old_supplierName;
    document.getElementById("supplier-edit-email").value = old_supplierEmail;
    document.getElementById("supplier-edit-number").value = old_supplierPhoneNo;
}
async function updateAtBackend(id,supplier) {
    try {
        const response = await fetch(`http://localhost:8080/api/suppliers/${id}`,{
            method: "PUT",
            headers:{
                "Content-type": "aaplication/json"
            },
            body: JSON.stringify(supplier)
        });

        const results = response.json();
        if(!results.ok){
            alert(results.message);
            console.log(results);
            return;
        }

        loadTableData();
        alert("Supplier has been successfully updated.");
    } catch (error) {
        console.error(error);
    }
}
async function deleteSupplier(id) {
    const confirm = confirm("Are sure to dele this supplier?");
    if(confirm){
        try {
            const response = await fetch(`http://localhost:8080/api/suppliers/${id}`, {
                method: "DELETE"
            });

            const result = await response.json();
            if(result.ok){
                loadTableData();
                alert("Supplier has been successfully deleted.")
            }else{
                alert("Something went wrong, please try again.");
                return;
            }
        } catch (error) {
            console.error(error);
        }
    }
}
