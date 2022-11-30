import React,{useEffect ,useState}  from 'react'
import Todo from './Todo';
import AddTodo from './AddTodo';
import { Container } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { call } from './/ApiServer';
import { DragDropContext} from "react-beautiful-dnd";
import { delUserToken } from '../reducer/authSlice'; 
export default function TodoMain() {

 const [item, setItem] = useState([]);
 const [title, setTitle ] = useState("");

 const dispatch = useDispatch();
 useEffect(()=>{
    //초기값 세팅
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    if (accessToken === null) {
      dispatch(delUserToken());
    }
    call("/todo/select","GET",null).then((response) =>{
      setItem(response.data);
    })
  },[]);

  const handleSave = (title,e) => {
    e.preventDefault();

    let newTodoData = {
      title : title,
      done : false
    }
    
    call("/todo/create", "POST", newTodoData).then((response)=>{
      setItem(response.data);
      setTitle("");
    });
  }

  const handleRemove = (id) => {
    
    let deleteTodoData = {
      id : id
    }

    call("/todo/delete", "DELETE", deleteTodoData).then((response)=>{
      let delTodoData = item.filter((data) => data.id !==id)
      setItem(delTodoData);
      setTitle("");
    });
  }

  const handleEdit = (id,e) => {
    e.preventDefault();
    
    let updateTodoData = item.map((data) => {
      if(data.id === id){
        data.title=e.target.value
      }
      return data;
    })

    setItem(updateTodoData);
  }

  const handleEditCall = (id) => {
    let updateTodoObjectData = item.find((data) => data.id === id);
    call("/todo/update", "PUT", updateTodoObjectData).then((response)=>{
      setItem(response.data);
      setTitle("");
    });
  }

  const handleCompletedChange = (id) => {
      let checkTodoObjectData = item.map((data) => {
          if (data.id === id){
            data.done = !data.done
          }
          call("/todo/update", "PUT", data).then((response)=>{});
          return data;
      })
      setItem(checkTodoObjectData);
  }

  const handleEnd = (result) => {
    if (!result.destination) {
      return;
    }
    setItem(reorder(item, result.source.index,result.destination.index));
  }
    
  const reorder = (list, startIndex, endIndex) => {
    const result = list;
    const [removed] = result.splice(startIndex, 1);
    let changePosition = {
      id : removed.id,
      position : endIndex
    }
    call("/todo/position", "PUT", changePosition).then((response)=>{});
    result.splice(endIndex, 0, removed);
    return result;
  };
  
  return (
    <Container maxWidth="md">
        <AddTodo handleSave={handleSave} title={title} setTitle={setTitle}/>
        <DragDropContext onDragEnd={handleEnd}>
          <Todo items={item} 
                handleRemove={handleRemove} 
                handleEdit={handleEdit} 
                handleEditCall={handleEditCall}
                handleCompletedChange = {handleCompletedChange}
            />
        </DragDropContext>
    </Container>
  )
}
