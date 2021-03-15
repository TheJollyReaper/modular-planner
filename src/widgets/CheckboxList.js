import { useState } from 'react'
import uniqueString from 'unique-string'
import useStickyState from './useStickyState.js'
import styled from 'styled-components'
import Draggable from 'react-draggable'

function CheckboxList() {
    const [items, setItems] = useStickyState([], "checklists")

  function addItem() {
    setItems([...items, {id:uniqueString(), x:250, y:-120, title:"", add:"", list_items:[]}])
  }

  function removeItem(selected_item,index) {
    // console.log(items[index])

    setItems(items.filter(item => item.id !== selected_item.id))

    // console.log(items)
  }

  function change(data, item, index) {
    var temp = [...items]
    // temp[index].text = "cheese"
    // console.log(temp)
    temp[index].x = data.x 
    temp[index].y = data.y
    // console.log(temp)
    setItems(temp)

    //  setPosition([{ x: data.x, y: data.y }]);
  }

  function updateText(e, index) {
    // console.log(e)
    var temp = [...items]
    temp[index].add = e.target.value
    setItems(temp)
  }

  function updateTitle(e,index) {
    var temp = [...items]
    temp[index].title = e.target.value
    setItems(temp)
  }

  function keyPressed(e,index){
    if(e.key==='Enter') {
      var temp = [...items]
      console.log(index)
      console.log(temp[index])
      temp[index]["list_items"].push({name:temp[index].add, status:false})
      temp[index].add = ""
      setItems(temp)
    } 
  }

  function addListItem() {
    // var temp = [...items]
    // temp.concat({})
  }

  function toggleListItem(list_item, i, index) {
    var temp = [...items]
    temp[index]["list_items"][i].status = !temp[index]["list_items"][i].status
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

                        <div>
                        
                        {item && item.list_items && console.log(item.list_items)}

                        <Title value={item.title} placeholder="enter a title!" onChange={e=> updateTitle(e, index)}/>
                        <ItemEnter type="text" value={item.add} onChange={e=>updateText(e,index)} 
                        onKeyPress={e=>keyPressed(e,index)} placeholder="enter list item"/>
                        {item && item.list_items && item.list_items.map((list_item,i)=>
                            <Checklist>
                              <label class="container">{list_item.name}
                                {console.log(list_item.name)}
                                <input type="checkbox" checked={list_item.status} onClick={()=>toggleListItem(list_item,i,index)}/>
                                <span class="checkmark"></span>
                              </label>


                            </Checklist>

                            )}
                        </div>
                    </Box>
                </Draggable>
            </span>
          )}
        <SpawnButton onClick={addItem}>Check List</SpawnButton>
    </div>
  );
}

const Title = styled.input ` 
  text-align: center;
  border: none;
  display: inline;
  font-family: inherit;
  font-size: 1rem;
  padding: none;
  width: 98%;
  position: relative;
  top: .5rem;
`

const ItemEnter = styled.input ` 
  position: absolute;
  top: 0rem;
  left: 0;
  width: 95%;
`

const Checklist = styled.li ` 
  list-style: none;
  position: relative;
  top: .45rem;
  font-size: .8rem;
`

const SpawnButton = styled.button ` 
  height: 3rem;
  width: 3rem;
  background-color: red;
  position: absolute;
  top: 11.5rem;
  left: 0;
  
  &:hover {
    background-color: rgb(220,0,0);
  }
`

const DeleteButton = styled.button ` 
    position: absolute;
    top: -23px;
    left: 0px;
`

const Box = styled.div `
  text-align: left;
  min-width: 5rem;
  min-height: 3rem;
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

export default CheckboxList