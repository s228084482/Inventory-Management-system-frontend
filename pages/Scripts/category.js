

const categories = [
    {
        id: 1,
        name: "Electronics",
        productsAssigned: 12,
        percentage: "40%"
    },
    {
        id: 2,
        name: "Furniture",
        productsAssigned: 5,
        percentage: "18%"
    },
    {
        id: 3,
        name: "Groceries",
        productsAssigned: 15,
        percentage: "42%"
    },
    {
        id: 1,
        name: "Electronics",
        productsAssigned: 12,
        percentage: "40%"
    },
    {
        id: 2,
        name: "Furniture",
        productsAssigned: 5,
        percentage: "18%"
    },
    {
        id: 3,
        name: "Groceries",
        productsAssigned: 15,
        percentage: "42%"
    },
    {
        id: 1,
        name: "Electronics",
        productsAssigned: 12,
        percentage: "40%"
    },
    {
        id: 2,
        name: "Furniture",
        productsAssigned: 5,
        percentage: "18%"
    },
    {
        id: 3,
        name: "Groceries",
        productsAssigned: 15,
        percentage: "42%"
    },
    {
        id: 1,
        name: "Electronics",
        productsAssigned: 12,
        percentage: "40%"
    },
    {
        id: 2,
        name: "Furniture",
        productsAssigned: 5,
        percentage: "18%"
    },
    {
        id: 3,
        name: "Groceries",
        productsAssigned: 15,
        percentage: "42%"
    },
    {
        id: 1,
        name: "Electronics",
        productsAssigned: 12,
        percentage: "40%"
    },
    {
        id: 2,
        name: "Furniture",
        productsAssigned: 5,
        percentage: "18%"
    },
    {
        id: 3,
        name: "Groceries",
        productsAssigned: 15,
        percentage: "42%"
    }
];

const tableBody = document.querySelector("#categoryTable tbody");

function renderCategories(data) {
    tableBody.innerHTML = "";

    data.forEach(category => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${category.name}</td>
            <td>${category.productsAssigned}</td>
            <td>${category.percentage}</td>
            <td>
                <button class="btn_edit" onclick="editCategory(${category.id})">
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
renderCategories(categories);

function deleteCategory(id) {
    const confirmDelete = confirm("Are you sure you want to delete this category?");

    if (!confirmDelete) return;
    else {
        const index = categories.find(c => c.id === id);
        categories.slice(index, 1);

        renderCategories(categories);
    }
}

function editCategory(id){

    const confirmEdit = confirm("Are you sure to edit this category?")

    if(!confirmEdit)return;

    // const index = categories.findIndex(c => c.id === id);
    // categories.splice(index, 1);

    // renderCategories(categories);
}

const searchValue = document.getElementById("txt_searchCategory").ariaValueMax.toLocaleLowerCase();
const row = document.querySelectorAll("#categoryTable tbody tr");
document.getElementById("btn_searchCategory").addEventListener("click", () =>{
    row.forEach(row =>{
        const categoryName = row.cells[0].textContent.toLowerCase();
        if(categoryName.includes(searchValue)){
            row.style.display = "";
        }else{
            row.style.display = "none";
        }
    });
    searchValue = "";
});