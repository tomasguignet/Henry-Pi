import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { filterByDiets, getRecipes } from '../../redux/actions';
import styles from "./SearchBar.module.css";

function SearchBar() {
    const dispatch = useDispatch();
    const diets = useSelector((state) => state.data.diets);
    const [dietsFilter, setDietsFilter] = useState([]);
    const [expanded, setExpanded] = useState(false);
    const showCheckboxes = () => {
        if (!expanded) {
            setExpanded(true);
        } else {
            setExpanded(false);
        }
    }
    const handleCheckbox = (event) => {
        const diet = event.target.value;
        const find = dietsFilter.indexOf(diet);

        if (find >= 0) {
            dietsFilter.splice(find, 1);
        } else {
            dietsFilter.push(diet);
        }

        dispatch(filterByDiets(dietsFilter));
    }

    return (
        <div>
            <div>
                <label htmlFor='recipeName'>Recipe name:</label>
                <input name='recipeName' type="text" />
            </div>

            <div>
                <label htmlFor="dietFilter">Diet filter</label>
                <div className={styles.multiselect}>
                    <div
                        className={styles.selectBox}
                        onClick={showCheckboxes}
                    >
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
                            <label key={diet} htmlFor={diet.name}>
                                <input
                                    value={diet.name}
                                    type="checkbox"
                                    id={diet.name}
                                    onChange={handleCheckbox}
                                />
                                {diet.name}
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchBar