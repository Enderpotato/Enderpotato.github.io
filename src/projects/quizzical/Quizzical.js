import React from "react"
import Question from "./Question"
import "./Quizzical.css"

function shuffleArray(arr) {
    var array = arr
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

export default function Quizzical() {
    const [restart, setRestart] = React.useState(0)
    
    const [start, setStart] = React.useState(false)
    const [isAnswering, setIsAnswering] = React.useState(false);
    const [questionsObject, setQuestionsObject] = React.useState(undefined);
    const [answersArray, setAnswersArray] = React.useState([]);
    const [selectedIndexes, setSelectedIndexes] = React.useState([null, null, null, null, null])
    const [correctAnswers, setCorrectAnswers] = React.useState(0)
    const [optionsArray, setOptionsArray] = React.useState({})
    
    
    //console.log('app rerender')
    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&type=multiple")
            .then(response => response.json())
            .then(data => {
                setAnswersArray(data.results.map(result => result.correct_answer))
                setQuestionsObject(data.results);
                setSelectedIndexes([null, null, null, null, null]);
                setOptionsArray(data.results.map(result => {
                    return shuffleArray([result.correct_answer, ...result.incorrect_answers]);
                }))
            });
    }, [restart])
    
    
    function startQuiz(){
        setStart(true);
        setIsAnswering(true);
    }
    
    function submitOption(questionIndex, optionIndex){
        setSelectedIndexes(prevSI => prevSI.map((selectedIndex, index) => {
            return index === questionIndex ?
            optionIndex : selectedIndex;
        }))
    }
    
    function submitAnswers(event){
        event.preventDefault()
        if (!isAnswering){
            setStart(false);
            setQuestionsObject(undefined)
            setRestart(prevRestart => prevRestart + 1)
            setCorrectAnswers(0);
        }else{
            //console.log(answersArray)
            setIsAnswering(false);
            setCorrectAnswers(() => {
                var count = 0
                optionsArray.forEach((options, optionsIndex) => {
                    if (options[selectedIndexes[optionsIndex]] 
                        === answersArray[optionsIndex]){
                        count++
                    }
                })
                return count
            })
        }
    }

    //console.log(optionsArray)
    const questions = questionsObject ? questionsObject.map((questionObject, questionIndex) => {
        const questions = questionObject.question
                    .replaceAll("&quot;", '"')
                    .replaceAll("&#039;", "'")
                    .replaceAll("&amp;", "&")
                    .replaceAll("&eacute;", String.fromCharCode(233))
        return (
            <Question 
                id={questionIndex}
                key={questionIndex}
                title={questions}
                submitOption={submitOption}
                options={optionsArray[questionIndex]}
                selectedIndex={selectedIndexes[questionIndex]}
                answer={answersArray[questionIndex]}
                answerCheck={!isAnswering}
            />
        )
    })
    : <div>Loading...</div>
    //console.log(questions)
    return (
        <main className="quizzical">
            {
                !start ? 
                <div className="title-container">
                    <h1 className="title">Quizzical</h1>
                    <p className="title-description">Some description if needed</p>
                    <button className="startQuiz" onClick={startQuiz}>Start quiz</button>
                </div>
                :
                <div>
                    <form onSubmit={submitAnswers}>
                        {questions}
                        {!isAnswering && <p className="score">
                            You scored {correctAnswers == 0 ? "no" : correctAnswers} {correctAnswers == 1 ? "correct answer" :"correct answers"}
                        </p>}
                        <button className="submit-button">{
                            isAnswering ? "Check answers" : "Play again"
                        }
                        </button>
                    </form>
                </div>
            }
        </main>
    )
}