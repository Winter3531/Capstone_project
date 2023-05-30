import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

import { updateRecipeThunk } from "../../store/recipe";
import { allRecipesThunk } from "../../store/recipe";
import EditInstructionModal from "./EditInstructionModal";
import OpenModalButton from "../OpenModalButton";
import { FaTrash } from 'react-icons/fa';


export default function UpdateRecipePage() {

    const recipeTypes = [
        "",
        "Appetizer",
        "Breakfast",
        "Entree",
        "Side",
        "Dessert",
        "Other",
    ]

    const { recipeId } = useParams();
    const dispatch = useDispatch();

    const history = useHistory()
    const recipe = useSelector(state => state?.recipes[recipeId])
    const user = useSelector(state => state.session?.user.id)

    const [errors, setErrors] = useState([]);

    // SETS THE STATE FOR TYPE
    const currType = recipeTypes.filter(type => {
        if (type.toLowerCase() === recipe?.recipe_type) {
            return type
        }
    })

    let ingredientArr = recipe?.ingredients.split(';')
    let instructionArr = recipe?.instructions.split(';')

    const [type, setType] = useState(currType[0])
    const [title, setTitle] = useState(recipe?.recipe_title)
    const [time, setTime] = useState(recipe?.preperation_time)
    const [notes, setNotes] = useState(recipe?.notes)
    const [newIngredient, setNewIngredient] = useState('')
    const [quantity, setQuantity] = useState(0)
    const [unit, setUnit] = useState('')
    const [ingredients, setIngredients] = useState([])
    const [newStep, setNewStep] = useState('')
    const [instructions, setInstructions] = useState([])
    let count = 0


    const handleAddIngredient = async (e) => {
        e.preventDefault();
        // Intended Format "2 Tbsp. Salt"
        ingredientArr = ingredients
        ingredientArr.push([quantity + ' ' + unit + ' ' + newIngredient])
        setIngredients(ingredientArr)
        setUnit('')
        setQuantity(0)
        setNewIngredient('')
    };

    const handleDeleteIngredient = async (e) => {
        e.preventDefault();
    }

    const handleAddInstruction = async (e) => {
        e.preventDefault();
        instructionArr = instructions;
        instructionArr.push([newStep])
        setInstructions(instructionArr)
        setNewStep('')
    };

    const handleDeleteStep = async (i, e) => {
        e.preventDefault();
        instructionArr = instructionArr.slice(0,i).concat(instructionArr.slice(i+1))
        console.log("Doesn't Work")
        return instructionArr
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const ingredientsStr = ingredientArr.join(';');
        const instructionsStr = instructionArr.join(';');

        // INTENDED FORMAT
        // ingredients:"1 cup Milk;2 tbsp. Sugar"
        // instructions:"Step 1.;Step 2."
        // notes:"The notes."
        // owner_id:1
        // preperation_time:"50"
        // recipe_title:"Title"
        // recipe_type:"Entree"

        const recipeData = {
            owner_id: user,
            recipe_type: type.toLowerCase(),
            recipe_title: title,
            preperation_time: Number(time),
            notes,
            ingredients: ingredientsStr,
            instructions: instructionsStr
        }
        console.log(recipeData, "***JSX***")
        dispatch(updateRecipeThunk(recipeId, recipeData));
        return history.push(`/recipes/${recipeId}`) // **ATTENTION** CHANGE THIS
    };

    useEffect(() => {
        dispatch(allRecipesThunk())
    }, [dispatch, instructionArr.length])

    return (
        <div className="post-recipe-modal">
            <h1 id='post-recipe-header'>Post a New Recipe</h1>
            {recipe &&
                <form className="recipe-details-form">
                    <label>
                        Recipe Title
                        <input
                            type="text"
                            value={title}
                            onChange={(e => setTitle(e.target.value))}
                            placeholder="Recipe Title"
                            id='title-input'
                        />
                    </label>

                    <label>
                        Recipe Type
                        <select
                            id='recipe-type-select'
                            value={type}
                            onChange={(e => setType(e.target.value))}
                        >
                            <option> </option>
                            <option>Appetizer</option>
                            <option>Breakfast</option>
                            <option>Entree</option>
                            <option>Side</option>
                            <option>Dessert</option>
                            <option>Other</option>
                        </select>
                    </label>

                    <label>
                        Preperation Time
                        <input
                            type="text"
                            value={time}
                            onChange={(e => setTime(e.target.value))}
                            placeholder="Provide Time in Minutes"
                            id='time-input'
                        />minutes
                    </label>

                    <label id='chef-note-label'>
                        Chef's Notes
                        <textarea
                            type="text"
                            value={notes}
                            onChange={(e => setNotes(e.target.value))}
                            id="chef-note-input"
                        />
                    </label>
                </form>
            }

            {recipe &&
                <div className="ingredients-div">
                    <form onSubmit={handleAddIngredient} className="add-ingredient-form">
                        <label>Quantity
                            <input
                                id="quantity-input"
                                type="decimal"
                                value={quantity}
                                onChange={(e => setQuantity(e.target.value))}
                            />
                        </label>

                        <label>Unit
                            <select
                                id='unit-select'
                                onChange={e => setUnit(e.target.value)}
                            >
                                <option></option>
                                <option>tbsp.</option>
                                <option>tsp.</option>
                                <option>oz.</option>
                                <option>cup</option>
                                <option>pint</option>
                                <option>quart</option>
                                <option>gallon</option>
                                <option>gram</option>
                                <option>lb</option>
                                <option>mililiter</option>
                                <option>liter</option>
                            </select>
                        </label>

                        <label>
                            Ingredient
                            <input
                                className="ingredient-input"
                                type="text"
                                value={newIngredient}
                                onChange={(e => setNewIngredient(e.target.value))}
                                placeholder="Next Ingredient?"
                            />
                        </label>

                        <button type="submit" id='add-ingredient-submit'>Add</button>
                    </form>

                    <div>
                        <h5>Ingredient List</h5>
                        {ingredientArr.length ? (
                            ingredientArr.map(i =>
                                <div className="ingredient-arr">
                                    <p key={i} >{i}</p>
                                    <FaTrash onClick={handleDeleteIngredient} />
                                </div>
                            )
                        ) : (
                            <p>None</p>
                        )
                        }
                    </div>
                </div>
            }

            {recipe &&
                <div className="instructions-div" >
                    <form onSubmit={handleAddInstruction} className="add-instruction-form">
                        <label id="add-step-label" >
                            Add a Step
                            <textarea
                                type="text"
                                value={newStep}
                                onChange={(e => setNewStep(e.target.value))}
                                placeholder="Next Step?"
                                id="add-step-input"
                            />
                        </label>
                        <button type="submit" id='add-instruction-submit'>Add</button>
                    </form>

                    <div>
                        <h5>Instructions</h5>
                        {instructionArr.length ? (
                            instructionArr.map((step, i) => {
                                return (
                                    <div>
                                        <p key={i} >{i+1}. {step}</p>
                                        <OpenModalButton
                                            buttonText="Edit"
                                            // onModalClose={*** set the edited step to the step in the array ***}
                                            modalComponent={<EditInstructionModal currStep={step} />}
                                        />
                                        <FaTrash onClick={handleDeleteStep}/>
                                    </div>
                                )
                            })
                        ) : (
                            <p>None</p>
                        )
                        }
                    </div>
                </div>
            }
            <button type="submit" onClick={handleSubmit} id='recipe-submit-button'>Start Cooking</button>
        </div>
    )
}
