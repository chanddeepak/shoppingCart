function refreshList() {
    $.get('/vendors', (data) => {
        $('#vendorList').empty();
        console.log(data);
        for (let vendor of data) {
            $('#vendorList').append(
                `<li>
                    ${vendor.name}
                    <span>
                        <button onclick="deleteVendor(${vendor.id})" type="button class="btn btn-danger"><i class="fas fa-times-circle"></i></button>
                    </span>
                </li> <br>`
            )
        }
    })
}

refreshList();


$('#button-addon2').click(() => {
    $.post('/vendors', {
        name: $('#vendorName').val()
    }, (data) => {
        if (data.success) {
            refreshList()
        } else {
            alert(data.err)
        }
    })
})

function deleteProduct() {
    $.ajax({
        type: "DELETE",
        url: "/products",
        success: function (data) {
            if (data.success) {
                //console.log(data.success)
                refreshList();
            } else {
                alert(data.err);
            }
        }
    })
}

function deleteVendor(id) {
    $.ajax({
        type: "DELETE",
        url: "/vendors",
        data: {
            id: id
        },
        success: function (data) {
            if (data.success) {
                //console.log(data.success)
                deleteProduct();
                //refreshList()
            } else {
                alert('Some error occurred');
            }
        }
    })
}