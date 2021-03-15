import './App.css';
import styled from 'styled-components'
import Textbox from './widgets/Textbox.js'
import CheckboxList from './widgets/CheckboxList.js'
import useStickyState from './widgets/useStickyState.js'
import uniqueString from 'unique-string'

function App() {

  const [widgets, setWidgets] = useStickyState([], "widgets") 

  function add() {
    setWidgets([...widgets, uniqueString()])
  }

  return (
    <div className="App">
      <header className="App-header">
        <Textbox/>
        <CheckboxList/>
      </header>
    </div>
  );
}

export default App;
