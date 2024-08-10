import {
    LOGIN_REQUEST,
    LOGIN_REQUEST_SUCCESS,
    LOGIN_REQUEST_FAILED,
    GET_STUDENT_DATA,
    GET_STUDENT_DATA_SUCCESS,
    GET_STUDENT_DATA_FAILED,
    ADD_STUDENT_DATA,
    ADD_STUDENT_DATA_SUCCESS,
    ADD_STUDENT_DATA_FAILED,
    EDIT_STUDENT_DATA,
    EDIT_STUDENT_DATA_SUCCESS,
    EDIT_STUDENT_DATA_FAILED,
    DELETE_STUDENT_DATA,
    DELETE_STUDENT_DATA_SUCCESS,
    DELETE_STUDENT_DATA_FAILED,
    RESET_STUDENT_DATA,RESET_EDIT_ADD_DELETE_DATA,RESET_LOGIN_DATA
  } from '../actions/actionTypes';
  
  const initialState = {
    loading: false,
    data: null,
    error: null,
    loginSuccess:null,
    loginFailed:null,
    studentData:null,studentDataFailed:null,
    addDataSuccess:null,addDataFailed:null,
    deleteDataSuccess:null,deleteDataFailed:null,
    editDataSuccess:null,editDataFailed:null


  };
  
  const dataReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_REQUEST:
          return { ...state, loading: true,loginSuccess:null,loginFailed:null};
      case LOGIN_REQUEST_SUCCESS:
          return { loading: false, loginSuccess: action.payload, loginFailed:null };
      case LOGIN_REQUEST_FAILED:
          return { loading: false, loginSuccess:null, loginFailed: action.payload };
          case RESET_LOGIN_DATA:
            return { loading: false, loginSuccess:null, loginFailed: null };    
      case GET_STUDENT_DATA:
            return { ...state, loading: true,studentData:null,studentDataFailed:null };
      case GET_STUDENT_DATA_SUCCESS:
            return { loading: false, studentData: action.payload, studentDataFailed:null };
      case GET_STUDENT_DATA_FAILED:
            return { loading: false, studentData:null, studentDataFailed: action.payload };
            case RESET_STUDENT_DATA:
          return { loading: false,studentData:null,studentDataFailed:null };
      case ADD_STUDENT_DATA:
              return { ...state, loading: true,addDataSuccess:null,addDataFailed:null };
      case ADD_STUDENT_DATA_SUCCESS:
              return { loading: false, addDataSuccess: action.payload, addDataFailed:null };
      case ADD_STUDENT_DATA_FAILED:
          return { loading: false, addDataSuccess:null, addDataFailed: action.payload };    
        
          case EDIT_STUDENT_DATA:
                  return { ...state, loading: true,editDataSuccess:null,editDataFailed:null };
          case EDIT_STUDENT_DATA_SUCCESS:
                  return { loading: false, editDataSuccess: action.payload, editDataFailed:null };
          case EDIT_STUDENT_DATA_FAILED:
                  return { loading: false, editDataSuccess:null, editDataFailed: action.payload }; 
                  case DELETE_STUDENT_DATA:
                    return { ...state, loading: true,deleteDataSuccess:null,deleteDataFailed:null };
            case DELETE_STUDENT_DATA_SUCCESS:
                    return { loading: false, deleteDataSuccess: action.payload, deleteDataFailed:null };
            case DELETE_STUDENT_DATA_FAILED:
                    return { loading: false, deleteDataSuccess:null, deleteDataFailed: action.payload };
                    case RESET_EDIT_ADD_DELETE_DATA:
          return { loading: false,addDataSuccess:null,addDataFailed:null,editDataSuccess:null,editDataFailed:null,deleteDataSuccess:null,deleteDataFailed:null   };                       
      default:
        return state;
    }
  };
  
  export default dataReducer;
  