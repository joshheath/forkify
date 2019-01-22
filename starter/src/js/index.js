import axios from 'axios';

async function getResults(query) {

  const proxy = 'https://cors-anywhere.herokuapp.com/';
  const key = '8be3440ce9c8520a097af6981a258d04';

  try{
    const res = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${query}`);
    const recipes = res.data.recipes
    console.log(recipes);
  } catch (error){
    alert(error);
  }

}

getResults('souffle');
