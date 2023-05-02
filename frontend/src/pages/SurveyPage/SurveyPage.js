import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
const SurveyPage = () => {
  // Initialize state for survey responses
  const [surveyResponses, setSurveyResponses] = useState({
    name: "",
    age: "",
    favoriteColor: "",
    feedback: "",
  });

  // Update survey responses when user types in a field
  const handleChange = (event) => {
    const { name, value } = event.target;
    setSurveyResponses((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Send surveyResponses to backend or do something with the data
    console.log(surveyResponses);
  };

  return (
    <div className="container">
      <h1>My Awesome Survey</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={surveyResponses.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Age:
          <input
            type="number"
            name="age"
            value={surveyResponses.age}
            onChange={handleChange}
          />
        </label>
        <label>
          Favorite Color:
          <input
            type="text"
            name="favoriteColor"
            value={surveyResponses.favoriteColor}
            onChange={handleChange}
          />
        </label>
        <label>
          Feedback:
          <textarea
            name="feedback"
            value={surveyResponses.feedback}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SurveyPage;
