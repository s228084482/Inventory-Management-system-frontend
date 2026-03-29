const id = 0;

document.getElementById("DOMContentLoaded", ()=>{
    setupProfile();

    const btn_edit = document.getElementById("btn_editProfile");
    if(btn_edit){
        btn_edit.addEventListener("click", ()=>{
            startNewPage();
        });
    }
});

async function setupProfile() {
    try {
        const response = await fetch("http://localhost:8080/api/users/");
        const results = await response.json();

        if (!results.ok) {
            alert(results.message);
            console.log(results);
            return;
        }

        assign(results);
    } catch (error) {
        console.error(error);
    } finally {

    }
}

function assign(user) {
    document.getElementById("fullName").value = user.fullName;
    document.getElementById("email").value = user.email;
    document.getElementById("Username").value = user.username;
    document.getElementById("PhoneNumber").value = user.phoneUmber;
    document.getElementById("role").value = user.role;
    document.getElementById("experience").value = user.eperience;
    id = user.userId;
}

async function startNewPage(){
    const fullName = document.getElementById("fullName");
    const email = document.getElementById("email");
    const PhoneNumber = document.getElementById("PhoneNumber");
    const experience = document.getElementById("experience");
    
    window.location.href = `EditUser.html?id=${id}&fullName=${encodeURIComponent(fullName)}&email=${encodeURIComponent(email)}&phoneNumber=${encodeURIComponent(PhoneNumber)}&experience=${encodeURIComponent(experience)}`;
}