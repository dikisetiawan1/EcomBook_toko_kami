document.addEventListener("DOMContentLoaded", () => {
const mainContainer = document.getElementById("cards");
const cart = document.getElementById("cart");
const searchInput = document.getElementById("searchInput");
const category1 = document.getElementById("category1");
const category2 = document.getElementById("category2");
const allCategory = document.getElementById("allCategory");


fetch("books.json").then(response =>{
    return response.json();
  }).then(dataJson => {
    productItem = dataJson.booksJson;
    loadData(productItem);
  })
  .catch(error =>{
    console.log(error);
  })


const loadData = (products) => {
  const categories =  [...new Set(products.map((item)=>{
    return item
  }))]

//all category
allCategory.addEventListener('input', (e)=>{
  const searchCategory =e.target.value;
    if(searchCategory == "all"){
      displayItem(categories);
    }

})

// category1
  category1.addEventListener('input', (e)=>{
    const searchCategory =e.target.value;
    const dataSelect = categories.filter((data =>{
    if(data.category == searchCategory){
      const filterCategory= data.category;
      return filterCategory;
    }
    
  }))
  displayItem(dataSelect);
  
})
displayItem(categories);

// category2
category2.addEventListener('input', (e)=>{
  const searchCategory =e.target.value;
  const dataSelect = categories.filter((data =>{
  if(data.category == searchCategory){
    const filterCategory= data.category;
    return filterCategory;

  }
  
}))
// console.log(dataSelect)
displayItem(dataSelect);

})
displayItem(categories);
  

searchInput.addEventListener('keyup',(e) =>{
  const searchData = e.target.value.toLowerCase();
  const filterData = categories.filter((item)=>{
    return(
      item.title.toLowerCase().includes(searchData)
    )
  })
      if(filterData == 0){
        swal("Oops!", "Books not found, try again others keyword!", "error");
      }else{
        displayItem(filterData)
      }
})
displayItem(categories);
}
  
  function displayItem(items){
  mainContainer.innerHTML = items.map((item)=>{
    return `
    <div class="col-lg-4 mt-5" data-aos="zoom-in" data-aos-duration="1000"
       data-aos-delay="300"> 
      <div class="card shadow card-featured" >
        <figure class="img-wrapper ">
          <img src=${item.img} alt="" class="img-cover ">
        </figure> 
       <div class="card-body">
        <div class="card-title">
            ${item.title}
        </div>
        <div class="card-text">
          ${item.description}
        </div>
      </div>
      <span >${rupiah(item.price)},-</span>
      <span hidden>${item.category}</span>
       <hr/>
       <div class="actions">
        <div class="container mb-4">
        <div class="row">
          <div class="col-12">
            <a href="#" class="btn btn-warning mr-2" type="button">Book detail</a>
            <a href="#" class="btn btn-outline-warning" type="button" data-toggle="tooltip" data-placement="right" title="Add to cart">
              <img  src="./assets/img/icons/cart-shopping-solid-black.svg" style="width: 20px;" alt="icons">
              </a>
          </div>
        </div>     
      </div>  
       </div>
      </div>
    </div>
    `
}).join(" ");
};

document.addEventListener("click", cartShow);
function cartShow() {
  return `
  <div class="dropdown">
  <button class="btn btn-info " type="button" data-toggle="dropdown" aria-expanded="false">
   <img  src="./assets/img/icons/cart-shopping-solid.svg" style="width: 20px;" alt="icons" >
  </button>
  <div class="dropdown-menu">
    <a class="dropdown-item" href="#">Action</a>
  </div>
</div>`
}
cart.innerHTML = cartShow();


function rupiah(value) {
  let rupiahFormat = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
}).format(value);
return rupiahFormat;
}
});
