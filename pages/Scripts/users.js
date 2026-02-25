
async function loadTable() {

    fetch("")
    .then(response => response.json())
    .then(user => {
        const tablebody = document.querySelector("#UserTable tbody");
        tablebody.innerHTML = "";

        user.forEach(data => {
            const row = document.createElement("tr");

            row.innerHTML = `
            <td> 
            <div class="user-container">
                        <div id="user-subBox">

                            <div class="sub-box-top">
                                <div id="user-imageBox">

                                </div>
                                <div class="user-info">
                                    <p id="txt-user">${data.fullName}</p>
                                    <p id="txt-user">${data.email}</p>
                                    <p id="txt-user">${data.role}</p>
                                </div>
                            </div>

                            <div>
                                <p id="user-number">${data.phoneNumber}</p>
                                <p id="user-experience">${data.eperience}</p>
                            </div>

                            <div id="viewDetails" class="btn-container">

                                <button class="btn_edit" onclick="editUser(${data.userId})">
                                    <i class="fa-solid fa-pen"></i>
                                </button>
                                <button class="btn_delete" onclick="deleteUser(${data.userId})">
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                            </div>

                        </div>
                    </div>

            </td>

            <td> 
             <div class="user-container">
                        <div id="user-subBox">

                            <div class="sub-box-top">
                                <div id="user-imageBox">

                                </div>
                                <div class="user-info">
                                    <p class="txt-user">${data.fullName}</p>
                                    <p class="txt-user">${data.email}</p>
                                    <p class="txt-user">${data.role}</p>
                                </div>
                            </div>

                            <div>
                                <p id="user-number">${data.phoneNumber}</p>
                                <p id="user-experience">${data.experience}</p>
                            </div>

                            <div id="viewDetails" class="btn-container">

                                <button class="btn_edit" onclick="editUser(${data.userId})">
                                    <i class="fa-solid fa-pen"></i>
                                </button>
                                <button class="btn_delete" onclick="deleteUser(${data.userId})">
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                            </div>

                        </div>
                    </div>
            </td>
            `;
            tablebody.appendChild(row);
        });

    }).catch(err => console.error(err));
}
loadTable();

// avoiding a script to run before DOM loads
document.addEventListener("DOMContentLoaded",() =>{

    const btn_addAction = document.getElementById("btn_addAction");
    const btn_editProfile = document.getElementById("btn_editProfile");
    const btn_search = document.getElementById("btn_searchUser");
    const searchValue = document.getElementById("txt_searchUser").value.toLowerCase();
    const row = document.querySelectorAll("#UserTable tbody tr");

    if(btn_addAction){
        btn_addAction.addEventListener("click", ()=>{
            window.location.href = "addUsers.html";
        });
    }

    if(btn_editProfile){
        btn_editProfile.addEventListener("click", ()=>{
            window.location.href = "EditUser.html";
        });
    }

    if(btn_search){
        btn_search.addEventListener("click", ()=>{
            const user = row.cells[0].textContent.toLowerCase();
            if(user.includes(searchValue)){
                row.style.display = "";
            }else{
                alert("No user found.");
            }

            document.getElementById("txt_searchUser").innerHTML = "";
        });
    }
});

async function editUser(id) {
    window.location.href = "EditUser.html"
    performEdit(id);
}
async function deleteUser(id) {
    const confirm = confirm("Are you sure to delete this user?");

    if(confirm){
        try {
            await fetch(`http://localhost:8080//api/user/${id}`, {
                method: "DELETE"
            });

            loadTable();
            alert("User is deleted!");

        } catch (error) {
            console.error(error);
        }

    }
}

async function performEdit(id){

    document.getElementById("editForm").addEventListener("submit", (event)=>{
        event.preventDefault();

        const formData = new FormData(event.target);

        Update(id,formData);
    });

}
async function Update(id,formData) {

     const user = {
        name: formData.get("fullName"),
        email: formData.get("email"),
        phoneNumber: formData.get("phoneNumber"),
        experience: formData.get("experience")
    }
    try {
        await fetch(`http://localhost:8080//api/user/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

        loadTable()
        alert("User is Updated!")
    } catch (error) {
        console.error(error);
    }
}