import React from "react";

function QuestionItem({ question,onDelete,onUpdateAnswer }) {
  console.log(question)
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));
  function handleOnDelete(){
    const serverOptions={method:"DELETE"}
    fetch(`http://localhost:4000/questions/${question.id}`,serverOptions)
    .then(r=>r.json())
    .then(()=>onDelete(question))
  }
  function handleAnswerChange(e){
    console.log(e.target.value)
    const serverOptions={
      method:"PATCH",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({...question,correctIndex:e.target.value})
    }
    fetch(`http://localhost:4000/questions/${question.id}`,serverOptions)
    .then(r=>r.json())
    .then(updatedQuiz=>onUpdateAnswer(updatedQuiz))
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange={handleAnswerChange} defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={handleOnDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
