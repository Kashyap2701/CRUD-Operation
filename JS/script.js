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

window.onload = renderProductData();

// EVENT IMAGE FILE CHANGE 
productImageFile.addEventListener('change',(e)=>{
    console.log(e.target.files[0]);
    let reader = new FileReader();
    reader.addEventListener('load',(e)=>{
        curImageFileURL = e.target.result;
        console.log(curImageFileURL);
    })
    reader.readAsDataURL(productImageFile.files[0]);
    
})

// EVENT ADD DATA FORM SUBMIT 
productForm.addEventListener('submit',(e)=>{

    e.preventDefault();
    let newProduct = {
        id : Date.now().toString().slice(7),
        name : productName.value.trim(),
        price : productPrice.value,
        image : curImageFileURL || `./Images/No-Image.png`,
        desc : productDescription.value.trim()
    }
    addProductData(newProduct);

})

// EVENT SEARCH DATA 
searchBox.addEventListener('input',(e)=>{
    let searchedList = searchProductData(e.target.value);
    renderProductData(searchedList);
})

// SORT PRODUCT DATA 
function sortProducts(property, order = 'asc') {
    const sortedList = productList.sort((a, b) => {

        if (order === 'asc') {

            if(property=='name')
                return a[property].toLowerCase() > b[property].toLowerCase() ? 1 : -1;
            else if(property=='price')
                return parseFloat(a[property]) > parseFloat(b[property]) ? 1 : -1;
            else 
                return a[property] > b[property] ? 1 : -1;

        } else {

            if(property == 'name')
                return b[property].toLowerCase() > a[property].toLowerCase() ? 1 : -1;
            else if(property=='price')
                return parseFloat(b[property]) > parseFloat(a[property]) ? 1 : -1;
            else 
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
function addProductData(newProduct){

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
            <td class="text-center">
                <button onclick=editProductData(this) class="btn-edit p-2 me-2">
                <a href="./view.html?id=${product.id}"><i class="fa-solid fa-pen-to-square"></i></a>
                </button>
                <button onclick=deleteProductData(this) class="btn-delete p-2" ><i class="fa-solid fa-trash"></i></button>
            </td>
        </tr>`
    })
    productsTable.innerHTML = html;
}
