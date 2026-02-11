

const tableBody = document.querySelector("#categoryTable tbody");
const categories = null;

async function loadCategoryData(){
    try{
        const response = await fetch('http://localhost:8080//api/category/getAllCategoryData');
        categories = await response.json();
        renderCategories(categories);
    }catch(error){
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


async function deleteCategory(id) {
    const confirmDelete = confirm("Are you sure you want to delete this category?");

    if (!confirmDelete) return;
    else {
        await fetch('http://localhost:8080//api/category/${id}',{
            method: "DELETE"
        });

        const index = categories.find(c => c.id === id);
        categories.slice(index, 1);

        renderCategories(categories);
        alert("Cetegory deleted!");
    }
}

async function editCategory(id){

    const confirmEdit = confirm("Are you sure to edit this category?")

    if(!confirmEdit)return;

    // not done here i need to put in elementById==================================
    const category = {
        categoryName: document.getElementById("").value
    }

    await fetch('http://localhost:8080//api/category/${id}', {
        method: "PUT",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(category)
    });

    const index = categories.findIndex(c => c.id === id);
    categories.splice(index, 1);

    renderCategories(categories);
    alert("Product updated!");
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