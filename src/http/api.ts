import axios from 'axios';
import
{ GET_USERS,
  ADD_USER,
  DELETE_USER,
  UPDATE_USER,
} from '../actions/userAction'
import { User } from '../interfaces/user';
import alerSweet from 'sweetalert2';

export const getUsers = () => async (dispatch:any) =>{
    axios
    .get(`https://fakestoreapi.com/users`)
    .then((response) => {
      const data = response.data;
      dispatch({
        type: GET_USERS,
        payload: data
      });
    })
    .catch((error) => {
      console.log(error);
    });
} 

export const postUser = (user:User) => async (dispatch:any) =>{
  axios
  .post(`https://fakestoreapi.com/users`, user)
  .then((response) => {
    const data = response.data;
    user["id"] = data
    dispatch({
      type: ADD_USER,
      payload: user
    });
  })
  .catch((error) => {
    console.log(error);
  });
} 

export const deleteUser = (id:number) => async (dispatch:any) =>{
  axios
  .delete(`https://fakestoreapi.com/users/${id}`)
  .then(() => {
    dispatch({
      type: DELETE_USER,
      payload: {id}
    });
  })
  .catch((error) => {
    console.log(error);
  });
} 


export const getUser =  (id:number) => async () => {
 return  (await axios.get(`https://fakestoreapi.com/users/${id}`)).data
} 


export const updateUser = (user:User) => async(dispatch:any) => {
  axios.put(`https://fakestoreapi.com/users`, user)
  .then((response) => {
    const data = response.data;
    if(data.msg === "updated"){
      dispatch({
        type: UPDATE_USER,
        payload: user
      });
      alerSweet.fire("Registro atualizado!",'', 'success')
    }  
  })
  .catch((error) => {
    console.log(error);
  });
}