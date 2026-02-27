
async function loadTableData() {

    fetch(`http://localhost:8080/api/supplier/`)
        .then(response => response.json())
        .then(supplier => {
            const tablebody = document.querySelector("#supplierTable tbody");
            tablebody.innerHTML = "";

            supplier.forEach(data => {
                const row = document.createElement("tr");

                row.innerHTML = `
                <td>${data.name}</td>
                <td>${data.email}</td>
                <td>${data.number}</td>
                <td>
                <button class="btn_edit" onclick="editSupplier(${data.id})">
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button class="btn_delete" onclick="deleteSupplier(${data.id})">
                    <i class="fa-solid fa-trash"></i>
                </button>
                </td>
                `;
                tablebody.append(row);
            });

        }).catch(err => console.error(err));
}
loadTableData();

document.addEventListener("DOMContentLoaded", () => {
    const supplierForm = document.getElementById("AddSupplierForm");

    const searchValue = document.getElementById("txt_searchSupplier").value.toLowerCase();
    const btn_search = document.getElementById(btn_searchSupplier);
    const row = document.querySelectorAll("#supplierTable tbody tr");


    if (supplierForm) {
        supplierForm.addEventListener("submit", (event) => {
            event.preventDefault();

            confirm("Are you sure, you are about to add a new supplier.")

            const dataForm = new dataForm(event.target);

            fetch(`http://localhost:8080/api/supplier/`, {
                method: "POST",
                body: dataForm
            }
            ).then(response => response.text)
                .then(result => {
                    console.log(result);
                    alert("Successfully added");
                }).catch(err => console.error(err));

        });
    }

    if(btn_search){
        btn_search.addEventListener("click", ()=>{
            row.forEach(data =>{
                const supplierName = data.cells[0].textContent.toLowerCase();
                if(supplierName.includes(searchValue)){
                     row.style.display = "";
                }else{
                     row.style.display = "none";
                }
            });
            document.getElementById("txt_searchSupplier").innerHTML = "";
        });
    }
});


async function editSupplier(id) {
    
}
async function deleteSupplier(id) {
    const confirm = confirm("Are sure to dele this supplier?");
    if(confirm){
        try {
            await fetch(`http://localhost:8080/api/supplier/${id}`, {
                method: "DELETE"
            })
            loadTableData();
            alert("Supplier is successfully deleted.")
        } catch (error) {
            console.error(error);
        }
    }
}