const mainContainer = document.querySelector("#cards");
const cart =document.querySelector("#cart");


// membuat fungsi search buku
function searchBook(val){
  return val;

}

// membuat modal cart
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

// membuat fungsi format rupiah
function rupiah(value) {
  let rupiahFormat = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
}).format(value);
return rupiahFormat;
}

// membuat fungsi consume API
function getApi(){
  const res = fetch("books.json").then(res =>{
    return res.json();
  }).then(data => {
    const getData = data.booksJson.map((data)=>{
        return `
        <div class="col-lg-4" data-aos="zoom-in" data-aos-duration="1000"
           data-aos-delay="300"> 
          <div class="card shadow card-featured">
            <figure class="img-wrapper ">
              <img src=${data.img} alt="" class="img-cover ">
            </figure> 
           <div class="card-body">
            <h5 class="card-title">
                ${data.name}
            </h5>
            <div class="card-text">
              ${data.description}
            </div>
          </div>
          <span >${rupiah(data.price)},-</span>
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
    mainContainer.innerHTML=getData;

  }).catch(error =>{
      console.log(error);
  })
} 
getApi();