import { useState } from 'react'
import uniqueString from 'unique-string'
import useStickyState from './useStickyState.js'
import styled from 'styled-components'
import Draggable from 'react-draggable'

function Textbox() {
    const [items, setItems] = useStickyState([], "textboxes")

  function addItem() {
    setItems([...items, {id:uniqueString(), x:250, y:-120, text:""}])
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

  return (
    <div>
        {items.map((item,index) =>
            <span>
                {/* {()=>console.log(index)} */}
                {/* <button onClick={()=>change(item,index)}>Change</button>
                <h3>{item.id}</h3> */}
                

                <Draggable 
                    position={{x:item.x,y:item.y}}
                    onDrag={(e, data) => change(data, item, index)}>
                        
                    <Box>
                        <DeleteButton onClick={()=>removeItem(item,index)}>Delete</DeleteButton>
                        {/* <button onClick={erase}>delete</button> */}
                        {/* <div>Here's my position...</div>
                        x: {item.x.toFixed(0)}, y: {item.y.toFixed(0)} */}
                        <Textarea rows={6} value={item.text} onChange={e=> updateText(e, index)} 
                        placeholder="Enter a new note!!"/>
                    </Box>

                </Draggable>
            </span>
          )}
        <SpawnButton onClick={addItem}>Sticky Note</SpawnButton>
    </div>
  );
}

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
    top: -23px;
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
    max-width: 215px;
    border-radius: 5px;
    padding: .5em;
    margin: none;
    /* user-select: none; */
    background-color: white;
`

export default Textbox