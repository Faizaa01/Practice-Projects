const load = () => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=m')
    .then(res => res.json())
    .then(data => {
        display(data.drinks);
});
};


const finddrinks = () => {
  const query = document.getElementById("search-input").value;

  if (!query) {
    alert("Please enter a drink name.");
    return;
  }

  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`)
    .then(res => res.json())
    .then(data => {
      if (!data.drinks) {
        document.getElementById("drinks-container").innerHTML = `<h2 class="no-drink">"No Drink Like That"</h2>`;
      } else {
        display(data.drinks);
      }
    })
    .catch(() => {
      document.getElementById("drinks-container").innerHTML = `<p>Error fetching data</p>`;
    });
};


const display = (drinks) =>{
    const Dcontainer = document.getElementById("drinks-container");
    Dcontainer.innerHTML = "";

    drinks.forEach(drink => {
        const div = document.createElement("div");
        div.classList.add("box");
        div.innerHTML=`
        <img class="D-img" src="${drink.strDrinkThumb}" alt=""/>
        <h4>${drink.strDrink}</h4>
        <p><b>Category:</b> ${drink.strCategory}</p>
        <p><b>Instructions: </b>${drink.strInstructions.slice(0,20)}...</p>
        <button class="button1" onclick="handleAdd('${drink.strDrink}','${drink.strDrinkThumb}')">Add to cart</button>
        <button class="button2" onclick="handleDetails('${drink.idDrink}')"> Details </button>
        `;
        Dcontainer.appendChild(div);
    });
};

const handleAdd = (name,img) => {
    
    const cnt = document.getElementById("total").innerText;
    let conv=parseInt(cnt);
    conv = conv+1;
    document.getElementById("total").innerText = conv;

    if(conv>=8){
        alert("Drink Limit Exceeded");
        return;
    }

    const container = document.getElementById("add");
    const div = document.createElement("div");
    div.classList.add("cart-add");
    div.innerHTML=`
    <p>${conv}</p>
    <img class="c-img" src="${img}" alt=""/>
    <p class="name">${name}</p>
    `;
    container.appendChild(div);
}

const handleDetails = (id) => {
    let Did=parseInt(id);
    console.log(Did);
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(res => res.json())
    .then(data => {
     data.drinks.forEach(drink => {

            document.getElementById("modal-body").innerHTML = `
                <img class="img-fluid rounded m-1" src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
                <h4>Details</h4>
                <p><b>Category:</b> ${drink.strCategory}</p>
                <p><b>Alcoholic:</b> ${drink.strAlcoholic}</p>
                <p><b>Instructions:</b> ${drink.strInstructions}</p>
            `;
        });

        const modal = new bootstrap.Modal(document.getElementById("detailsModal"));
        modal.show();
    });
};

load();
