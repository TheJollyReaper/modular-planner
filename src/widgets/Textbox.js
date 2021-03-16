import { useState } from 'react'
import uniqueString from 'unique-string'
import useStickyState from './useStickyState.js'
import styled from 'styled-components'
import Draggable from 'react-draggable'
import bucket from '.././bucket.png'
import { ChromePicker } from 'react-color'
import MoveIcon from '.././Move_icon.svg'
import palette from '.././palette.svg'

// TO DO: SWITCHES TO CHANGE COLOR OF TEXTBOX BACKGROUNDS AND TEXT

function Textbox() {
    const [items, setItems] = useStickyState([], "textboxes")

  function addItem() {
    setItems([...items, {id:uniqueString(), x:250, y:-120, text:"", background:"white", 
    textcolor:"black", backgroundPicker:false, textPicker:false}])
  }

  function removeItem(selected_item,index) {
    console.log(items[index])

    setItems(items.filter(item => item.id !== selected_item.id))

    console.log(items)
  }

  function change(data, item, index) {
    var temp = [...items]
    // temp[index].text = "cheese"
    console.log(temp)
    temp[index].x = data.x 
    temp[index].y = data.y
    console.log(temp)
    setItems(temp)

    //  setPosition([{ x: data.x, y: data.y }]);
  }

  function updateText(e, index) {
    // console.log(e)
    var temp = [...items]
    temp[index].text = e.target.value
    setItems(temp)
  }

  function togglePicker(index, type) {
    var temp = [...items]
    if (type === "background") {
      temp[index].backgroundPicker = !temp[index].backgroundPicker
    } else if (type === "text") {
      temp[index].textPicker = !temp[index].textPicker
    }
    setItems(temp)
  }

  function widgetBackground(color,index) {
    var temp = [...items]
    temp[index].background = color.hex
    setItems(temp)
  }
  
  function textColor(color,index) {
    var temp = [...items]
    temp[index].textcolor = color.hex
    setItems(temp)
  }

  return (
    <div>
        {items.map((item,index) =>
            <span>
                {/* {()=>console.log(index)} */}
                {/* <button onClick={()=>change(item,index)}>Change</button>
                <h3>{item.id}</h3> */}
                

                <Draggable 
                    handle=".handle"
                    position={{x:item.x,y:item.y}}
                    onDrag={(e, data) => change(data, item, index)}>
                        
                    <Box>
                        <Handle className="handle" src={MoveIcon}/>
                        <Bucket onClick={()=>togglePicker(index,"background")} src={bucket}/>
                        <Palette onClick={()=>togglePicker(index,"text")} src={palette}/>
                        <DeleteButton onClick={()=>removeItem(item,index)}>Delete</DeleteButton>
                        { item.backgroundPicker
                            ? 
                              <Container>
                                <ChromePicker className="picker" color={item.background} onChange={ (color)=>widgetBackground(color,index) }/>
                              </Container>
                            : null
                        }

                        { item.textPicker
                            ? 
                              <Container>
                                <ChromePicker className="picker" color={item.textcolor} onChange={ (color)=>textColor(color,index) }/>
                              </Container>
                            : null
                        }

                        {/* <button onClick={erase}>delete</button> */}
                        {/* <div>Here's my position...</div>
                        x: {item.x.toFixed(0)}, y: {item.y.toFixed(0)} */}
                        <Textarea rows={6} value={item.text} style={{backgroundColor:item.background, color:item.textcolor}}
                        onChange={e=> updateText(e, index)} 
                        placeholder="Enter a new note!!"/>
                    </Box>

                </Draggable>
            </span>
          )}
        <SpawnButton onClick={addItem}>Sticky Note</SpawnButton>
    </div>
  );
}

const Container = styled.div ` 
  position: absolute;
  left: 9.8rem;
`
const Handle = styled.img ` 
  /* display: block; */
  height: 1.2rem;
  width: 1.2rem;
  /* background-color: black; */
  position: relative;
  top: .25rem;
  left: -5.3rem;
`

const Bucket = styled.img ` 
  position: absolute;
  height: 1rem;
  width: 1rem;
  top: .7rem;
  left: 3rem;
  cursor: pointer;
`

const Palette = styled.img ` 
  position: absolute;
  height: 1rem;
  width: 1rem;
  top: .7rem;
  left: 4.25rem;
  cursor: pointer;
`

const SpawnButton = styled.button ` 
  height: 3rem;
  width: 3rem;
  background-color: yellow;
  position: absolute;
  top: 15rem;
  left: 0;
  
  &:hover {
    background-color: rgb(220,220,0);
  }
`

const DeleteButton = styled.button ` 
    position: absolute;
    top: 14px;
    left: 0px;
`

const Textarea = styled.textarea ` 
    position: relative;
    width: 100%;
    height: 100%;
`

const Box = styled.div `
    position: absolute;
    cursor: move;
    color: black;
    /* max-width: 215px; */
    /* border-radius: 5px; */
    /* padding: .5em; */
    margin: none;
    /* user-select: none; */
    /* background-color: white; */
`

export default Textbox