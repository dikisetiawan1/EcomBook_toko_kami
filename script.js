document.addEventListener("DOMContentLoaded", () => {
const mainContainer = document.getElementById("cards");
const cart = document.querySelector("#cart");
const searchInput = document.getElementById("searchInput");



// membuat fungsi consume API
fetch("books.json").then(response =>{
    return response.json();
  }).then(dataJson => {
    productItem = dataJson.booksJson;
  })
  .catch(error =>{
    console.log(error);
  })



const product = [
      {
          "title":"The Birth of Tragedy",
          "price":"75000",
          "penulis":"Nietzsche",
          "penerbit":"IRCiSoD",
          "isbn":"978-623-8108-65-7",
          "halaman":"252",
          "img":"./assets/img/The-Birth-of-Tragedy.jpeg",
          "description":"Friedrich Nietzsche (1844–1900) dalam buku ini membeberkan asal-usul tragedi Yunani..",
          "kategori" :"non-fiksi"
      },
      {
          "title":"Nietzsche dan Islam",
          "price":"75000",
          "penulis":"Roy Jackson",
          "penerbit":"IRCiSoD",
          "isbn":"-",
          "halaman":"412",
          "img":"./assets/img/Nietzsche-Islam.jpeg",
          "description":"Friedrich Nietzsche adalah filsuf masyhur yang kerap diidentikkan dengan ateisme.. ",
          "kategori" :"non-fiksi"
      },
      {
          "title":"Genealogi Moral",
          "price":"75000",
          "penulis":"Basabasi",
          "penerbit":"-",
          "isbn":"-",
          "halaman":"220",
          "img":"./assets/img/geneologi-moral.jpeg",
          "description":"Pemikiranku tentang genealogi moral mempunyai bentuk singkat dan.. ",
          "kategori" :"non-fiksi"
      },
      {
          "title":"Janji Yang Teringkar",
          "price":"76000",
          "penulis":"Ken Budha Kusumandaru",
          "penerbit":"Instrans Publishing",
          "isbn":"-",
          "halaman":"148",
          "img":"./assets/img/janji-yang-teringkar.jpg",
          "description":"Masyarakat sipil dan organisasi non-pemerintah (NGO) adalah.. ",
          "kategori" :"non-fiksi"
      },
      {
          "title":"Konsep Judicial Review",
          "price":"80000",
          "penulis":"Ali Marwan HSB",
          "penerbit":"-",
          "isbn":"978-602-6344-19-9",
          "halaman":"200",
          "img":"./assets/img/konsep-judicial-review.jpg",
          "description":"Sebuah produk peraturan perundang-undangan seharusnya...",
          "kategori" :"non-fiksi"
      },
      {
          "title":"Etnobotani Mangrove",
          "price":"62000",
          "penulis":"Miri Pariyas Tutik Fitriya",
          "penerbit":"-",
          "isbn":"-",
          "halaman":"114",
          "img":"./assets/img/etnobotani-mangrove.jpg",
          "description":"Manusia memiliki hubungan dekat dengan alam, khususnya...",
          "kategori" :"non-fiksi"
      },
  ]



// function dataApi(getApi){
  const categories =  [...new Set(product.map((item)=>{
    return item
  }))]

// membuat fitur searching
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
  
  // membuat display card
  function displayItem(items){
  mainContainer.innerHTML = items.map((item)=>{
    return `
    <div class="col-lg-4" data-aos="zoom-in" data-aos-duration="1000"
       data-aos-delay="300"> 
      <div class="card shadow card-featured">
        <figure class="img-wrapper ">
          <img src=${item.img} alt="" class="img-cover ">
        </figure> 
       <div class="card-body">
        <h5 class="card-title">
            ${item.title}
        </h5>
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

displayItem(categories);

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
});
