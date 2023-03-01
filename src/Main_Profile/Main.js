import Quizzical from "../projects/quizzical/Quizzical";
import Project from "./Projects";
import "../index.css";
import About from "./aboutPage/About";

export default function Main(props) {
    console.log(props.pageStat)
    let displayPage;
    switch (props.pageStat) {
        case 'about':
            displayPage = <About />
            break;
        case 'projects':
            displayPage = <Project />
            break;
        default:
            displayPage = <p>Error in displaying</p>
    }
    return (
        <main className="main-block">
            {displayPage}
            {/* <Quizzical /> */}
        </main>
    )
}