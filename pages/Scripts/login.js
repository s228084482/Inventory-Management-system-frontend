
document.addEventListener("DOMContentLoaded", ()=>{
    const formLogin = document.getElementById("login");
    if (formLogin) {

        formLogin.addEventListener("submit", (event) => {
            event.preventDefault();

            const dataform = new dataform(event.target);

            const username = dataform.get("userEmail");
            const password = dataform.get("password");
            console.log(username, password);

            login(username, password);
        });
    }

});

async function login(username, password) {
    const user = {
        username: username,
        password: password
    };

    try {
        fetch("http://localhost:8080/api//api/auth//login",{
            method: "POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.stringify(user)
        }).then(res => res.text())
        .then(token =>{
            localStorage.setItem("token", token);
            console.log(token);
            window.location.href = "dashboard.html";
        })
        
    } catch (error) {
        console.error(error);
    }finally{

    }



}