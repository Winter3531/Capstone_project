import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";

import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import CollectionPage from "./components/MainPage";
import UserCollectionPage from "./components/MainPage/UserCollectionPage";
import CreateRecipeModal from "./components/CreateRecipesModal";
import RecipeDetails from "./components/RecipeDetailsPage";
import UpdateRecipePage from "./components/UpdateRecipePage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path='/collection/:userId'>
            <UserCollectionPage />
          </Route>
          <Route path='/collection'>
            <CollectionPage />
          </Route>
          <Route path='/new-recipe'>
            <CreateRecipeModal />
          </Route>
          <Route path='/recipes/edit/:recipeId'>
            <UpdateRecipePage />
          </Route>
          <Route path='/recipes/:recipeId'>
            <RecipeDetails />
          </Route>
          <Route path='/'>
            <CollectionPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
