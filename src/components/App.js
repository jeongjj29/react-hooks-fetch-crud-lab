import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((d) => setQuestions(d));
  }, []);

  function handleFormSubmit(newQuestion) {
    setQuestions([...questions, newQuestion]);
  }

  function handleDeleteQuestion(removedId) {
    const updatedQuestions = questions.filter(
      (question) => question.id !== removedId
    );
    setQuestions(updatedQuestions);
  }

  function handleAnswerChange(updatedQuestion) {
    questions.map((question) => {
      if (question.id === updatedQuestion.id) {
        question.correctIndex = updatedQuestion.correctIndex;
      } else {
        return question;
      }
    });
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onFormSubmit={handleFormSubmit} />
      ) : (
        <QuestionList
          questions={questions}
          onRemoveQuestion={handleDeleteQuestion}
          onAnswerChange={handleAnswerChange}
        />
      )}
    </main>
  );
}

export default App;
