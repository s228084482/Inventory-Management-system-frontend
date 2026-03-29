let categories = [];

document.addEventListener("DOMContentLoaded", () => {
    
    const btnSearch = document.getElementById("btn_searchCategory");
    

    if(btnSearch){
        btnSearch.addEventListener("click", () => {

            try {
                showSpinner();

                const searchValue = document.getElementById("txt_searchCategory").value.toLowerCase().trim();
                if (searchValue === "") {
                    alert("Search value is required!");
                    return;
                }
                if (!searchValue) {
                    renderCategories(categories);
                    return;
                }
                const matched = categories.filter(cat => cat.name.toLowerCase().includes(searchValue));
                const notMached = categories.filter(cat => !cat.name.toLowerCase().includes(searchValue));
                const reorder = [...matched, ...notMached];
                renderCategories(reorder);
                document.getElementById("txt_searchCategory").value = "";
                alert("Note! all matching values will be displayed at the top, otherwise not found.")
            } catch (error) {
                hideSpinner();
                alert("Something went wrong!");
                console.error("Error: ", error);
            } finally {
                hideSpinner();
            }
        });

    }

    
    const btn_addCadtegory = document.getElementById("btn_addCategory");

    if(btn_addCadtegory){
        btn_addCadtegory.addEventListener("click", ()=>{
            const categoryValue = document.getElementById("txt_categoryName").value;
            if(categoryValue === ""){
                alert("Category name is required!");
                return;
            }

            if(categoryValue != null && categoryValue != ""){
                showSpinner();

                fetch(`http://localhost:8080/api/category`,{
                    method: "POST",
                    headers:{
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        categoryName: categoryValue
                    })
                }).then(response => response.json())
                .then(exist =>{

                    if(!exist){
                        alert("Category is successfully added.");
                        document.getElementById("txt_categoryName").value = "";
                        loadCategoryData();
                        console.log(exist);
                        return;
                    } else {
                        alert("Category already exist!");
                        document.getElementById("txt_categoryName").value = "";
                        return;
                    }
                }).catch(err =>{
                    hideSpinner();
                    console.error("Error: ",err)
                    alert("Something went wrong.");
                } ).finally(()=>{
                    hideSpinner();
                });
            }
            hideSpinner();
            // window.location.href = "addUsers.html";
        });
    }

});

async function loadCategoryData() {
    const tableBody = document.getElementById("tableBody");
    const spinner = document.getElementById("loadingSpinner");
    const content = document.getElementById("prd-main-div");

    if (!spinner || !content || !tableBody) {
        console.error("One or more elements not found in DOM.");
        return;
    }

    try {
        spinner.style.display = "flex";
        content.style.display ="none";

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
        content.style.display ="flex";
    }finally{
        spinner.style.display = "none";
        content.style.display ="flex";
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
    const encodedName = encodeURIComponent(oldName);

    window.location.href = `updateCategory.html?id=${id}&name=${encodedName}`;
    
}


document.addEventListener("DOMContentLoaded", async ()=>{
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const name = params.get("name");

    console.log("ID:", id);
    console.log("Name:", name);

    const input = document.getElementById("editCatName");

    if (input && name) {
        input.value = decodeURIComponent(name);
    }

    const categoryUpdateForm = document.getElementById("Category_editForm");
    

    if(categoryUpdateForm){
        categoryUpdateForm.addEventListener("submit", (event) => {
            event.preventDefault();
            try {
                const formData = new FormData(event.target);
                const categoryName = formData.get("categoryName");

                if (categoryName === decodeURIComponent(name)) {
                    alert("No update made.")
                } else {
                    Update(id, categoryName);
                }


            } catch (error) {
                console.error("error");
                alert("Error occured");
            }
    });
    }
});

async function Update(id, Name) {

    const confirmEdit = confirm("Are you sure to edit this category?");

    if (!confirmEdit) return;

    const category = {
        id: id,
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
        window.location.href = "categories.html";

    } catch (error) {
        console.error(error);
    }
}
function showSpinner() {
    document.getElementById("loadingSpinner_page").style.display = "flex";
}
function hideSpinner() {
    document.getElementById("loadingSpinner_page").style.display = "none";
}