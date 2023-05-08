import React, { useState } from "react";
import "./SurveyPage.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";


const SurveyPage = () => {
      const navigate = useNavigate();

        const [favoriteBrands, setfavoriteBrands] = useState('');
        const [favoriteColor, setfavoriteColor] = useState('');
        const [favoriteStyles, setfavoriteStyles] = useState('');

        const suggestBox = (userAnswer) => {
            let suggestedBox;

            if(userAnswer.includes("outerwear")&& userAnswer.includes("highend")){
                suggestedBox = "Platinum Box Subscription";
            }else if (userAnswer.includes("athletic wear")&& userAnswer.includes("black")){
                suggestedBox = "silver Box Subscription";
            }else if(userAnswer.includes("business wear")&& userAnswer.includes("gucci")){
                suggestedBox = "diamond Box Subscription";
            }else if(userAnswer.includes("causual wear")&& userAnswer.includes("primark")){
                suggestedBox = "gold Box Subscription";
            } else {
                suggestedBox = "copper Box Subscription";
            }
    
        return suggestedBox;

        }

    async function createSurvey(survey) {
        try{
            let response = await axios.post(`http://127.0.0.1:5000/api/survey`,survey)
            console.log(response.data)
        }catch (error) {
            console.log(error)
        }
        navigate("/")
    }
    
    
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


        const userAnswers = [favoriteBrands, favoriteColor, favoriteStyles];
        console.log(userAnswers);
        const suggestedBox = suggestBox(userAnswers);
        alert("Thank you for Your Response")
        alert(`Based on your answers, we suggest the ${suggestedBox} subscription box.`)
        
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
