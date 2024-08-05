import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, onRemoveQuestion, onAnswerChange }) {
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            onRemoveQuestion={onRemoveQuestion}
            onAnswerChange={onAnswerChange}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
