import React from "react";

function QuestionItem({ question, onRemoveQuestion, onAnswerChange }) {
  const { id, prompt, answers, correctIndex } = question;

  function handleDeleteButton() {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "Delete",
    }).then(() => {
      onRemoveQuestion(id);
    });
  }

  function handleDropdown(e) {
    const newCorrectIndex = e.target.value;
    console.log(newCorrectIndex);
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        correctIndex: newCorrectIndex,
      }),
    })
      .then((r) => r.json())
      .then((question) => onAnswerChange(question));
  }

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleDropdown}>
          {options}
        </select>
      </label>
      <button onClick={handleDeleteButton}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
