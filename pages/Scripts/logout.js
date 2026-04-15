
function logout(){
    localStorage.removeItem("token");
    window.location.href = "login.html";
}

function checkAuth(){
    // let token = localStorage.getItem("token");
    // if(!token){
    //     alert("Please login first");
    //     window.location.href = "login.html"

    //     return false
    // }
    return true;
}