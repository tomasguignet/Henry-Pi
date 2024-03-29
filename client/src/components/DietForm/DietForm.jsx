import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState , useEffect} from "react";
import { createDiet, getDiets } from './../../redux/actions';
import styles from "./DietForm.module.css";

function DietForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const diets = useSelector((state) => state.data.diets);

  const [name, setName] = useState("");

  const [error, setError] = useState("");

  const validate = (name) => {
    let newError = "";
    let dietsNames = [];
    diets.map((diet) => {
      dietsNames.push(diet.name);
    });
    if (!name) {
      newError = "El nombre no puede estar vacio";
    } else if (dietsNames.includes(name)) {
      newError = "La dieta ya existe";
    }
    return newError;
  };

  const handleChange = (event) => {
    setName(event.target.value);
    setError(validate(event.target.value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (error.length>0) {
      alert("Corregir errores antes de enviar");
    } else {
      dispatch(createDiet({name:name}));
      alert("Se ha crado la dieta");
      setName("");
      setError("");  
      history.push("/home");
    }
  };

  useEffect(()=> {
    console.log("actualice");
  },[diets, dispatch])

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <h1>Create your own diet</h1>

        <div className={styles.dietslist}>
          <h2>Diets</h2>
          <ul>
            {diets.map((diet) => (
              <li key={diet.name}>{diet.name}</li>
            ))}
          </ul>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} action="">
          <label htmlFor="name">Diet name:</label>
          <input name="name" value={name} type="text" onChange={handleChange} />
          {error? (<p>{error}</p>) : null}

          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
}

export default DietForm;
