import './App.css';
import {Routes , Route} from "react-router-dom";
import index from "./components/Index/Index";
import home from "./components/Home/Home";
import RecipeDetail from "./components/RecipeDetail/RecipeDetail";
import RecipeForm from "./components/RecipeForm/RecipeForm";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={index} />
        <Route path="/home" element={home}/>
        <Route path="/recipes/:id" element={RecipeDetail}/>
        <Route path="/recipeForm" element={RecipeForm}/>
      </Routes>
    </div>
  );
}

export default App;
