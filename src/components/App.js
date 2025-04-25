import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    let isMounted = true; // track whether the component is mounted
    fetchQuestions();
  
    return () => {
      isMounted = false; // cleanup function to update flag when unmounted
    };
  }, []);

  const fetchQuestions = () => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.error("Error fetching questions:", err));
  };

  const handleDeleteQuestion = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to delete question');
        }
        setQuestions(prevQuestions => prevQuestions.filter(q => q.id !== id));
      })
      .catch(err => console.error("Error deleting question:", err));
  };

  const handleUpdateQuestion = (updatedQuestion) => {
    setQuestions(prevQuestions =>
      prevQuestions.map(q => 
        q.id === updatedQuestion.id ? updatedQuestion : q
      )
    );
  };
  

  const handleNewQuestion = (newQuestion) => {
    setQuestions(prevQuestions => [...prevQuestions, newQuestion]);
  };

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onQuestionSubmit={handleNewQuestion} />
      ) : (
        <QuestionList 
          questions={questions} 
          onDelete={handleDeleteQuestion} 
          onUpdate={handleUpdateQuestion} 
        />
      )}
    </main>
  );
}

export default App;