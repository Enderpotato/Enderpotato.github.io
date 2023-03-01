export default function Question(props) {
    const selectedStyle = {backgroundColor: "#D6DBF5" }
    const notSelectedStyle = {backgroundColor: "transparent"}
    const correctAnswerStyle ={backgroundColor: "#94D7A2"}
    const wrongAnswerStyle = {backgroundColor: "#F8BCBC"}
    const options = (props.options) ? props.options.map((option, optionIndex) => {
        // props.selectedIndex === optionIndex ? selectedStyle : notSelectedStyle
        return (
            <button 
                onClick={() => !props.answerCheck && props.submitOption(props.id, optionIndex)} 
                style={props.answerCheck ?
                    option === props.answer ? correctAnswerStyle : 
                    props.selectedIndex === optionIndex ? wrongAnswerStyle : notSelectedStyle
                    : 
                    props.selectedIndex === optionIndex ? selectedStyle : notSelectedStyle
                }
                type="button"
                className="question--option"
                key={`${props.id} ${optionIndex}`}
                >{
                    option.replaceAll("&quot;", '"')
                        .replaceAll("&#039;", "'")
                        .replaceAll("&amp;", "&")
                        .replaceAll("&eacute;", String.fromCharCode(233))
            }</button>
        )
    })
    : <div>Loading...</div>
    return (
        <div className="question">
            <h1 className="question-title">{props.title}</h1>
            <div className="options-container">
                {options}
            </div>
        </div>
    )
}