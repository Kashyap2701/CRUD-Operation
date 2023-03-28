let addProduct = document.getElementById('add-product');
let productForm = document.getElementById('add-product-form');
let productsTable = document.querySelector('table tbody');

window.onload = renderData;

function isDataValid(){
    let productName = document.querySelector('#product-name');
    let productPrice = document.querySelector('#product-price');
    let productDescription = document.querySelector('#product-desc');
    let productImage = document.querySelector('#product-img');

    console.log('click');
    if(productName.value===''){
        productName.style.border = '2px solid #d83d4a';
        setTimeout(()=>{productName.style.border = 'none'},3000)
        return false;
    }
    if(productPrice.value==''){
        productPrice.style.border = '2px solid #d83d4a';
        setTimeout(()=>{productPrice.style.border = 'none'},3000)
        return false;
    }
    if(productImage.value==''){
        productImage.style.border = '2px solid #d83d4a';
        setTimeout(()=>{productImage.style.border = 'none'},3000)
        return false;
    }

}

productForm.addEventListener('submit',(e)=>{

    e.preventDefault();
    isDataValid();
    
    // let productName = document.querySelector('#product-name').value;
    // let productPrice = document.querySelector('#product-price').value;
    // let productDescription = document.querySelector('#product-desc').value;
    // let productImage = document.querySelector('#product-img').value;

    // console.log(productName.target.value);
    

    // let newProduct = {
    //     id : new Date().getTime(),
    //     name : productName,
    //     price : productPrice,
    //     image : productImage,
    //     desc : productDescription
    // }

    // // renderNewProduct(newProduct);
    // // productList.push(newProduct);
    // let productList = JSON.parse(localStorage.getItem(productList));
    // if(productList){
    //     productList.push(newProduct);
    // }
    // else{
    //     let productList = [newProduct];
    //     localStorage.setItem(productList,productList);
    // }
    // localStorage.setItem(productList,newProduct);
    // console.log(productList);
    // productForm.reset();

})


//--------------------- it will render the data from localstorage ------------------------
function renderData(){

    let productList;
    if(localStorage.getItem('productList')){
        productList = JSON.parse(localStorage.getItem('productList'));
    }
    else{
        productList = [];
    }
    
    productList.forEach(product=>{
        productsTable.innerHTML += 
        `<tr>
            <td>${product.id}</td>
            <td>
                <img class="rounded-circle" src="./Images/book-1.png" alt="" width="30px" height="30px">
            </td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>
                <button onclick=editProduct class="btn-edit p-2 me-2"><i class="fa-solid fa-pen-to-square"></i></button>
                <button onclick=deleteProduct class="btn-delete p-2"><i class="fa-solid fa-trash"></i></button>
            </td>
        </tr>`
    })
}





// let uniqueID = new Date().getTime();
// console.log(uniqueID);

