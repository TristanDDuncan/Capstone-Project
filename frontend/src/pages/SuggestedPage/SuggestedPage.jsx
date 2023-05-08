import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";


const [suggestedBox, setSuggestedBox] = useState('')

    const suggestBox = (userAnswer) =>{
        
        let suggestedBox;

        if(userAnswer.includes("outerwear")&& userAnswer.includes("highend")){
            suggestBox = "Platinum Box Subscription";
        }else if (userAnswer.includes("athletic wear")&& userAnswer.includes("black")){
            suggestBox = "silver Box Subscription";
        }else if(userAnswer.includes("business wear ")&& userAnswer.includes("gucci")){
            suggestBox = "diamond Box Subscription";
        }else if(userAnswer.includes("causual wear")&& userAnswer.includes("primark")){
            suggestBox = "gold Box Subscription";
        } else {
            suggestBox = "copper Box Subscription";
        }

    setSuggestedBox(suggestedBox);
}
        






export default suggestBox;