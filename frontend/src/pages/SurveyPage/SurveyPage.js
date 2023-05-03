import React, { useState } from "react";
import "./SurveyPage.css"
import axios from "axios";
import { Link } from "react-router-dom";

const SurveyPage = () => {
    async function createSurvey(survey) {
        try{
            let response = await axios.post(`http://127.0.0.1:5000/api/survey`,survey)
            console.log(response.data)
        }catch (error) {
            console.log(error)
        }
    }
    const [favoriteBrands, setfavoriteBrands] = useState('')
    const [favoriteColor, setfavoriteColor] = useState('')
    const [favoriteStyles, setfavoriteStyles] = useState('')
    
    function handleSubmit (e){
        let userSurvey = {
            question: "What are your favorite brands?",
            answer: favoriteBrands,
          };
          createSurvey(userSurvey);
        userSurvey = {
            question: "What is your favorite color?",
            answer: favoriteColor,
        };
        createSurvey(userSurvey);
        userSurvey = {
            question: "What are your favorite styles?",
            answer: favoriteStyles
        };
        createSurvey(userSurvey);
        e.preventDefault();
    }

    return (
        <div className="container">
        <h1>The Drip Survey</h1>
        <form onSubmit={handleSubmit}>
            <label>
            What Are Your Favorite Brands?
            <input
                type="text" name="FavoriteBrands"value={favoriteBrands} onChange={(e) => setfavoriteBrands(e.target.value)}/>
            </label>
            <label>
            What is Your Favorite Color?
            <input
                type="text" name="FavoriteColor" value={favoriteColor} onChange={(e) => setfavoriteColor(e.target.value)}/>
            </label>
            <label>
            What Are Your Favorite Style?
            <input name="Favorite  Style" value={favoriteStyles}onChange={(e) => setfavoriteStyles(e.target.value)}/>
            </label>
            <button type="submit" className="button">Submit</button>
            </form>
        </div>
    );
    };

    export default SurveyPage;
