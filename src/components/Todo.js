import React , { useState } from 'react'
import {
        Paper, 
        List, 
        ListItem, 
        ListItemText, 
        InputBase, 
        Checkbox,
        ListItemSecondaryAction,
        IconButton
} from '@material-ui/core'
import { DeleteOutlined } from '@material-ui/icons'

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

  if (items.length > 0){
    return (
        <Paper style={{margin : 16}}>
            <List>
                {items.map((item, index) => (
                    <ListItem key={item.id} 
                        style={{ textDecorationLine: item.done ? 'line-through' : 'none' }}>
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
                ))}
            </List>
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
