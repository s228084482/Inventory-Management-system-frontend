const Users = [];

// document.addEventListener("DOMContentLoaded", () => {
//     const btn_editProfile = document.getElementById("btn_editProfile");
//     if (btn_editProfile) {
//         btn_editProfile.addEventListener("click", () => {
//             window.location.href = "EditUser.html";
//         });
//     }
// });

// avoiding a script to run before DOM loads
document.addEventListener("DOMContentLoaded", () => {
    loadTable();
   
    // const params = new URLSearchParams(window.location.search);
    // const responseURL = params.get("response");
    // if (responseURL === "done") {
        
    // }

    const btn_addAction = document.getElementById("btn_addAction");
    const btn_search = document.getElementById("btn_searchUser");


    if (btn_addAction) {
        btn_addAction.addEventListener("click", () => {
            window.location.href = "addUsers.html";
        });
    }



    if (btn_search) {
        btn_search.addEventListener("click", () => {
            doSearching();
        });
    }
});

function doSearching() {
    try {
        const searchValue = document.getElementById("txt_searchUser").value.toLowerCase();
        if (!searchValue) {
            console.log("Seach element isn't found.");
            return;
        }
        Users.find(user =>{
            console.log(typeof(user.fullName.toLowerCase().includes(searchValue)));
            if(user.fullName.toLowerCase().includes(searchValue)){
                alert("User found, check it at the top.");
            }else{
                 alert("User not found.");
                 return;
            }
        });

        // const sorted = Users.filter(user => user.fullName.toLowerCase().includes(searchValue));
        // const notSorted = Users.filter(u => !u.fullName.toLowerCase().includes(searchValue));

        // const sortedList = [...sorted, ...notSorted];
        // displayUsers(sortedList);


        document.getElementById("txt_searchUser").value = "";
        // alert("Note! all matching values will be displayed at the top, otherwise not found.");
    } catch (error) {
        console.error(error);
    }
}

async function loadTable() {
     const spinner = document.getElementById("loadingSpinner");
    const content = document.getElementById("user-main_section");

    try {
        spinner.style.display = "flex";
        content.style.display = "none";

        const response = await fetch("http://localhost:8080/api/users/getAllUsers");
         if (!response.ok) {
            alert(results.message);
            console.log(results);
            return;
        }
        const results = await response.json();

        displayUsers(results);

    } catch (error) {
        console.error(error);
        alert("Error while loading data, please check connection.")
        spinner.style.display = "none";
        content.style.display = "flex";
    }finally{
        spinner.style.display = "none";
        content.style.display = "flex";
    }
}

function displayUsers(users) {
    const tablebody = document.querySelector("#UserTable tbody");
    tablebody.innerHTML = "";

    for (let i = 0; i < users.length; i += 2) {

        const user1 = users[i];
        const user2 = users[i + 1]; // next user

        const row = document.createElement("tr");

        row.innerHTML = `
        <td>
            ${user1 ? createUserCard(user1) : ""}
        </td>

        <td>
            ${user2 ? createUserCard(user2) : ""}
        </td>
        `;

        tablebody.appendChild(row);
    }
}
function createUserCard(data){
    return `
    <div class="user-container">
        <div id="user-subBox">

            <div class="sub-box-top">
                <div id="user-imageBox">
                    <i class="fa-solid fa-user"></i>
                </div>

                <div class="user-info">
                    <p class="txt-user">${data.fullName}</p>
                    <p class="txt-user">${data.email}</p>
                    <p class="txt-user">${data.role}</p>
                </div>
            </div>

            <div>
                <p id="user-number">${data.phoneUmber}</p>
                <p id="user-experience">${data.experience}</p>
            </div>

            <div id="viewDetails" class="btn-container">
                <button class="btn_edit" onclick="editUser(${data.userId}, '${data.fullName}', '${data.email}','${data.phoneUmber}', '${data.experience}')">
                    <i class="fa-solid fa-pen">Edit</i>
                </button>

                <button class="btn_delete" onclick="deleteUser(${data.userId})">
                    <i class="fa-solid fa-trash">Delete</i>
                </button>
            </div>

        </div>
    </div>
    `;
}

function editUser(id, fullName, email, number, experience) {
    console.log(experience);
    console.log(encodeURIComponent(experience));
    window.location.href = `EditUser.html?id=${id}&fullName=${encodeURIComponent(fullName)}&email=${encodeURIComponent(email)}&phoneNumber=${encodeURIComponent(number)}&experience=${encodeURIComponent(experience)}`;
}
async function deleteUser(id) {
    

    if (confirm("Are you sure to delete this user?")) {
        try {
            const response = await fetch(`http://localhost:8080/api/users/${id}`, {
                method: "DELETE"
            });
            const results = await response.json();
            if (!results.ok) {
                alert(results.message);
                console.log(results);
                return;
            }

            loadTable();
            alert("User is Successfully deleted!");

        } catch (error) {
            console.error("ERROR IN DELETE METHOD: =",error);
        }
    }
}