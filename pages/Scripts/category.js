

document.addEventListener("DOMContentLoaded", () => {

    const searchValue = document.getElementById("txt_searchCategory").value.toLowerCase();
    const row = document.querySelectorAll("#categoryTable tbody tr");
    const btnSearch = document.getElementById("btn_searchCategory");

    if(btnSearch){
        btnSearch.addEventListener("click", () => {
        row.forEach(row => {
            const categoryName = row.cells[0].textContent.toLowerCase();
            if (categoryName.includes(searchValue)) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        });
        document.getElementById("txt_searchCategory").innerHTML = "";
    });
    }

});

const tableBody = document.querySelector("#categoryTable tbody");
const categories = null;

async function loadCategoryData() {
    try {
        const response = await fetch(`http://localhost:8080/api/category/getAllCategoryData`);
        categories = await response.json();
        renderCategories(categories);
    } catch (error) {
        console.error(error);
    }
}
loadCategoryData();

function renderCategories(data) {
    tableBody.innerHTML = "";

    data.forEach(category => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${category.name}</td>
            <td>${category.productAssigned}</td>
            <td>${category.percentage}</td>
            <td>
                <button class="btn_edit" onclick="editCategory(${category.id},${category.name})">
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
            await fetch(`http://localhost:8080//api/category/${id}`, {
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

    document.addEventListener("DOMContentLoaded", () => {
        const categoryUpdateForm = document.getElementById("Category_editForm");

        if (categoryUpdateForm) {
            categoryUpdateForm.addEventListener("submit", (event) => {
                event.preventDefault();
                const formData = new FormData(event.target);
                const categoryName = formData.get("categoryName");

                if(categoryName === oldName){
                    alert("No update made.")
                }else{
                    Update(id, categoryName);
                }

            });
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
        await fetch(`http://localhost:8080//api/category/${id}`, {
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
