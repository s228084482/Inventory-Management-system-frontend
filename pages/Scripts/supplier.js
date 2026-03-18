let suppliers = [];

document.addEventListener("DOMContentLoaded", ()=>{
    async function loadTableData() {
    const tableBody = document.getElementById("tableBody");
    const spinner = document.getElementById("loadingSpinner");
    const table = document.getElementById("supplierTable");


    try {
        spinner.style.display = "flex";
        table.style.display ="none";

        const response = await fetch(`http://localhost:8080/api/suppliers/getAll`);
        const results = await response.json();
        // if (!results.ok) {
        //     alert(results.message);
        //     console.log(results);
        //     return;
        // }
        suppliers = results;

        console.log(results);
        console.log(suppliers);

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
    //loading data to the table.
    loadTableData();
});

function renderTable(results) {
    console.log(results);

    const tablebody = document.querySelector("#supplierTable tbody");
    tablebody.innerHTML = "";

    results.forEach(data => {
        const row = document.createElement("tr");

        row.innerHTML = `
                <td>${data.supplierName}</td>
                <td>${data.supplierEmail}</td>
                <td>${data.supplierPhoneNumber}</td>
                <td>
                <button class="btn_edit" onclick="editSupplier(${data.supplierID},'${data.supplierName}',
                '${data.supplierEmail}','${data.supplierPhoneNumber}')">
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

    const params = new URLSearchParams(window.location.search);
    const upateTable = params.get("yes");

    if(upateTable === "yes"){
        loadTableData();
    }
    
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
    const spinner = document.getElementById("loadingSpinner");
    const formDiv = document.getElementById("formDiv");

    supplierForm.addEventListener("submit", (event) => {
        event.preventDefault();
        try {
            spinner.style.display = "flex";
            formDiv.style.display = "none";
            console.log("Spinner");

            confirm("Are you sure to add a new supplier.");

            const dataForm = new FormData(event.target);
            //supplierName, supplierPhoneNO, supplierEmail
            const supplierDTO = {
                supplierName: dataForm.get("supplierName"),
                supplierEmail: dataForm.get("supplierEmail"),
                supplierNumber: dataForm.get("supplierPhoneNO")
            };
            console.log(dataForm.get("supplierName"));
            console.log(dataForm.get("supplierEmail"));
            console.log(dataForm.get("supplierPhoneNO"));
            console.log(supplierDTO);

            fetch(`http://localhost:8080/api/suppliers/saveSupplier`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(supplierDTO)
            }).then(response => response.json())
                .then(result => {
                    if (result.ok) {
                        console.log(result);
                        alert("Suplier is Successfully added");
                    } else {
                        alert(result.message);
                        console.error(result);
                        return;
                    }

                });

        } catch (error) {
            console.error(error);
            spinner.style.display = "none";
            formDiv.style.display = "flex";
        } finally {
            spinner.style.display = "none";
            formDiv.style.display = "flex";
        }

    });
}
function searchSupplier(btn_search) {

    btn_search.addEventListener("click", () => {
        const searchValue = document.getElementById("txt_searchSupplier").value.toLowerCase();

        const matched = suppliers.filter(sup => sup.supplierName.toLowerCase().includes(searchValue));
        const notMatched = suppliers.filter(sup => !sup.supplierName.toLowerCase().includes(searchValue));

        const orderedSuppliers = [...matched, ...notMatched];
        renderTable(orderedSuppliers);

        document.getElementById("txt_searchSupplier").value = "";
        alert("Note! all matching values will be displayed at the top, otherwise not found.");
    });
}

function editSupplier(id,supplierName,supplierEmail,supplierPhoneNo) {
    window.location.href = `edit_supplier.html?id=${id}&supplierName=${encodeURIComponent(supplierName)}&supplier_Email=${encodeURIComponent(supplierEmail)}&supplierPhoneNo=${encodeURIComponent(supplierPhoneNo)}`;
    console.log(supplierEmail);
}

async function deleteSupplier(id) {
    confirm("Are sure to dele this supplier?");
    
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
