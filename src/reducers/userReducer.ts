import
{ GET_USERS,
  ADD_USER,
  DELETE_USER,
  UPDATE_USER
} from '../actions/userAction';
import { User } from '../interfaces/user';

interface Action {
  type:string,
  payload: User | null
}

const initialStateUser = {
  listaUser:[] as User[],
}

export function userReducer(state = initialStateUser, action:Action) {
    
  switch (action.type) {
      case GET_USERS:
        return {
             listaUser:action.payload,   
        }
        
      case ADD_USER:
        return {
            listaUser:[...state.listaUser, action.payload]
        }
      case DELETE_USER:
        return {        
            listaUser:state.listaUser
                 .filter((item:User) => item.id !== action.payload?.id)
        }   
      case UPDATE_USER:
        const newArray = state.listaUser
        .filter((item:User) => item.id !== action.payload?.id)
     
        return {
          listaUser:[...newArray, action.payload]
        }
          
      default:
        return state
    }
}