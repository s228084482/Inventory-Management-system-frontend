
document.addEventListener("DOMContentLoaded", ()=>{
    RegisterUser();
});

async function RegisterUser() {

    document.getElementById("register_user").addEventListener("submit", (event)=>{
        event.preventDefault();
        const data = new FormData(event.target);
        // , ,,, , , 
        const UserDTO = {
            fullName: data.get("fullName"),
            userEmail: data.get("userEmail"),
            phoneNumber: data.get("phoneNumber"),
            role: data.get("role"),
            experience: data.get("experience"),
            username: data.get("username"),
            password: data.get("password")
        };
        insertUser(UserDTO);

    });
}

async function insertUser(UserDTO) {
    const spinner = document.getElementById("loadingSpinner");
    const main = document.getElementById("user-subAdding");
    try {
        spinner.style.display = "flex";
        main.style.display = "none";

        const response = await fetch("http://localhost:8080/api/users/saveUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(UserDTO)
        }
        );

        const results = await response.json();
        if (!results.ok) {
            alert(results.message);
            console.log(results);
            return;
        }
        alert("Thank you, you've successfully registered.");

        const done = "done";
        window.location.href = `users.html?response=${done}`;
    } catch (error) {
        alert("Something went wrong please try again later.");
        
        console.error("ERROR: ", error);
        spinner.style.display = "none";
        main.style.display = "flex";
    }finally{
        spinner.style.display = "none";
        main.style.display = "flex";
    }
    
}