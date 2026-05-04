function closePopup(id){
        document.getElementById(id).style.display = "none";
    }
    function openPopup(id){
        document.getElementById(id).style.display = "block";
    }

    window.onclick = function(event){
        let popup = document.getElementById("popup");
        if(event.target === popup){
            popup.style.display = "none";
        }
    }
