import React , { useState } from 'react'
import {Paper,
        List, 
        ListItem, 
        ListItemText, 
        InputBase, 
        Checkbox,
        ListItemSecondaryAction,
        IconButton
} from '@material-ui/core'
import { DeleteOutlined } from '@material-ui/icons'
import RootRef from "@material-ui/core/RootRef";
import {Droppable, Draggable } from "react-beautiful-dnd";
import '../css/Todo.css';

export default function Todo({items, handleRemove, handleEdit, handleEditCall,handleCompletedChange}) {
  const [readOnly, setReadOnly ] = useState(true);
  
  const handleClickReadOnly = () => {
    setReadOnly(false);
  }
  const handleEnterReadOnly = (id,e) =>{
    if (e.key === "Enter") {
        setReadOnly(true);
        handleEditCall(id);
    }
  }
  const handleBlur = (id) => {
    handleEditCall(id);
  }


const getItemStyle = (isDragging, draggableStyle,done) => ({
    // styles we need to apply on draggables
    ...draggableStyle,
  
    ...(isDragging && {
      background: "rgb(235,235,235)"
    }),
    
    ...(done && {
      textDecoration: "line-through"
    })
  });
  
  const getListStyle = (isDraggingOver) => ({
    //background: isDraggingOver ? 'lightblue' : 'lightgrey',
  });

  if (items.length > 0){
    return (
      <Paper style={{margin : 16}}>
        <Droppable droppableId="droppable">
            {(provided, snapshot) => (
            <RootRef rootRef={provided.innerRef}>
                <List style={getListStyle(snapshot.isDraggingOver)}>
                  {items.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) => (
                      <ListItem key={item.id} 
                      ContainerComponent="li"
                      ContainerProps={{ ref: provided.innerRef }}
                      className={item.done ? 'line-through' : 'undefied'}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style,
                        item.done
                      )}
                          >
                          <Checkbox 
                              checked={item.done} 
                              onChange={() => handleCompletedChange(item.id)}
                              
                          />
                          <ListItemText>
                              <InputBase
                                  inputProps={{
                                      "aria-label" : "naked",
                                      readOnly : readOnly
                                  }}
                                  type="text"
                                  id={String(item.id)}
                                  name={String(item.id)}
                                  value={item.title}
                                  multiline={true}
                                  fullWidth={true}
                                  onClick={handleClickReadOnly}
                                  onBlur ={(e) => handleBlur(item.id)}
                                  onKeyPress={(e) => handleEnterReadOnly(item.id, e)}
                                  onChange={(e) => handleEdit(item.id,e)}
                              >
                              </InputBase>
                          </ListItemText>

                          <ListItemSecondaryAction>
                              <IconButton 
                                  aria-label="Delete Todo"
                                  onClick={()=>{handleRemove(item.id)}}>
                                  <DeleteOutlined/>
                              </IconButton>
                          </ListItemSecondaryAction>
                      </ListItem>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </List>
            </RootRef>    
           )}
        </Droppable>
      </Paper>
    )
 }else {
    return (
        <div>
            <p>등록된 Todo가 없습니다.</p>
        </div>
    )
 }
}
