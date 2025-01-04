
const drinkList = document.getElementById('drinkList');
const groupList = document.getElementById('groupList');
const drinkCount = document.getElementById('drinkCount');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const modalContent = document.getElementById('modalContent');
const cartCountElement = document.getElementById('count');  
let convertCount = parseInt(cartCountElement.innerText);  

let group = [];  

const allDrinks = (drinks) => 
    {
    drinkList.innerHTML = '';
    if (drinks.length === 0)
         {
        drinkList.innerHTML = '<p class="text-danger">No drinks found</p>';
        return;
    }

    drinks.forEach(drink =>
         {
        const card = document.createElement('div');
        card.className = 'col-md-6';
        card.innerHTML = `
            <div class="card h-100">
                <img src="${drink.strDrinkThumb}" class="card-img-top" alt="${drink.strDrink}">
                <div class="card-body">
                    <h5 class="card-title">${drink.strDrink}</h5>
                    <h5 class="card-title">${drink.price}</h5>
                    <p class="card-text">Category: ${drink.strCategory}</p>
                    <button class="btn btn-dark me-2 addToGroup">Add to cart</button>
                    <button class="btn btn-secondary details" data-bs-toggle="modal" data-bs-target="#drinkModal">Details</button>
                </div>
            </div>
        `;
        card.querySelector('.addToGroup').addEventListener('click', () => 
            addToGroup(drink.strDrink));
        card.querySelector('.details').addEventListener('click', () => 
            showDetails(drink));

        drinkList.appendChild(card);
    });
};

const addToGroup = (drinkName) => 
    {
    if (group.length >= 7)
         {
        alert('You cannot add more than 7');
        return;
    }
    if (!group.includes(drinkName)) {
        group.push(drinkName);
        convertCount += 1;
        cartCountElement.innerText = convertCount; 
        allGroup();
    }
};

const allGroup = () => 
    {
    groupList.innerHTML = '';
    group.forEach(drinkName => 
        {
        const item = document.createElement('li');
        item.className = 'list-group-item';
        item.textContent = drinkName;
        groupList.appendChild(item);
    });
    drinkCount.textContent = group.length;
};

const showDetails = (drink) =>
     {
    modalContent.innerHTML = `
        <img src="${drink.strDrinkThumb}" class="img-fluid mb-3" alt="${drink.strDrink}">
        <p> Name:</strong> ${drink.strDrink}</p>
        <p> Price:</strong> ${drink.price}</p>
        <p> Category:</strong> ${drink.strCategory}</p>
        <p> Instructions:</strong> ${drink.strInstructions}</p>
        <p> Serving Style:</strong> ${drink.strGlass}</p>
        <p> Alcoholic:</strong> ${drink.strAlcoholic}</p>
    `;
};

const fetchDrinks = (search) => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const drinks = (data.drinks || []).map(drink => ({
                ...drink,
                price: `$${(Math.random() * 10 + 5).toFixed(2)}`, 
            }));
            allDrinks(drinks);
        })
        .catch(error => {
            console.error('Error fetching drinks:', error);
            drinkList.innerHTML = '<p class="text-danger">Failed to fetch drinks</p>';
        });
};


searchButton.addEventListener('click', () => 
    {
    const search = searchInput.value;
    if (search)
         {
        fetchDrinks(search);
    }
     else 
     {
        drinkList.innerHTML = '<p class="text-warning"> Please enter a search </p>';
    }
});

 
fetchDrinks(''); 
