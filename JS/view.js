const productImageFile = document.getElementById('product-img');
const newProductImageFile = document.getElementById('new-product-img');
const productName = document.querySelector('#product-name');
const productPrice = document.querySelector('#product-price');
const productDescription = document.querySelector('#product-desc');
const updateButton = document.getElementById('edit-product-btn');
const uploadImageBox = document.getElementById('upload-image');
const editMode = document.querySelector('#edit-mode');


let productList = JSON.parse(localStorage.getItem('productList')) || [];

let curImageFileURL = '';

let urlparams = new URLSearchParams(window.location.search);
const urlId = urlparams.get('id');

let product = productList.filter(product => product.id === urlId)[0];

window.onload = viewProductData(urlId);

// IMAGE FILE CHANGE EVENT
newProductImageFile.addEventListener('change',(e)=>{
    console.log(e.target.files[0]);
    let reader = new FileReader();
    reader.addEventListener('load',(e)=>{
        curImageFileURL = e.target.result;
        productImageFile.src = curImageFileURL;
    })
    reader.readAsDataURL(newProductImageFile.files[0]);
})


updateButton.addEventListener('click',(e)=>{

    let newData = {
        name : productName.value,
        price : productPrice.value,
        desc : productDescription.value,
        image : curImageFileURL || product.image
    }

    curImageFileURL = '';
    updateProductData(newData);
})

function updateProductData(newProduct){

    const index = productList.findIndex(product=>product.id==urlId);

    console.log(index);
    productList[index].name = newProduct.name;
    productList[index].price = newProduct.price;
    productList[index].image = newProduct.image;
    productList[index].desc = newProduct.desc;

    localStorage.setItem('productList',JSON.stringify(productList));
    location.reload();

}

function viewProductData(){
    
    productName.value = product.name;
    productPrice.value = product.price;
    productDescription.value = product.desc;
    productImageFile.src = product.image || `./Images/default-image.png`;

}

editMode.addEventListener('click', () => {
    const inputElements = document.querySelectorAll('input, textarea');
  
    if (editMode.value === 'off') {
      editMode.value = 'on';
      inputElements.forEach(inputElement => {
        inputElement.removeAttribute('readonly');
      });
    } else {
      editMode.value = 'off';
      inputElements.forEach(inputElement => {
        inputElement.readOnly = true;
      });
      viewProductData();
    }
  
    updateButton.classList.toggle('d-none');
    uploadImageBox.classList.toggle('d-none');
  });
  