const load = () => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?=')
    .then(res => res.json())
    .then(data => {
        // display(data.meals);
});
};


const find = () => {
  const query = document.getElementById("search-input").value;

  if (!query) {
    alert("Please enter a recipe name.");
    return;
  }

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    .then(res => res.json())
    .then(data => {
      if (!data.meals) {
        document.getElementById("recipes-container").innerHTML = `<h2 class="no-recipe">"Recipes Not Found"</h2>`;
      } else {
        display(data.meals);
      }
    })
    .catch(() => {
      document.getElementById("recipes-container").innerHTML = `<p>Error fetching data</p>`;
    });
};



const display = (recipes) =>{
    const Rcontainer = document.getElementById("recipes-container");
    Rcontainer.innerHTML = "";

    recipes.forEach(recipe => {
        const div = document.createElement("div");
        div.classList.add("box");
        div.setAttribute("onclick", `handleDetails('${recipe.idMeal}')`);
        div.innerHTML=`
        <img class="R-img" src="${recipe.strMealThumb}" alt=""/>
        <h4 class="R-name">${recipe.strMeal}</h4>
        <p><b>Category:</b> ${recipe.strCategory}</p>
        `;
        Rcontainer.appendChild(div);
    });
};

const handleDetails = (id) => {
    let Did=parseInt(id);
    console.log(Did);
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${Did}`)
    .then(res => res.json())
    .then(data => {
    const recipe = data.meals[0];
      const R_Details = document.querySelector('.details');
      R_Details.innerHTML = '';

      const ingredients = [];
      for (let i = 1; i <= 20; i++) {
        const ing = recipe[`strIngredient${i}`];
        const measure = recipe[`strMeasure${i}`];
        if (ing && ing.trim()) {
          ingredients.push(`${ing} - ${measure}`);
        }
      }

      const div = document.createElement('div');
      div.classList.add('box1');
      div.innerHTML = `
        <img class="img1 img-fluid rounded m-1" src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
        <h4 class="nam">${recipe.strMeal}</h4>
        <h4>Ingredients</h4>
        <ul>
          ${ingredients.map(i => `<li>${i}</li>`).join('')}
        </ul>
      `;
      R_Details.appendChild(div);
    });
};

load();