import React from "react";

function QuestionItem({ question, onDelete, onUpdate }) {
  const { id, prompt, answers, correctIndex } = question;

  function handleChange(event) {
    const newCorrectIndex = parseInt(event.target.value); // Get the new correct answer index
  
    // Update local state for the correctIndex
    setFormData({
      ...formData,
      correctIndex: newCorrectIndex, // Ensure the state is updated with the new value
    });
  
    // Update the correctIndex on the server
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex: newCorrectIndex }),
    })
      .then((res) => res.json())
      .then((updatedQuestion) => {
        // Update the parent component's state with the updated question data
        onUpdate(updatedQuestion);
      })
      .catch((err) => console.error("Error updating question:", err));
  }
  
  

  function handleDelete() {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        onDelete(id); // Update local state in parent
      });
  }

  return (
    <li>
      <h4>{prompt}</h4>
      <label>
        Correct Answer:
        <select
          value={correctIndex}
          onChange={handleChange}
          data-testid={`correct-answer-${id}`}
        >
          {answers.map((answer, index) => (
            <option key={index} value={index}>
              {answer}
            </option>
          ))}
        </select>
      </label>
      <button
        onClick={handleDelete}
        data-testid={`delete-question-${id}`}
      >
        Delete Question {/* Changed from "Delete" to "Delete Question" */}
      </button>
    </li>
  );
}

export default QuestionItem;
