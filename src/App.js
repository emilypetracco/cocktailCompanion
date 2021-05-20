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
    const url = new URL(`https://www.thecocktaildb.com/api/json/v1/1/filter.php`);
    const searchParams = new URLSearchParams({
      // type is set onClick (cocktail or shot button)
      c: 'cocktail',
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
  }

  const setShots = (event) => {
    event.preventDefault();
    const url = new URL(`https://www.thecocktaildb.com/api/json/v1/1/filter.php`);
    const searchParams = new URLSearchParams({
      // type is set onClick (cocktail or shot button)
      c: 'shot',
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
  }

  console.log('rerender');

  return (
    <Fragment>
      <header>
        <h1><span>The </span>Cocktail Companion</h1>
      </header>
      <main>
        <h2>Pick Your Poison</h2>
        <div className="drinkType">
          <form>
            <button onClick={setCocktail}><i className="fas fa-cocktail"></i> Cocktails</button>
            <button onClick={setShots}><i className="fas fa-glass-whiskey"></i> Shots</button>
          </form>
        </div>
        {
          // rendering random drink
          drink.drinks && drink.drinks.map(res => {
            return (
              <container className="drinksContainer">
                <div className="imageContainer">
                  <img src={res.strDrinkThumb} />
                </div>
                <div className="drinkInfomation">
                  <h4>{res.strDrink}</h4>
                  <h5>Ingredients:</h5>
                  <ul>
                    <li>{res.strMeasure1} {res.strIngredient1}</li>
                    <li>{res.strMeasure2} {res.strIngredient2}</li>
                    <li>{res.strMeasure3} {res.strIngredient3}</li>
                    <li>{res.strMeasure4} {res.strIngredient4}</li>
                    <li>{res.strMeasure5} {res.strIngredient5}</li>
                    <li>{res.strMeasure6} {res.strIngredient6}</li>
                    <li>{res.strMeasure7} {res.strIngredient7}</li>
                    <li>{res.strMeasure8} {res.strIngredient8}</li>
                  </ul>
                  <h5>Instructions:</h5>
                  <p className="instructions">{res.strInstructions}</p>
                </div>
              </container>
            )
          })
        }
      </main>
      <footer>
        <p>Created at <a href="https://junocollege.com">Juno College</a></p>
      </footer>
    </Fragment>
  );
}
export default App;