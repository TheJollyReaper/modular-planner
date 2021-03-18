import useStickyState from './useStickyState.js'
import { ChromePicker } from 'react-color'
import Draggable from 'react-draggable'
import styled from 'styled-components'
import { useState } from 'react'
import MoveIcon from '.././Move_icon.svg'
import uniqueString from 'unique-string'

function Schedule() {

    const [tables, setTables] = useStickyState([], "schedules")
    
                                            

    function addTable() {
        setTables([...tables, {times:[], mon:[], tue:[], wed:[], thu:[], fri:[], sat:[], sun:[], active_event:{},
            queued_color:"", queued_text:"", customize:false, x:250, y:-120, id:uniqueString(),
            event_templates:[{text:"",background:"white"}]}])
    }

    function removeTable(selected_table) {
        // console.log(items[index])
    
        setTables(tables.filter(table => table.id !== selected_table.id))
    
        // console.log(items)
      }

    function setEvent(e,index,i) {
        console.log(index)
        var temp = [...tables]
        temp[index]["active_event"] = temp[index]["event_templates"][i]
        setTables(temp)
    }

    function modifyCell(index,i,day) {
        var temp = [...tables]
        console.log(temp)
        console.log(index)
        console.log(i)
        console.log(temp[index])
        temp[index][day][i].text = temp[index]["active_event"]["text"]
        temp[index][day][i].background = temp[index]["active_event"]["background"]
        setTables(temp)
    }

    function addRow(index) {
        console.log(tables)
        var temp = [...tables]
        temp[index]["times"].push("")
        temp[index]["mon"].push({text:"", background:"white"})
        temp[index]["tue"].push({text:"", background:"white"})
        temp[index]["wed"].push({text:"", background:"white"})
        temp[index]["thu"].push({text:"", background:"white"})
        temp[index]["fri"].push({text:"", background:"white"})
        temp[index]["sat"].push({text:"", background:"white"})
        temp[index]["sun"].push({text:"", background:"white"})
        setTables(temp)
    }

    function addTemplate(index) {
        var temp = [...tables]
        temp[index]["event_templates"].push({text:temp[index]["queued_text"], background:temp[index]["queued_color"]})
        setTables(temp)
    }

    function updateText(e,index) {
        var temp = [...tables]
        temp[index]["queued_text"] = e.target.value
        setTables(temp)
    }

    function updateColor(color, index) {
        var temp = [...tables]
        temp[index]["queued_color"] = color.hex
        setTables(temp)
    }

    function toggleCustomization(index) {
        var temp = [...tables]
        temp[index]["customize"] = !temp[index]["customize"]
        setTables(temp)
    }

    // Change position of schedule
    function change(data, item, index) {
        var temp = [...tables]
        // temp[index].text = "cheese"
        console.log(temp)
        temp[index].x = data.x 
        temp[index].y = data.y
        console.log(temp)
        setTables(temp)
    
        //  setPosition([{ x: data.x, y: data.y }]);
      }

    function setTimeBlock(e,index,i) {
        var temp = [...tables]
        temp[index]["times"][i] = e.target.value
        setTables(temp)
    }

    return <div>
        
        {tables.map((table,index)=>
            <Draggable 
                handle=".handle"
                position={{x:table.x,y:table.y}}
                onDrag={(e, data) => change(data, table, index)}
            >
                <TimeSchedule>
                    {table.customize 
                        ?
                        <TemplateBox>
                            event templates
                            {table.event_templates.map((event,i)=>
                                <div style={{display:"inline-block"}}>
                                    <input type="radio" id={event.text} name="options" value={event.text} 
                                        placeholder="enter time" onClick={(e)=>setEvent(e,index,i)}/>
                                    <label for={event.text}>{event.text}</label>
                                </div>
                            )}
                            
                            add event
                            <input type="text" value={table.queued_text} onChange={(e)=>updateText(e,index)} placeholder="enter name"/>
                            <input type="text" value={table.queued_color} placeholder="choose color"/>
                            <Container>
                                <ChromePicker className="picker" color={table.queued_color} onChange={ (color)=>updateColor(color,index) }/>
                            </Container>
                            
                            <button onClick={()=>addTemplate(index)}>add</button>
                        </TemplateBox>
                        : null
                    }
                    

                    <Handle className="handle" src={MoveIcon}/>

                    <th>
                        Times
                        {table.times.map((time,i)=>
                            <Cell style={{backgroundColor:"white"}}><Time type="text" value={time} onChange={(e)=>setTimeBlock(e,index,i)}/></Cell>
                        )}
                    </th>
                    <th>
                        Mon
                        {table.mon.map((cell,i)=>
                            <Cell style={{backgroundColor:cell.background}} onClick={()=>modifyCell(index,i,"mon")}>{cell.text}</Cell>
                        )}
                    </th>
                    <th>
                        Tue
                        {table.tue.map((cell,i)=>
                            <Cell style={{backgroundColor:cell.background}} onClick={()=>modifyCell(index,i,"tue")}>{cell.text}</Cell>
                        )}
                    </th>
                    <th>
                        Wed
                        {table.wed.map((cell,i)=>
                            <Cell style={{backgroundColor:cell.background}} onClick={()=>modifyCell(index,i,"wed")}>{cell.text}</Cell>
                        )}
                    </th>
                    <th>
                        Thu
                        {table.thu.map((cell,i)=>
                            <Cell style={{backgroundColor:cell.background}} onClick={()=>modifyCell(index,i,"thu")}>{cell.text}</Cell>
                        )}
                    </th>
                    <th>
                        Fri
                        {table.fri.map((cell,i)=>
                            <Cell style={{backgroundColor:cell.background}} onClick={()=>modifyCell(index,i,"fri")}>{cell.text}</Cell>
                        )}
                    </th>
                    <th>
                        Sat
                        {table.sat.map((cell,i)=>
                            <Cell style={{backgroundColor:cell.background}} onClick={()=>modifyCell(index,i,"sat")}>{cell.text}</Cell>
                        )}
                    </th>
                    <th>
                        Sun
                        {table.sun.map((cell,i)=>
                            <Cell style={{backgroundColor:cell.background}} onClick={()=>modifyCell(index,i,"sun")}>{cell.text}</Cell>
                        )}
                    </th>
                    <div style={{display:"flex", flexDirection:"column"}}>
                        <button onClick={()=>addRow(index)}>add row</button>
                        <button onClick={()=>toggleCustomization(index)}>customize</button>
                        <button onClick={()=>removeTable(table)}>delete</button>
                    </div>
                    
                </TimeSchedule>
            </Draggable>
        )}
        <SpawnButton onClick={addTable}>Add Schedule</SpawnButton>
    </div>
}

const SpawnButton = styled.button ` 
  height: 3rem;
  width: 3rem;
  background-color: lightblue;
  position: absolute;
  top: 8rem;
  left: 0;
  
  &:hover {
    background-color: rgb(0,100,220);
  }
`

const Handle = styled.img ` 
  /* display: block; */
  height: 1.2rem;
  width: 1.2rem;
  /* background-color: black; */
  position: absolute;
  top: -1rem;
  left: 0rem;
`

const Container = styled.div ` 
  position: absolute;
  left: -11.5rem;
`

const TemplateBox = styled.div ` 
    display: flex;
    flex-direction: column;
    font-size: 1rem;
    text-align: left;
`

const Time = styled.input `
    background-color: inherit;
    height: 100%;
    width: 100%;
    text-align: center;
    font-size: 1rem;
`

const Cell = styled.div `
    background-color: green;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 2.5rem;
    width: 5rem;
    font-size: .9rem;
    color: black;
    /* text-align: center; */
    border: 1px solid black
`

const TimeSchedule = styled.table `
    position: absolute;
    min-height: 20rem;
    min-width: 20rem;
`

export default Schedule