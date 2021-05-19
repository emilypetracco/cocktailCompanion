import './App.css';
import { useState, useEffect } from 'react';
import { Fragment } from 'react';

// component to handle choosing drink and rendering options
function App() {
  // SETTING INITIAL STATE:
  // drink represents drink results
  const [drink, setDrink] = useState([]);
  // type represents cocktail or shot
  const [type, setType] = useState('');
  // id represents the drinkId
  const [id, setId] = useState(0);

  // GETTING AND SETTING DRINK ID:
  useEffect(
    () => {
      const url = new URL(`https://www.thecocktaildb.com/api/json/v1/1/filter.php`);
      const searchParams = new URLSearchParams({
        // type is set onClick (cocktail or shot button)
        c: type,
        cache: false
      }
      );
      url.search = searchParams;
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((drinks) => {
          let idDrinkArray = [];
          drinks.drinks.map(res => {
            idDrinkArray.push(res.idDrink);
          });
          const i = idDrinkArray[Math.floor(Math.random() * idDrinkArray.length)];
          setId(i);
        })
    },
    [type]
  );

  // GETTING AND SETTING DRINKS BASED OFF OF ID
  useEffect(
    () => {
      let array = [];
      const finalUrl = new URL(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php`);
      const finalSearchParams = new URLSearchParams({
        // type is set onClick (cocktail or shot button)
        i: id
      }
      );
      finalUrl.search = finalSearchParams;
      fetch(finalUrl)
        .then((response) => {
          return response.json();
        })
        .then((finalDrink) => {
          setDrink(finalDrink);
        })
    },
    [id]
  );

  const setCocktail = (event) => {
    event.preventDefault();
    setType('cocktail')
    console.log('cocktail')
  }

  const setShots = (event) => {
    event.preventDefault();
    setType('shot')
  }

  console.log('rerender');

  return (
    <Fragment>
      <header>
        <h1><span>The </span>Cocktail Companion</h1>
      </header>
      <main>
        <h2>Pick your poison</h2>
        <div className="drinkType">
          <form>
            <button onClick={setCocktail}><i className="fas fa-cocktail"></i> Cocktails</button>
            <button onClick={setShots}><i className="fas fa-glass-whiskey"></i> Shots</button>
          </form>
        </div>
        <div className="savedDrinks">
          <h3>Your Saved Drinks:</h3>
        </div>
        <ul>
          {
            // rendering random drink
            drink.drinks && drink.drinks.map(res => {
              return (
                <li>
                  <img src={res.strDrinkThumb} />
                  <h4>{res.strDrink}</h4>
                  <p>{res.strInstructions}</p>
                  <p>{res.strIngredient1}</p>
                  <button>save!</button>
                </li>
              )
            })
            }
        </ul>
      </main>
    </Fragment>
  );
}
export default App;