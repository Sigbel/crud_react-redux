import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState} from 'react';
import {
  getUsers, 
  postUser,
  deleteUser,
  getUser,
  updateUser
  
} from './http/api';
import { connect } from "react-redux"
import { User } from './interfaces/user';


function App(
 {getUsers, 
  stateUser,
  postUser,
  deleteUser,
  getUser,
  updateUser}:any) {

  const [isCreate, setIsCreate ] = useState(true)
  const [{id, username, email, phone}, setState] = useState({
    id:'',
    username:'',
    email:'',
    phone:''
  })

  useEffect(() => {
    getUsers();
  }, [getUsers]);

 function addUser(e:React.ChangeEvent<HTMLFormElement>){
   e.preventDefault();
   if(isCreate){
    postUser({username, email, phone})
   }else{
    updateUser({id, username, email, phone})  
   }
   setIsCreate(true)
   clearInputs()
 }

 function handleInputChange(name:string, value:string){
  setState({
     id,
     username,
     email,
     phone,
     [name]:value
  }) 
 }

 function removeUser(id:string){
   if(window.confirm("Deseja excluir o resgistro?")){
     deleteUser(id)
   }
 }

 function clearInputs(){
  setState({
    id:"",
    username:"",
    email:"",
    phone:"",
 })
 }

 function getOneUser(id:string){
     getUsers(id).then((user:User)=>{
     setIsCreate(false)
     setState(user)
     console.log(user)
   })
 }

  return (
    <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
         <form onSubmit={addUser}>
            <input 
               style={{padding:12}}
               placeholder="Username"
               name="username"
               onChange={(e)=> handleInputChange("username", e.target.value)}
               value={username}
            />
              <input 
               style={{padding:12}}
               placeholder="Email"
               name="email"
               onChange={(e)=> handleInputChange("email", e.target.value)}
               value={email}
            />
              <input 
               style={{padding:12}}
               placeholder="Phone"
               name="phone"
               onChange={(e)=> handleInputChange("phone", e.target.value)}
               value={phone}
            />
            <button style={{padding:12, backgroundColor:"blue", color:"white"}}>
             {isCreate ? "Add": "Edit"} 
            </button>
         </form>
        {stateUser.listaUser.map((item:User)=>(
         <div key={item.id}>
            <p>{item.username} - {item.email} - {item.phone}</p>
            <button style={{padding:11, backgroundColor:"red", color:"white"}}
                 onClick={() => removeUser(item.id)}>
                 X
              </button>  
              <button style={{padding:11, backgroundColor:"green", color:"white"}}
                 onClick={() => getOneUser(item.id)}>
                 Edit
              </button>  
         </div>    
        ))}
    </div>
  );
}

const mapStateToProps = (state:any) => {
  return {
    stateUser: state.userReducer
  };
};

const mapDispatchToProps = {
  getUsers,
  postUser,
  deleteUser,
  getUser,
  updateUser
};

export default connect(mapStateToProps, mapDispatchToProps)(App);