const data = [
    { status: "OutStoock", productName: "CookieChangeEvent", quantity: 54, date: "2026/02/22" },
    { status: "OutStoock", productName: "CookieChangeEvent", quantity: 54, date: "2026/02/22" },
    { status: "OutStoock", productName: "CookieChangeEvent", quantity: 54, date: "2026/02/22" },
    { status: "OutStoock", productName: "CookieChangeEvent", quantity: 54, date: "2026/02/22" }
];
populateTable(data);

// async function getReportData() {
//     try {
//         const response = await fetch("http://localhost:8080/api/");
//         const data = response.json();
//         populateTable(data);
//     } catch (error) {
//         console.error(error);
//     }
// }

document.addEventListener("DOMContentLoaded", ()=>{
    const btn_in = document.getElementById("btn_in");
    const btn_out = document.getElementById("btn_Out");

    if(btn_in){
        btn_in.addEventListener("click", ()=>{
            window.location.href = "stockIN.html";
        });
    }

    if(btn_out){
        btn_out.addEventListener("click", ()=>{
            window.location.href = "stockOUT.html";
        });
    }
});


function populateTable(data) {
    const tablebody = document.querySelector("#stockTable tbody");
    tablebody.innerHTML = "";

    data.forEach(element => {
        const row = document.createElement("tr");

        row.innerHTML = `
        <div class="sock-history">
                        <h1>REPORT</h1>
                        <p>--------------------------------------------------------------------------------------------------</p>

                        <div class="report-content">
                            <div class="info-display-main">
                                <div class="left-display">MOVEMENT STATUS:</div>
                                <div class="right-display" id="status_movement">${element.status}</div>
                            </div>

                            <div class="info-display-main">
                                <div class="left-display">PRODUCT NAME:</div>
                                <div class="right-display" id="product_name">${element.productName}</div>
                            </div>

                            <div class="info-display-main">
                                <div class="left-display">QUANTITY:</div>
                                <div class="right-display" id="quantity">${element.quantity}</div>
                            </div>

                            <div class="info-display-main">
                                <div class="left-display">DATE:</div>
                                <div class="right-display" id="date">${element.date}</div>
                            </div>

                            <p>--------------------------------------------------------------------------------------------------</p>

                            <div class="info-display-main">
                                <div class="left-display">MESSAGE:</div>
                                <div class="right-display" id="message"></div>
                            </div>

                        </div>
                    </div>

        `;

        tablebody.appendChild(row);
    });
}