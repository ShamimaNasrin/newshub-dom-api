//load category list array
const loadCatagory = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    const res = await fetch(url);
    const parentData = await res.json();
    displayName(parentData.data.news_category);
    //console.log(parentData.data.news_category);
}

//display function of category names
const displayName = names => {
    //console.log(names);
    const categoryUl = document.getElementById('category-menu');
    names.forEach(name => {
        //console.log(name.category_name);

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
        .then(data => displayCateDetails(data.data));

}


const displayCateDetails = allNews => {
    //console.log(allNews);
    const newsNumber = allNews.length;
    const showNewsNumber = document.getElementById('category-number');
    if (newsNumber !== 0) {
        showNewsNumber.innerText = `${newsNumber} items found in this category`
    }
    else {
        showNewsNumber.innerText = `No data found`
    }

    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = '';

    allNews.forEach(news => {
        // console.log('author:',news.author.name);
        // console.log('title:',news.title);
        // console.log('views:',news.total_view);


        const newsDiv = document.createElement('div');
        newsDiv.classList.add('card', 'col-12', 'border-0', 'p-1');
        newsDiv.innerHTML = `
        <div class="row g-0">
            
                              <div class="col-md-4 col-lg-2 col-12 col-sm-12 p-2 d-flex justify-content-center align-items-center">
                                <img src="${news.thumbnail_url}" class="img-fluid rounded" alt="...">
                              </div>
                              <div class="col-md-8 col-lg-10 col-12 col-sm-12">
                                <div class="card-body p-3">
                                  <h4 class="card-title fw-bold">${news.title}</h4>
                                  <p class="card-text text-muted">${news.details}</p>
                                  <div class="d-flex justify-content-between align-items-center flex-sm-wrap">
                                    <div class="d-flex justify-content-evenly align-items-center p-1">
                                        <img src="${news.author.img}" class="img-fluid rounded-circle author-img border" alt="author img">
                                        <p class="px-1 my-0"><small>${news.author.name}</small></p>
                                      </div>
                                      <div class="d-flex justify-content-evenly align-items-center p-1">
                                        <img src="./images/show.png" class="icon-img" alt="view img">
                                        <p class="px-1 my-0"><smal class="fw-bold">${news.total_view}</small></p>
                                      </div>
                                      <div class="d-flex justify-content-evenly align-items-center p-1">
                                      <button onclick="loadNewsDescription('${news._id}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newsDetailModal">more</button>
                                      </div>
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
  if(isLoading){
      loaderSection.classList.remove('d-none')
  }
  else{
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


loadCatagory();
