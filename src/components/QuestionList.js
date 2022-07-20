import React,{useEffect,useState} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const[questions,setQuestions]=useState([])
  useEffect(()=>{
    fetch("http://localhost:4000/questions")
    .then(r=>r.json())
    .then(questions=>setQuestions(questions))
  },[])
  const lis=questions.map(question=>{
    return <QuestionItem onUpdateAnswer={handleUpdateAnswer} question={question} onDelete={handleDeleteQuiz} key={question.id}/>
  })
  function handleDeleteQuiz(deletedQuiz){
    setQuestions(questions=>questions.filter(question=>question.id !==deletedQuiz.id))
  }
  function handleUpdateAnswer(updatedQuiz){
    setQuestions(questions=>questions.map(quiz=>quiz.id !==updatedQuiz.id?quiz:updatedQuiz))
  }
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{lis}</ul>
    </section>
  );
}

export default QuestionList;
