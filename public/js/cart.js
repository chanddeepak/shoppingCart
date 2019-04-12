function removeFromCart(id, userId) {
  $.ajax({
    type: "DELETE",
    url: "/cart",
    data: {
      id: id
    },
    success: function (data) {
      if (data.success) {
        cartItems(userId);
      } else {
        alert('Some error occurred');
      }
    }
  })
}

function getVendor(id, done) {
  $.get(`/vendors/${id}`, (data) => {
    //console.log(id);
    done(data[0].name);
  })
}

function refreshList(productId, quantity, id, userId) {
  //console.log(productId);
  $.get(`/products/${productId}`, (product) => {
    console.log(product[0].vendorId);
    let price = product[0].price * quantity;
    getVendor(product[0].vendorId, (data) => {
      $('#productList').append(
        `
            <div class="col-md-3">
                <div class="card" style="width: 15rem;" >
                    <div class="card-body">
                        <h5>Name: ${product[0].name}</h5>
                        <h5>Total Price: ${price}</h5>
                        <h5>Quantity: <input id="${product.id}" type="number" value="${quantity}" min="1" max="${product[0].quantity}"></h5>
                        <h5>Vendor: ${data}</h5>
                        <button class="btn btn-danger" onclick="removeFromCart(${id}, ${userId})">Remove From Cart </button>
                    </div>
            </div>
            <br>`
      )

    })

  })
}

function fetchCartItems(products, userId) {
  $('#productList').empty();
  for (let product of products) {
    //console.log(product)
    refreshList(product.productId, product.quantity, product.id, userId);
  }
}

function cartItems(userId) {
  $.get(`/cart/${userId}`, (products) => {
    fetchCartItems(products, userId);
  })
}


$('#login').click(() => {
  let username = $('#username').val();
  let email = $('#email').val();
  if (username == "" || email == "") {
    alert("Fields cannot be empty");
  } else {
    $.post('/users', {
      username,
      email
    }, (data) => {
      if (data.success) {
        $('#welcomeText').empty();
        $('#listText').empty();
        $('#welcomeText').append(`Welcome ${username}`)
        $('#listText').append("List of Products in Cart");
        cartItems(data.id)
      } else {
        alert('Some error occurred')
      }
    })
  }
})