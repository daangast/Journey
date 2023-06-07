const data = [
    {
        id: 1,
        name: 'Banaantje',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Banana-Single.jpg/800px-Banana-Single.jpg',
        price: 74,
        cat: 'Fruitje',
    },
    {
        id: 2,
        name: "Mango'tje",
        img: 'https://static.ah.nl/dam/product/AHI_434d5034303237373031?revLabel=2&rendition=800x800_JPG_Q90&fileType=binary',
        price: 33,
        cat: 'Fruitje',
    },
    {
        id: 3,
        name: 'Tomaatje',
        img: 'https://economictimes.indiatimes.com/thumb/height-450,width-600,imgsize-56196,msid-95423731/tomatoes-canva.jpg?from=mdr',
        price: 49,
        cat: 'Groente',
    },
    {
        id: 4,
        name: 'Brocco',
        img: 'https://imagestoreretrieval.aspos.nl/Product/Front/201016/734e4bff-94c5-462c-8236-a13c9a86ae45.jpg',
        price: 54,
        cat: 'Groente',
    }
];

const productsContainer = document.querySelector('.products');
const searchInput = document.querySelector('.search');
const categoriesContainer = document.querySelector('.cats');
const priceRange = document.querySelector('.priceRange');
const priceValue = document.querySelector('.priceValue');

const displayProducts = (filteredProducts) => {
    productsContainer.innerHTML = filteredProducts.map(product =>
        `
        <div class="product">
            <img src=${product.img}>
            <span class="name">${product.name}</span>
            <span class="priceText">$${product.price}</span>
        </div>
        `
        ).join('');
};

displayProducts(data);

searchInput.addEventListener('keyup', (e) => {
    const value = e.target.value.toLowerCase();

    if (value) {
        displayProducts(data.filter(item => item.name.toLowerCase().indexOf(value) !== -1));
    } else {
        displayProducts(data);
    }
});

const setCategories = () => {
    const allCategories = data.map(item => item.cat);
    const categories = [
        'All',
        ...allCategories.filter((item, i) => {
        return allCategories.indexOf(item) === i;
    }),
    ];

    categoriesContainer.innerHTML = categories.map(cat =>
        `
        <span class="cat">${cat}</span>
        `
        ).join('');

        categoriesContainer.addEventListener('click', (e) => {
            const selectedCategory = e.target.textContent;

            selectedCategory === 'All' 
                ? displayProducts(data) 
                : displayProducts(data.filter((item) => item.cat === selectedCategory));
    });
};

const setPrices = () => {
    const priceList = data.map(item => item.price);
    const priceMax = Math.max(...priceList);
    const priceMin = Math.min(...priceList);

    priceRange.max = priceMax;
    priceRange.min = priceMin;
    priceRange.value = priceMax;
    priceValue.textContent = '$' + priceMax;

    priceRange.addEventListener('input', (e) => {
        priceValue.textContent = '$' + e.target.value;
        displayProducts(data.filter(item => item.price <= e.target.value));
    });
}

setCategories();
setPrices();