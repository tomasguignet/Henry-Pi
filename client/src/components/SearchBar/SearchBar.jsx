import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByDiets,
  getRecipes,
  getRecipesByName,
  orderAlphabetically,
  orderByScore,
} from "../../redux/actions";
import Home from "../Home/Home";
import styles from "./SearchBar.module.css";

function SearchBar() {
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.data.diets);

  const [name, setName] = useState("");
  const [dietsFilter, setDietsFilter] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [orders, setOrders] = useState({
    orderByName: { asc: false, des: false },
    orderByScore: { asc: false, des: false },
  });

  const showCheckboxes = () => {
    if (!expanded) {
      setExpanded(true);
    } else {
      setExpanded(false);
    }
  };

  const handleFilter = (event) => {
    const diet = event.target.value;
    const find = dietsFilter.indexOf(diet);

    if (find >= 0) {
      dietsFilter.splice(find, 1);
    } else {
      dietsFilter.push(diet);
    }

    dispatch(filterByDiets(dietsFilter));
  };

  const handleOrder = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name == "orderByName") {
      if (value === "true") {
        setOrders({
          orderByName: { asc: true, des: false },
          orderByScore: { asc: false, des: false },
        });
        dispatch(orderAlphabetically(true));
      } else {
        setOrders({
          orderByName: { asc: false, des: true },
          orderByScore: { asc: false, des: false },
        });
        dispatch(orderAlphabetically(false));
      }
    } else {
      if (value === "true") {
        setOrders({
          orderByName: { asc: false, des: false },
          orderByScore: { asc: true, des: false },
        });
        dispatch(orderByScore(true));
      } else {
        setOrders({
          orderByName: { asc: false, des: false },
          orderByScore: { asc: false, des: true },
        });
        dispatch(orderByScore(false));
      }
    }
  };

  const handleName = (event) => {
    const name = event.target.value;
    setName(name);
  };
  const handleSubmitName = (event) => {
    event.preventDefault();
    try {
      dispatch(getRecipesByName(name));
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleReset = () => {
    dispatch(getRecipes());
    setOrders({
      orderByName: { asc: false, des: false },
      orderByScore: { asc: false, des: false },
    });
    setDietsFilter([]);
    setExpanded(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.resetButtonBox}>
        <button type="button" onClick={handleReset}>
          Reset recipes
        </button>
      </div>

      <div className={styles.nameForm}>
        <form>
          <label htmlFor="recipeName">Recipe name:</label>
          <input name="recipeName" type="text" onChange={handleName} />
          <button type="submit" onClick={handleSubmitName}>
            Search
          </button>
        </form>
      </div>

      <div className={styles.dietFilterBox}>
        <label className={styles.dietfilterTitle} htmlFor="dietFilter">Diet filter</label>
        <div className={styles.multiselect}>
          <div className={styles.selectBox} onClick={showCheckboxes}>
            <select>
              <option>Select diets to filter</option>
            </select>
            <div className={styles.overSelect}></div>
          </div>
          <div
            style={{ display: expanded ? "block" : "none" }}
            className={styles.checkboxes}
          >
            {diets.map((diet) => (
              <label key={diet.name} htmlFor={diet.name}>
                <input
                  value={diet.name}
                  type="checkbox"
                  id={diet.name}
                  onChange={handleFilter}
                />
                {diet.name}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.orderNameBox}>
        <h3>Order by name</h3>
        <fieldset id="orderByName">
          <label htmlFor="ascName">
            <input
              type="radio"
              checked={orders.orderByName.asc}
              value={true}
              name="orderByName"
              id="ascName"
              onChange={(e) => {
                handleOrder(e);
              }}
            />
            Ascendant
          </label>
          <label htmlFor="desName">
            <input
              type="radio"
              checked={orders.orderByName.des}
              value={false}
              name="orderByName"
              id="desName"
              onChange={handleOrder}
            />
            Descendant
          </label>
        </fieldset>
      </div>

      <div className={styles.orderScoreBox}>
        <h3>Order by score</h3>
        <fieldset id="orderByScore">
          <label htmlFor="ascScore">
            <input
              type="radio"
              checked={orders.orderByScore.asc}
              value={true}
              name="orderByScore"
              id="ascScore"
              onChange={handleOrder}
            />
            Ascendant
          </label>
          <label htmlFor="desScore">
            <input
              type="radio"
              checked={orders.orderByScore.des}
              value={false}
              name="orderByScore"
              id="desScore"
              onChange={handleOrder}
            />
            Descendant
          </label>
        </fieldset>
      </div>
    </div>
  );
}

export default SearchBar;
