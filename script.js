document.addEventListener("DOMContentLoaded", () => {
const mainContainer = document.getElementById("cards");
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

// category2
category2.addEventListener('input', (e)=>{
  const searchCategory =e.target.value;
  const dataSelect = categories.filter((data =>{
  if(data.category == searchCategory){
    const filterCategory= data.category;
    return filterCategory;
  }
}))
displayItem(dataSelect);
})

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
      <span >${rupiah(item.price)}</span>
      <span hidden>${item.category}</span>
       <hr/>
       <div class="actions">
        <div class="container mb-4">
        <div class="row">
          <div class="col-12">
          <a class="btn btn-warning mr-2" type="button" data-toggle="modal" data-target="#modal${item.id}" >Book detail</a>
            <button class="btn btn-outline-warning" type="button" data-toggle="tooltip" data-placement="right" title="Add to cart" >
              <img  src="./assets/img/icons/cart-shopping-solid-black.svg" style="width: 20px;" alt="icons">
              </button>
          </div>
        </div>     
      </div>  
       </div>
      </div>
    </div>

      <!-- Modal -->
      <div class="modal fade" id="modal${item.id}" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">Book Detail</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
            <li class="list-group-item ">
            <table class="table table-borderless">
                <tbody>
                  <tr>
                    <th scope="row">Title</th>
                    <td>:</td>
                    <td>${item.title}</td>
                    <td></td>
                  </tr>
                  <tr>
                    <th scope="row">Writer</th>
                    <td>:</td>
                    <td>${item.penulis}</td>
                    <td></td>
                  </tr>
                  <tr>
                    <th scope="row">Publisher</th>
                    <td>:</td>
                    <td>${item.penerbit}</td>
                    <td></td>
                  </tr>
                  <tr>
                    <th scope="row">Pages</th>
                    <td>:</td>
                    <td>${item.halaman}</td>
                    <td></td>
                  </tr><tr>
                    <th scope="row">Category</th>
                    <td>:</td>
                    <td>${item.category}</td>
                    <td></td>
                  </tr>
                  <tr>
                    <th scope="row">ISBN</th>
                    <td>:</td>
                    <td>${item.isbn}</td>
                    <td></td>
                  </tr>
                  <tr>
                    <th scope="row">Description</th>
                    <td>:</td>
                    <td>${item.description}</td>
                  </tr>
                  <tr>
                    <th scope="row">Price</th>
                    <td>:</td>
                    <td>${rupiah(item.price)}</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="modal-footer">
              <button class="btn btn-outline-warning" type="button" data-toggle="tooltip" data-placement="right" title="Add to cart">
              <img  src="./assets/img/icons/cart-shopping-solid-black.svg" style="width: 20px;" alt="icons">
              </button>
            </div>
          </div>
        </div>
      </div>
    `
}).join(" ");
};

const shoppingCartShow = document.querySelector(".shoppingCartShow");
document.querySelector("#cartButton").onclick = (e) => {
  shoppingCartShow.classList.toggle('active');
  e.preventDefault();
}



function rupiah(value) {
  let rupiahFormat = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  minimumFractionDigits: 0,
}).format(value);
return rupiahFormat;
}
});
