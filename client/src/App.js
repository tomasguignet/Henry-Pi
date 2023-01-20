import './App.css';
import { Switch, Route } from "react-router-dom";
import Index from "./components/Index/Index";
import Home from "./components/Home/Home";
import RecipeDetail from "./components/RecipeDetail/RecipeDetail";
import RecipeForm from "./components/RecipeForm/RecipeForm";


function App() {
  console.log("En App");
  return (
    <Switch>
      <Route path="/">
        <Index />
      </Route>
      <Route path="/home">
        <Home />
      </Route>
      <Route path="/recipes/:id">
        <RecipeDetail />
      </Route>
      <Route path="/recipeForm">
        <RecipeForm />
      </Route>
    </Switch>
  );
}

export default App;
