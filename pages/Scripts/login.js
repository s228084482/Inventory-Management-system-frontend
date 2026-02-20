
document.getElementById("login").addEventListener("submit", (event)=>{
    event.preventDefault();

    const dataform = new dataform(event.target);

    const username = dataform.get("userEmail");
    const password = dataform.get("password");

    login(username,password);
})


async function login(username, password) {
    
}