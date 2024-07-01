document.addEventListener("DOMContentLoaded", () => {
const mainContainer = document.getElementById("cards");
const cart = document.getElementById("cart");
const searchInput = document.getElementById("searchInput");

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
       <hr/>
       <div class="actions">
        <div class="container mb-4">
        <div class="row">
          <div class="col-12">
            <a href="#" class="btn btn-warning" type="button">Book detail</a>
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
