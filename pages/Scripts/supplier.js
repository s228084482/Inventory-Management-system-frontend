
document.getElementById("Add-supplier-form").addEventListener("submit", (event) => {
    event.preventDefault();

    confirm("Are you sure, you are about to add a new supplier.")

    const dataForm = new dataForm(event.target);

    fetch("", {
        method: "POST",
        body: dataForm
    }
    ).then(response => response.text)
        .then(result => {
            console.log(result);
            alert("Successfully added");
        }).catch(err => console.error(err))

});

fetch("")
    .then(response => response.json())
    .then(supplier => {
        const tablebody = document.querySelector("#supplierTable tbody");
        tablebody.innerHTML = "";
        supplier.forEach(data => {
            const row = document.createElement("tr");

            row.innerHTML = `
        <td>${data.name}</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        `;
            tablebody.append(row);
        });

    }).catch(err => console.error(err));