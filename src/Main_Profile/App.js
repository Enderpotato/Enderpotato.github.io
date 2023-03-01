import Navbar from './navbar/Navbar'
import React from "react"
import Main from "./Main"

function App() {
  let [pageStat, setPageStat] = React.useState('about');
  function changePage(page) {
    setPageStat(page) 
  }

  return (
    <div className="app">
      <Navbar changePage={changePage}/>
      <Main pageStat={pageStat}/>
    </div>
  );
}

export default App;
