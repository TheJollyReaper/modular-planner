import './App.css';
import Textbox from './widgets/Textbox.js'
import CheckboxList from './widgets/CheckboxList.js'
import useStickyState from './widgets/useStickyState.js'
import uniqueString from 'unique-string'
import { ChromePicker } from 'react-color'
import Draggable from 'react-draggable'
import styled from 'styled-components'
import MoveIcon from './Move_icon.svg'
import { useState } from 'react'
import Schedule from './widgets/Schedule.js'

function App() {
  const [color, setColor] = useStickyState("blue", "background-color")
  const [pickerVisibility, setPickerVisibility] = useState(false)
  const [widgets, setWidgets] = useStickyState([], "widgets") 

  function add() {
    setWidgets([...widgets, uniqueString()])
  }

  function setBackground(color, event) {
    setColor(color.hex)
  }

  function togglePicker() {
    setPickerVisibility(!pickerVisibility)
  }

  return (
    <div className="App" style={{backgroundColor:color}}>
      <header className="App-header">

        <BackgroundToggle onClick={togglePicker}>Toggle background color picker</BackgroundToggle>

        <Textbox/>
        <CheckboxList/>
        <Schedule/>

        { pickerVisibility
            ? <Draggable handle=".handle">
                <Container>
                  <Handle className="handle" src={MoveIcon}/>
                  <ChromePicker className="picker" color={color} onChange={ setBackground }/>
                </Container>
              </Draggable>
            : null
        }
        
      </header>
    </div>
  );
}

const Container = styled.div ` 
  position: absolute;
`

const BackgroundToggle = styled.button ` 
  position: absolute;
  top: 0;
  left: 0;
`

const Handle = styled.img ` 
  /* display: block; */
  height: 1.2rem;
  width: 1.2rem;
  /* background-color: black; */
  position: relative;
  top: -1.2rem;
`

export default App;
