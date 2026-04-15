
document.addEventListener("DOMContentLoaded", ()=>{
    loadTotalUsers();
    loadTotalProducts();
    loadActiveUsers();
    loadTotalSuppliers();
});

async function loadTotalUsers() {
    const spinner = document.getElementById("loadingSpinner");
    const main = document.getElementById("dashboard-main-decr");

    const lbl_user = document.getElementById("systemUsersNo");
    lbl_user.innerText = "0";
    try {
        spinner.style.display = "flex";
        main.style.display = "none";

        const response = await fetch("http://localhost:8080/api/users/total");
        const results = await response.text();
        lbl_user.innerText = results;
    } catch (error) {
        console.error("ERROR ON LOADING TOTAL USERS, DASHBOARD: ", error);
        spinner.style.display = "none";
        main.style.display = "flex";
    }finally{
        spinner.style.display = "none";
        main.style.display = "flex";
    }

}

async function loadTotalProducts() {
    const spinner = document.getElementById("loadingSpinner");
    const main = document.getElementById("dashboard-main-decr");


    const lbl_product = document.getElementById("totalProduct");
    lbl_product.innerText = "0";
    try {
        spinner.style.display = "flex";
        main.style.display = "none";

        const response = await fetch("http://localhost:8080/api/products/totalProducts");
        const total = await response.text();
        lbl_product.innerText = total;

    } catch (error) {
        console.error("ERROR ON LOADING TOTAL PRODUCTS, DASHBOARD: ", error);
        spinner.style.display = "none";
        main.style.display = "flex";
    }finally{
        spinner.style.display = "none";
        main.style.display = "flex";
    }
}

async function loadActiveUsers() {
    const spinner = document.getElementById("loadingSpinner");
    const main = document.getElementById("dashboard-main-decr");


    const lbl_active = document.getElementById("userNo");
    lbl_active.innerText = "0";

    try {
        spinner.style.display = "flex";
        main.style.display = "none";

        const response = await fetch("http://localhost:8080/api/users/active");
        const active = await response.text();
        lbl_active.innerText = active;

    } catch (error) {
        console.error("ERROR ON LOADING ACTIVE USERS: DASHBOARD: ", error);
        spinner.style.display = "none";
        main.style.display = "flex";
    }finally{
        spinner.style.display = "none";
        main.style.display = "flex";
    }
}

async function loadTotalSuppliers() {
    const spinner = document.getElementById("loadingSpinner");
    const main = document.getElementById("dashboard-main-decr");

    const totalSupplier = document.getElementById("totalSuppliers");
    console.log(totalSupplier);
    totalSupplier.innerText = "0";

    try {
        spinner.style.display = "flex";
        main.style.display = "none";

        const response = await fetch("http://localhost:8080/api/suppliers/totalSuppliers");
       
        const total = await response.text();
        // if(!total.ok){
        //     totalSupplier.innerText = "0";
        //     return;
        // }
        console.log(total);
        totalSupplier.innerText = total;

    } catch (error) {
        console.error("ERROR ON LOADING TOTAL SUPPLIERS, DASHBOARD: ", error);
        spinner.style.display = "none";
        main.style.display = "flex";
    }finally{
        spinner.style.display = "none";
        main.style.display = "flex";
    }
}