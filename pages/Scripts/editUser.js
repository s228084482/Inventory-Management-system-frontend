document.addEventListener("DOMContentLoaded", ()=>{
    const params = new URLSearchParams(window.location.search);
    const form = document.getElementById("editForm");
    
    bindElements(params);

    const id = params.get("id");
    if(form){
        form.addEventListener("submit", (event)=>{
            event.preventDefault();
            const formData = new FormData(event.target);

            const fullName = decodeURIComponent(params.get("fullName"));
            const email = decodeURIComponent(params.get("email"));
            const phoneNumber = decodeURIComponent(params.get("phoneNumber"));
            const experience = decodeURIComponent(params.get("experience"));

            if(fullName !== formData.get("fullName") || email !== formData.get("email") || 
            phoneNumber !== formData.get("phoneNumber") || experience !== formData.get("experience")){
                doUpdate(id,formData);
            }else{
                alert("No update made!");
            }

        });
    }

});

function bindElements(params) {
    const fullName = decodeURIComponent(params.get("fullName"));
    const email = decodeURIComponent(params.get("email"));
    const phoneNumber = decodeURIComponent(params.get("phoneNumber"));
    const experience = decodeURIComponent(params.get("experience"));
    console.log(decodeURIComponent(params.get("experience")));

    document.getElementById("fullName").value = fullName;
    document.getElementById("email").value = email;
    document.getElementById("phoneNumber").value = phoneNumber;
    document.getElementById("experience").value = experience;
}

async function doUpdate(id, formData) {

    const spinner = document.getElementById("loadingSpinner");
    const content = document.getElementById("edit-profile-subAdding");

    try {
        spinner.style.display = "flex";
        content.style.display = "none";

        const user = {
            fullName: formData.get("fullName"),
            email: formData.get("email"),
            phoneNumber: formData.get("phoneNumber"),
            experience: formData.get("experience")
        };

        const response = await fetch(`http://localhost:8080/api/users/${id}`,{
            method: "PUT",
            headers:{
                 "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        }
        );
        if(!response.ok){
            const results = await response.json();
             alert(results.message);
            console.log(results);
            return;
        }else{
            alert("User has been successfully updated.");
            window.location.href = "users.html";
        }

    } catch (error) {
        console.error(error);
         spinner.style.display = "none";
        content.style.display = "flex";
    }finally{
         spinner.style.display = "none";
        content.style.display = "flex";
    }
}