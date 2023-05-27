import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";

import { authenticate } from "./store/session";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import Navigation from "./components/Navigation";
import CollectionPage from "./components/MainPage";
import CreateRecipeModal from "./components/CreateRecipesModal";
import RecipeDetails from "./components/RecipeDetailsPage";

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
          {/* <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route> */}
          <Route path='/collection'>
            <CollectionPage />
          </Route>
          <Route path='/new-recipe'>
            <CreateRecipeModal />
          </Route>
          <Route path='/recipes/:recipeId'>
            <RecipeDetails />
          </Route>
          <Route path='/recipes/:recipeId/edit'>
            <UpdateRecipePage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
