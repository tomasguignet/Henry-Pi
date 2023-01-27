import "./App.css";
import { Switch, Route } from "react-router-dom";
import Index from "./components/Index/Index";
import Home from "./components/Home/Home";
import RecipeDetail from "./components/RecipeDetail/RecipeDetail";
import RecipeForm from "./components/RecipeForm/RecipeForm";
import NavBar from "./components/NavBar/NavBar";
import DietForm from "./components/DietForm/DietForm";
import SearchBar from "./components/SearchBar/SearchBar";
import PageNotFound from './components/PageNotFound/PageNotFound';
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import axios from "axios";
import { getRecipes, getDiets } from "../src/redux/actions";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    axios.get("http://localhost:3001/diets/preCharge").then(
      (data) => console.log("DataBase ready!"),
      (error) => console.log(error.message)
    );
    dispatch(getDiets());
    dispatch(getRecipes());
  },[dispatch])

  return (
    <Switch>
      <Route exact path="/">
        <Index />
      </Route>
      <Route exact path="/home">
        <NavBar />
        <SearchBar />
        <Home />
      </Route>
      <Route path="/recipes/:id">
        <NavBar />
        <RecipeDetail />
      </Route>
      <Route path="/recipeForm">
        <NavBar />
        <RecipeForm />
      </Route>
      <Route path="/dietForm">
        <NavBar />
        <DietForm />
      </Route>
      <Route path="/*">
        <PageNotFound/>
      </Route>
    </Switch>
  );
}

export default App;
