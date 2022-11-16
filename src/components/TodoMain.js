import React,{useEffect ,useState}  from 'react'
import Todo from './Todo';
import AddTodo from './AddTodo';
import { Container } from "@material-ui/core";
import { call } from './/ApiServer';

export default function TodoMain() {

 const [item, setItem] = useState([]);
 const [title, setTitle ] = useState("");


 useEffect(()=>{
    //초기값 세팅
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
          return data;
      })
      setItem(checkTodoObjectData);
  }

  return (
    <Container maxWidth="md">
        <AddTodo handleSave={handleSave} title={title} setTitle={setTitle}/>
        <Todo items={item} 
              handleRemove={handleRemove} 
              handleEdit={handleEdit} 
              handleEditCall={handleEditCall}
              handleCompletedChange = {handleCompletedChange}
          />
    </Container>
  )
}
