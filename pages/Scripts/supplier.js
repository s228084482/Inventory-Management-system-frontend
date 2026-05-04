let suppliers = [];

async function loadTableData() {
    const tableBody = document.getElementById("tableBody");
    const spinner = document.getElementById("loadingSpinner");
    const supplierMain = document.getElementById("supplierMain");


    try {
        spinner.style.display = "flex";
        supplierMain.style.display ="none";

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
        renderTable(suppliers.sort((a,b) => a.supplierName.localeCompare(b.supplierName)));
    } catch (error) {
        console.error("Error: ", error);

        tableBody.innerHTML = `
        <tr>
           <td colspan="4">Error loading data</td>
        </tr> 
        `;
        spinner.style.display = "none";
        supplierMain.style.display ="flex";
    }finally{
        spinner.style.display = "none";
        supplierMain.style.display ="flex";
    }

}

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
    loadTableData();

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

async function saveSupplier(supplierForm){

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
        console.log(dataForm.get("supplierName"));
        console.log(dataForm.get("supplierEmail"));
        console.log(dataForm.get("supplierPhoneNO"));
        console.log(supplierDTO);

        saveSupplieerToDB(supplierDTO);
    });
}
async function saveSupplieerToDB(supplierDTO) {
    const spinner = document.getElementById("loadingSpinner");
    const formDiv = document.getElementById("formDiv");
    try {
        spinner.style.display = "flex";
        formDiv.style.display = "none";
        console.log("Spinner");

        const response = await fetch(`http://localhost:8080/api/suppliers/saveSupplier`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(supplierDTO)
        });

        const results = await response.json();
        if (!response.ok) {
            reportOutComes("",results.message,"");
            console.error(results);
            return;
        }

        console.log(results);
        reportOutComes("","Suplier is Successfully added","Information");

        loadTableData();

    } catch (error) {
        console.error(error);
        spinner.style.display = "none";
        formDiv.style.display = "flex";
    } finally {
        spinner.style.display = "none";
        formDiv.style.display = "flex";
    }
    
}
function searchSupplier(btn_search) {

    btn_search.addEventListener("click", () => {
        const searchValue = document.getElementById("txt_searchSupplier").value.toLowerCase();

        const matched = suppliers.filter(sup => sup.supplierName.toLowerCase().includes(searchValue));
        const notMatched = suppliers.filter(sup => !sup.supplierName.toLowerCase().includes(searchValue));

        if(Array.isArray(matched) && matched.length === 0){
            reportOutComes("","Supplier not found","Information");
            document.getElementById("txt_searchSupplier").value = "";
            return;
        }
        const orderedSuppliers = [...matched, ...notMatched];
        renderTable(orderedSuppliers);

        document.getElementById("txt_searchSupplier").value = "";
        // alert("Note! all matching values will be displayed at the top, otherwise not found.");
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
                reportOutComes("","Supplier has been successfully deleted.","");
            }else{
                reportOutComes("","Something went wrong, please try again.","");
                return;
            }
        } catch (error) {
            console.error(error);
        }
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