const addProduct = document.getElementById('add-product');
const productForm = document.getElementById('add-product-form');
const productsTable = document.querySelector('table tbody');
const productImageFile = document.getElementById('product-img');
const searchBox = document.getElementById('search-input');

const productName = document.querySelector('#product-name');
const productPrice = document.querySelector('#product-price');
const productDescription = document.querySelector('#product-desc');

let productList = JSON.parse(localStorage.getItem('productList')) || [];

let curImageFileURL='';
// let index=0;

window.onload = renderProductData();

// IMAGE FILE CHANGE EVENT
productImageFile.addEventListener('change',(e)=>{
    console.log(e.target.files[0]);
    let reader = new FileReader();
    reader.addEventListener('load',(e)=>{
        curImageFileURL = e.target.result;
        console.log(curImageFileURL);
    })
    reader.readAsDataURL(productImageFile.files[0]);
    
})

// ADD DATA FORM SUBMIT EVENT
productForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    addProductData();
})

// SEARCH DATA EVENT
searchBox.addEventListener('input',(e)=>{
    let searchedList = searchProductData(e.target.value);
    renderProductData(searchedList);
})

function sortIdAsc(){

    let sortedList = productList.sort((a,b)=>{
        return (a.id > b.id) ? 1: -1;
    });
    renderProductData(sortedList);
    
}

function sortIdDesc(){

    let sortedList = productList.sort((a,b)=>{
        return (b.id > a.id) ? 1: -1;
    });
    renderProductData(sortedList);
    
}

function sortNameAsc(){

    let sortedList = productList.sort((a,b)=>{
        return (a.name > b.name) ? 1: -1;
    });
    renderProductData(sortedList);
    
}

function sortNameDesc(){

    let sortedList = productList.sort((a,b)=>{
        return (b.name > a.name) ? 1: -1;
    });
    renderProductData(sortedList);
    
}

function sortPriceAsc(){

    let sortedList = productList.sort((a,b)=>{
        return (parseFloat(a.price) > parseFloat(b.price)) ? 1: -1;
    });
    renderProductData(sortedList);
    
}

function sortPriceDesc(){

    let sortedList = productList.sort((a,b)=>{
        return (parseFloat(b.price) > parseFloat(a.price)) ? 1: -1;
    });
    renderProductData(sortedList);
    
}

function sortProductByPrice(){
    
    let sortedList = productList.sort((a,b)=>{
        return a.price > b.price ? 1 : -1;
        // return b.price-a.price > 0 ? a.price-b.price : b.price-a.price;
    })
    
    renderProductData(sortedList);
}

function sortProducts(property, order = 'asc') {
    const sortedList = productList.sort((a, b) => {
      if (order === 'asc') {
        return a[property] > b[property] ? 1 : -1;
      } else {
        return b[property] > a[property] ? 1 : -1;
      }
    });
    renderProductData(sortedList);
}

// SEARCH PRODUCT DATA
function searchProductData(searchQuery){
    console.log(searchQuery);
    if(!searchQuery){
        return productList;
    }
    else{
        return productList.filter((product)=>{return product.id.toString().includes(searchQuery)})
    }
}

// DELETE PRODUCT DATA
function deleteProductData(delButton){
    const productID = delButton.parentNode.parentNode.firstElementChild.innerText;
    productList = productList.filter(product=>product.id!=productID)
    localStorage.setItem('productList',JSON.stringify(productList));
    renderProductData();
}

// ADD PRODUCT DATA
function addProductData(){

    let newProduct = {
        id : Date.now().toString().slice(7),
        name : productName.value,
        price : productPrice.value,
        image : curImageFileURL,
        desc : productDescription.value
    }

    productList.push(newProduct);
    localStorage.setItem('productList',JSON.stringify(productList));
    renderProductData();
    productForm.reset();
    curImageFileURL = '';
}

// RENDER PRODUCT DATA
function renderProductData(list=productList){

    console.log(list);
    let html='';
    list.forEach(product=>{
        html += 
        `<tr>
            <td>${product.id}</td>
            <td>
                <img class="rounded-circle object-fit-cover" src="${product.image}" alt="" width="30px" height="30px">
            </td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>
                <button onclick=editProductData(this) class="btn-edit p-2 me-2">
                <a href="./view.html?id=${product.id}"><i class="fa-solid fa-pen-to-square"></i></a>
                </button>
                <button onclick=deleteProductData(this) class="btn-delete p-2" ><i class="fa-solid fa-trash"></i></button>
            </td>
        </tr>`
    })
    productsTable.innerHTML = html;
}
