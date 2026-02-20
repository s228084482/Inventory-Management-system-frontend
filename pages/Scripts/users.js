
document.getElementById("btn_addAction").addEventListener("click", () => {
    // window.location.href = "addUsers.html";
    window.location.href = "login.html";
});


// avoiding a script to run before DOM loads
document.addEventListener("DOMContentLoaded",() =>{

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

                                <button class="btn_edit" onclick="editCategory(${data.userId})">
                                    <i class="fa-solid fa-pen"></i>
                                </button>
                                <button class="btn_delete" onclick="deleteCategory(${data.userId})">
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

                                <button class="btn_edit" onclick="editCategory(${data.userId})">
                                    <i class="fa-solid fa-pen"></i>
                                </button>
                                <button class="btn_delete" onclick="deleteCategory(${data.userId})">
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
});

async function editCategory(id) {
    
}
async function deleteCategory(id) {
    
}