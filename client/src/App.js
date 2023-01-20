import './App.css';
import {Switch , Route} from "react-router-dom";
import Index from "./components/Index/Index";
import Home from "./components/Home/Home";
import RecipeDetail from "./components/RecipeDetail/RecipeDetail";
import RecipeForm from "./components/RecipeForm/RecipeForm";


function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" element={<Index/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/recipes/:id" component={<RecipeDetail/>}/>
        <Route path="/recipeForm" component={<RecipeForm/>}/>
      </Switch>
    </div>
  );
}

export default App;
