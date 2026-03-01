let categories = [];

document.addEventListener("DOMContentLoaded", () => {

    
    const row = document.querySelectorAll("#categoryTable tbody tr");
    const btnSearch = document.getElementById("btn_searchCategory");
    

    if(btnSearch){
        btnSearch.addEventListener("click", () => {
            const searchValue = document.getElementById("txt_searchCategory").value.toLowerCase().trim();
            if(!searchValue){
                renderCategories(categories);
                return;
            }

            const matched = categories.filter(cat => cat.name.toLowerCase().includes(searchValue));
            const notMached = categories.filter(cat => !cat.name.toLowerCase().includes(searchValue));
            const reorder = [...matched, ...notMached];
            renderCategories(reorder);
            document.getElementById("txt_searchCategory").value = "";
            alert("Note! all matching values will be displayed at the top, otherwise not found.")
    });
    }

    
    const btn_addCadtegory = document.getElementById("btn_addCategory");

    if(btn_addCadtegory){
        btn_addCadtegory.addEventListener("click", ()=>{
            const categoryValue = document.getElementById("txt_categoryName").value;
            if(categoryValue != null && categoryValue != ""){
                fetch(`http://localhost:8080/api/category`,{
                    method: "POST",
                    headers:{
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        categoryName: categoryValue
                    })
                }).then(response => response.json())
                .then(data =>{
                    document.getElementById("txt_categoryName").value = "";
                    alert("Category is successfully added.");
                    loadCategoryData();
                    console.log(data);
                }).catch(err => console.error("Error: ",err));
            }
            // window.location.href = "addUsers.html";
        });
    }

});

async function loadCategoryData() {
    const tableBody = document.getElementById("tableBody");
    const spinner = document.getElementById("loadingSpinner");
    const table = document.getElementById("categoryTable");

    if (!spinner || !table || !tableBody) {
        console.error("One or more elements not found in DOM.");
        return;
    }

    try {
        spinner.style.display = "flex";
        table.style.display ="none";

        const response = await fetch(`http://localhost:8080/api/category/getAllCategoryData`);
        categories = await response.json();
        renderCategories(categories);
    } catch (error) {
        console.error(error);
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
document.addEventListener("DOMContentLoaded", () => {
    loadCategoryData();
});

async function renderCategories(data) {
    const tableBody = document.querySelector("#categoryTable tbody");

    if(!tableBody){
        console.error("Table not found!");
        return;
    }
    tableBody.innerHTML = "";

    data.forEach(category => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${category.name}</td>
            <td>${category.productAssigned}</td>
            <td>${category.percentage}</td>
            <td>
                <button class="btn_edit" onclick="editCategory(${category.id},'${category.name}')">
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button class="btn_delete" onclick="deleteCategory(${category.id})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}


async function deleteCategory(id) {
    const confirmDelete = confirm("Are you sure you want to delete this category?");

    if (!confirmDelete) return;
    else {
        try {
            await fetch(`http://localhost:8080/api/category/${id}`, {
                method: "DELETE"
            });

            loadCategoryData();
            alert("Cetegory deleted!");

        } catch (error) {
            console.error(error)
        }

    }
}

async function editCategory(id, oldName) {
    window.location.href = "updateCategory.html";
    performEditImplementation(id, oldName);
}
async function performEditImplementation(id, oldName) {
    const categoryUpdateForm = document.getElementById("Category_editForm");
    categoryUpdateForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const categoryName = formData.get("categoryName");

        if (categoryName === oldName) {
            alert("No update made.")
        } else {
            Update(id, categoryName);
        }

    });

}

async function Update(id, Name) {

    const confirmEdit = confirm("Are you sure to edit this category?")

    if (!confirmEdit) return;

    const category = {
        categoryName: Name
    }

    try {
        await fetch(`http://localhost:8080/api/category/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(category)
        });

        loadCategoryData();
        alert("Category name updated!");

    } catch (error) {
        console.error(error);
    }
}
