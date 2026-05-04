let categories = [];

document.addEventListener("DOMContentLoaded", () => {
    
    const btnSearch = document.getElementById("btn_searchCategory");
    

    if(btnSearch){
        btnSearch.addEventListener("click", () => {

            try {
                showSpinner();

                const searchValue = document.getElementById("txt_searchCategory").value.toLowerCase().trim();
                if (searchValue === "") {
                    reportOutComes("","Search value is required!","");
                    return;
                }
                if (!searchValue) {
                    renderCategories(categories);
                    return;
                }
                const matched = categories.filter(cat => cat.name.toLowerCase().includes(searchValue));
                const notMached = categories.filter(cat => !cat.name.toLowerCase().includes(searchValue));
                const reorder = [...matched, ...notMached];

                if(Array.isArray(matched) && matched.length === 0){
                    reportOutComes("","No matching values.","");
                    document.getElementById("txt_searchCategory").value = "";
                    return;
                }

                renderCategories(reorder);
                document.getElementById("txt_searchCategory").value = "";
                reportOutComes("", "Find matching values at the top.","Information");
            } catch (error) {
                hideSpinner();
                // alert("Something went wrong!");
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
                reportOutComes("", "Category name is required!","");
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
                        reportOutComes("","Category already exist!","Information");
                        document.getElementById("txt_categoryName").value = "";
                        return;
                    }
                }).catch(err =>{
                    hideSpinner();
                    console.error("Error: ",err);
                    // alert("Something went wrong.");
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
        renderCategories(categories.sort((a,b) => a.name.localeCompare(b.name)));
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
            reportOutComes("","Cetegory has been successfully deleted!","Information")

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
                    reportOutComes("", "No update made.", "");
                } else {
                    Update(id, categoryName);
                }


            } catch (error) {
                console.error("error");
                // alert("Error occured");
            }
    });
    }
});

async function Update(id, Name) {

    const confirmEdit = confirm("Are you sure to edit this category?");

    if (confirmEdit) {
        const category = {
            id: id,
            categoryName: Name
        }

        try {
            const response = await fetch(`http://localhost:8080/api/category/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(category)
            });

            console.log("Started to check response.");
            if (!response.ok) {
                console.log("Response is not ok.");
                reportOutComes("", "Something went wrong while updating category", "Information");
                return;
            } else {
                reportOutComes("", "Category has been successfully updated!", "Information");
                
                setTimeout(() => {
                    window.location.href = "categories.html";
                }, 3000);
            }

        } catch (error) {
            console.error(error);
        }
    }

    
}
function showSpinner() {
    document.getElementById("loadingSpinner_page").style.display = "flex";
}
function hideSpinner() {
    document.getElementById("loadingSpinner_page").style.display = "none";
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