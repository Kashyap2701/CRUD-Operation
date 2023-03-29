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
let index=0;

window.onload = renderProductData();

productImageFile.addEventListener('change',(e)=>{
    console.log(e.target.files[0]);
    let reader = new FileReader();
    reader.addEventListener('load',(e)=>{
        curImageFileURL = e.target.result;
    })
    reader.readAsDataURL(productImageFile.files[0]);
})

productForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    addProductData();
})

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
        return (a.price > b.price) ? 1: -1;
    });
    renderProductData(sortedList);
    
}

function sortPriceDesc(){

    let sortedList = productList.sort((a,b)=>{
        return (b.price > a.price) ? 1: -1;
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

function sortProductByName(){
    let sortedList = productList.sort((a,b)=>{
        return a.name > b.name ? 1 : -1;
       
    })
    
    renderProductData(sortedList);
    // let sortedList = productList;
    // productList.sort((a,b)=>{

    //     let product2 = a.name.toLowerCase();
    //     let product1 = b.name.toLowerCase();

    //     console.log(b.name.toLowerCase());

    //     if(product1 > product2){
    //         return 1;
    //     }

    //     if(product1 < product2){
    //         return -1;
    //     }

    //     return 0;
    //     // return b.price-a.price > 0 ? a.price-b.price : b.price-a.price;
    // })
    // renderProductData();
}

function searchProductData(searchQuery){
    console.log(searchQuery);
    if(!searchQuery){
        return productList;
    }
    else{
        return productList.filter((product)=>{return product.id.toString().includes(searchQuery)})
    }
}

function deleteProductData(delButton){
    const productID = delButton.parentNode.parentNode.firstElementChild.innerText;
    productList = productList.filter(product=>product.id!=productID)
    localStorage.setItem('productList',JSON.stringify(productList));
    renderProductData();
}

function addProductData(){

    let newProduct = {
        id : ++index,
        name : productName.value,
        price : productPrice.value,
        image : curImageFileURL,
        desc : productDescription.value
    }

    productList.push(newProduct);
    localStorage.setItem('productList',JSON.stringify(productList));
    renderProductData();
    productForm.reset();

}

function renderProductData(list=productList){

    // let productList = localStorage.getItem('productList')!=null ? JSON.parse(localStorage.getItem('productList')) : [] ;
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
                <button onclick=editProductData(this) class="btn-edit p-2 me-2"><i class="fa-solid fa-pen-to-square"></i></button>
                <button onclick=deleteProductData(this) class="btn-delete p-2"><i class="fa-solid fa-trash"></i></button>
            </td>
        </tr>`
    })
    productsTable.innerHTML = html;
}
