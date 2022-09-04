//load category list array
const loadCatagory = async () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  try {
    const res = await fetch(url);
    const parentData = await res.json();
    displayName(parentData.data.news_category);
  }
  catch (error) {
    console.log(error);
  }
}

//display function of category names
const displayName = names => {

  const categoryUl = document.getElementById('category-menu');
  names.forEach(name => {

    const categoryLi = document.createElement('li');
    categoryLi.classList.add('category-li');
    categoryLi.innerHTML = `
        <a onclick="loadCateDetails('${name.category_id}')" class="category-a" href="#">${name.category_name}</a>`

    categoryUl.appendChild(categoryLi);

  });
}

const loadCateDetails = (categoryId) => {
  toggleSpinner(true);
  //console.log('get details of id', categoryId);
  const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
  //console.log(url);
  fetch(url)
    .then(res => res.json())
    .then(data => displayCateDetails(data.data))
    .catch(error => console.log(error))
}


const displayCateDetails = allNews => {
  //console.log(allNews);
  allNews.sort((a, b) => b.total_view - a.total_view);

  const newsNumber = allNews.length;
  const showNewsNumber = document.getElementById('category-number');
  const hiddenSection = document.getElementById('hidden-section');
  if (newsNumber !== 0) {
    showNewsNumber.innerText = `${newsNumber} items found in this category`;
    hiddenSection.classList.remove('d-none');
  }
  else {
    showNewsNumber.innerText = `No data found`;
    hiddenSection.classList.add('d-none');
  }

  const newsContainer = document.getElementById('news-container');
  newsContainer.textContent = '';

  allNews.forEach(news => {
    const newsDiv = document.createElement('div');
    newsDiv.classList.add('card', 'col-12', 'border-0', 'p-1');
    newsDiv.innerHTML = `
        <div class="row g-0">
            
                              <div class="col-md-4 col-lg-2 col-12 col-sm-12 p-2 d-flex justify-content-center align-items-center">
                                <img src="${news.thumbnail_url}" class="img-fluid rounded" alt="...">
                              </div>
                              <div class="col-md-8 col-lg-10 col-12 col-sm-12 p-3 d-flex flex-column justify-content-between">
                                
                                  <div class="">
                                    <h4 class="card-title fw-bold">${news.title}</h4>
                                    <p class="card-text text-muted">${news.details.slice(0, 550)}</p>
                                  </div>

                                  <div class="d-flex justify-content-between align-items-center flex-wrap">
                                    <div class="d-flex justify-content-start align-items-center p-1 fixed-width">
                                        <img src="${news.author.img ? news.author.img : 'No author image found'}" class="img-fluid rounded-circle author-img" alt="author img">
                                        <p class="px-1 ms-1 my-0"><small>${news.author.name ? news.author.name : 'No author'}</small></p>
                                      </div>
                                      <div class="d-flex justify-content-start align-items-center p-1 view-width">
                                        <img src="./images/show.png" class="icon-img" alt="view img">
                                        <p class="px-1 ms-1 my-0"><smal class="fw-bold">${news.total_view ? news.total_view : '0 views'}</small></p>
                                      </div>
                                      <div class="d-flex justify-content-evenly align-items-center p-1">
                                      <button onclick="loadNewsDescription('${news._id}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newsDetailModal">more</button>
                                      </div>
                                  </div>

                                
                              </div>
    
                            </div>
        `;
    newsContainer.appendChild(newsDiv);

  });

  toggleSpinner(false);

}

const toggleSpinner = isLoading => {
  const loaderSection = document.getElementById('loader');
  if (isLoading) {
    loaderSection.classList.remove('d-none')
  }
  else {
    loaderSection.classList.add('d-none');
  }
}

const loadNewsDescription = (newsId) => {

  //console.log('get details of id', newsId);
  const url = `https://openapi.programming-hero.com/api/news/${newsId}`;
  //console.log(url);
  fetch(url)
    .then(res => res.json())
    .then(data => showNewsDescription(data.data[0]))
    .catch(error => console.log(error))
}


const showNewsDescription = newsArr => {
  console.log(newsArr);

  const modalTitle = document.getElementById('newsDetailModalLabel');
  modalTitle.innerText = newsArr.title;
  const newsDetails = document.getElementById('news-details');

  newsDetails.innerHTML = `
      <div class="mx-auto d-flex justify-content-center align-items-center">
        <img src="${newsArr.image_url}" class="img-fluid rounded" alt="...">
      </div>
      <div class="mx-auto my-3">
        <p>Views: ${newsArr.total_view ? newsArr.total_view : 'No Data Found'}</p>
        <p>Rating: ${newsArr.rating.number ? newsArr.rating.number : 'No Data Found'}</p>
        <p>Published date: ${newsArr.author.published_date ? newsArr.author.published_date : 'No Data Found'}</p>
      </div>
  `
}

loadCatagory();
