import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { elements, renderLoader, clearLoader } from './views/base';
/* Global state of the app - all saved in one central variable
- search object
-current recipe object
- shopping list object
- like recipes
*/

const state = {};
// SEARCH CONTROLLER
const controlSearch = async () => {
  // 1. get query from view
  const query = searchView.getInput();

  if(query) {
    // 2. new search object and add to state
    state.search = new Search(query);

    // 3. prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);

    try {
      // 4. search for recipes
      await state.search.getResults();

      // 5. render results on UI
      clearLoader();
      searchView.renderResults(state.search.result);
    } catch (err){
      alert('Something went wrong with the search..');
      clearLoader();
    }
  }
}

elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
  const btn = e.target.closest('.btn-inline');
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
  }
});

// RECIPE CONTROLLER

const controlRecipe = async () => {
  // get recipe id from the url
  const id = window.location.hash.replace('#', '');
  // console.log(id);

  if(id) {
    // prepare the UI for changes
    recipeView.clearRecipe();
    renderLoader(elements.recipe);

    // highlight selected search item
    if (state.search) searchView.highlightSelected(id);

    // create new recipe object
    state.recipe = new Recipe(id);

    try {
      // get recipe data and parse ingredients
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();

      // calculate servings and time
      state.recipe.calcTime();
      state.recipe.calcServings();

      // render recipe
      clearLoader();
      recipeView.renderRecipe(state.recipe);
    } catch(err) {
      alert('Error processing recipe');
    }

  }
};

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

// handling recipe button clicks
elements.recipe.addEventListener('click', e=> {
  // the argument below matches btn-decrease and any child element of it
  if (e.target.matches('.btn-decrease, .btn-decrease *')) {
    // decrease button is clicked
    if(state.recipe.servings > 1) {
      state.recipe.updateServings('dec');
      recipeView.updateServingsIngredients(state.recipe);
    }
  } else if (e.target.matches('.btn-increase, .btn-increase *')) {
    // increase button is clicked
    state.recipe.updateServings('inc');
    recipeView.updateServingsIngredients(state.recipe);

  }
});

window.l = new List();





















//
