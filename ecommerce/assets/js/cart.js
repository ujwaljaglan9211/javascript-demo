// wishlist & cartlist empty array initialized 
var wishlist = [];
var payments = [];
// add item to wishlist starts here
function addWishlist(obj) {
  $("#pay-now span").text("");
  document.getElementById("go-to-wishlist").style.display = 'inline-block';
  document.getElementById("wishlist").style.display = 'block';
  document.getElementById("total-amount").style.display = 'block';
  var temp = {};
  var check;
  var product_id = obj.getAttribute("product-id");
  var product_name = obj.getAttribute("product-name");
  var product_price = obj.getAttribute("product-price");
  var product_image = obj.getAttribute("product-image");
  var product_quantity = 1;
  var product_ammount = product_price * product_quantity;
  temp.id = product_id;
  temp.name = product_name;
  temp.image = product_image;
  temp.price = product_price;
  temp.quantity = product_quantity;
  temp.ammount = product_ammount;
  if (wishlist.length === 0) {
    wishlist.push(temp);
  } else {
    for (var index = 0; index < wishlist.length; ++index) {
      if (wishlist[index]['id'] === product_id) {
        wishlist[index]['quantity']++;
        wishlist[index]['ammount'] = wishlist[index]['price'] * wishlist[index]['quantity'];
        check = true;
        break;
      }
    }
    if (!check) {
      wishlist.push(temp);
    }
  }
  appendWishlist(wishlist);
  return false;
}
// append items to wishlist starts here
function appendWishlist(wishlist) {
  var total_ammount = 0;
  var items = wishlist.length;
  var ulShopping = document.getElementsByClassName("shopping-cart-items");
  var lis = document.querySelectorAll('.shopping-cart-items li');
  for (var i = 0; li = lis[i]; i++) {
    li.parentNode.removeChild(li);
  }
  ulShopping.innerHTML = '';
  var total_items = 0;
  for (var i = 0; i < items; i++) {
    total_items = total_items + (wishlist[i].quantity);
  }
  var tbodyRef = document.getElementById('product-listing').getElementsByTagName('tbody')[0];
  tbodyRef.innerHTML = '';
  for (var i = wishlist.length - 1; i >= 0; i--) {
    var row = tbodyRef.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);
    var cell8 = row.insertCell(7);
    cell1.innerHTML = items;
    cell2.innerHTML = wishlist[i]['name'];
    cell3.innerHTML = wishlist[i]['price'];
    cell4.innerHTML = wishlist[i]['quantity'];
    cell5.innerHTML = wishlist[i]['ammount'];
    cell6.innerHTML = "<a href='javascript:void(0);'><i class='fa fa-plus' aria-hidden='true' onclick='addMoreWishlist(this); return false;' p-id='" + wishlist[i]['id'] + "'></i></a>";
    cell7.innerHTML = "<a href='javascript:void(0);'><i class='fa fa-minus' aria-hidden='true' onclick='removeOneWishlist(this); return false;' p-id='" + wishlist[i]['id'] + "'></i></a>";
    cell8.innerHTML = "<a href='javascript:void(0);'><i class='fa fa-trash' aria-hidden='true' onclick='deleteOneWishlist(this); return false;' p-id='" + wishlist[i]['id'] + "'></i></a>";
    items--;
  }
  for (var i = 0; i < wishlist.length; i++) {
    total_ammount = total_ammount + wishlist[i]['ammount'];
    var li = document.createElement("li");
    li.className = 'clearfix';
    var img = document.createElement("img");
    img.src = wishlist[i]['image'];
    img.alt = wishlist[i]['name'];
    var spanName = document.createElement("span");
    spanName.className = 'item-name';
    spanName.innerHTML = wishlist[i]['name'];
    var spanPrice = document.createElement("span");
    spanPrice.className = 'item-price';
    spanPrice.innerHTML = '₹ ' + wishlist[i]['ammount'];
    var spanQuantity = document.createElement("span");
    spanQuantity.className = 'item-quantity';
    spanQuantity.innerHTML = 'Quantity: ' + wishlist[i]['quantity'];
    li.appendChild(img);
    li.appendChild(spanName);
    li.appendChild(spanPrice);
    li.appendChild(spanQuantity);
    $(".shopping-cart-items").append(li);
    // ulShopping.appendChild(li);
  }
  document.getElementsByClassName("shopping-cart-items-listing")[0].childNodes[1].getElementsByClassName("badge").item(0).innerHTML = total_items;
  document.getElementsByClassName("shopping-cart-items-listing-mobile")[0].childNodes[3].innerHTML = total_items;
  console.log(document.getElementById("desktop-total-price"));
  document.getElementById("desktop-total-price").innerHTML = '₹ ' + total_ammount;
  document.getElementById("total-amount").innerHTML = '₹ ' + total_ammount;
  document.getElementById("mobile-total-price").innerHTML = '₹ ' + total_ammount;
}
// addMoreWishlist starts here
function addMoreWishlist(obj) {
  var p_id = obj.getAttribute('p-id');
  for (var index = 0; index < wishlist.length; ++index) {
    if (wishlist[index]['id'] === p_id) {
      wishlist[index]['quantity']++;
      wishlist[index]['ammount'] = wishlist[index]['price'] * wishlist[index]['quantity'];
    }
  }
  appendWishlist(wishlist);
  return false;
}
// removeOneWishlist starts here
function removeOneWishlist(obj) {
  var p_id = obj.getAttribute('p-id');
  for (var index = 0; index < wishlist.length; ++index) {
    if (wishlist[index]['id'] === p_id) {
      if (wishlist[index]['quantity'] > 1) {
        wishlist[index]['quantity']--;
        wishlist[index]['ammount'] = wishlist[index]['price'] * wishlist[index]['quantity'];
      } else {
        wishlist.splice(index, 1);
      }
    }
  }
  appendWishlist(wishlist);
  return false;
}
// deleteOneWishlist starts here
function deleteOneWishlist(obj) {
  var p_id = obj.getAttribute('p-id');
  for (var index = 0; index < wishlist.length; ++index) {
    if (wishlist[index]['id'] === p_id) {
      wishlist.splice(index, 1);
    }
  }
  appendWishlist(wishlist);
  return false;
}