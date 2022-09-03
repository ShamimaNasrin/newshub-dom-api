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
        <a class="category-a" href="#">${name.category_name}</a>`

        categoryUl.appendChild(categoryLi);

    });
}


loadCatagory();