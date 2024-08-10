import axios from 'axios';
import {
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  LOGIN_REQUEST,
  LOGIN_REQUEST_SUCCESS,LOGIN_REQUEST_FAILED, GET_STUDENT_DATA, GET_STUDENT_DATA_SUCCESS, EDIT_STUDENT_DATA, EDIT_STUDENT_DATA_SUCCESS, EDIT_STUDENT_DATA_FAILED, DELETE_STUDENT_DATA, DELETE_STUDENT_DATA_SUCCESS, DELETE_STUDENT_DATA_FAILED, ADD_STUDENT_DATA, ADD_STUDENT_DATA_SUCCESS, ADD_STUDENT_DATA_FAILED, RESET_EDIT_ADD_DELETE_DATA, RESET_STUDENT_DATA, RESET_LOGIN_DATA
} from './actionTypes';


export const fetchDataRequest = () => ({ type: FETCH_DATA_REQUEST });
export const fetchDataSuccess = (data) => ({ type: FETCH_DATA_SUCCESS, payload: data });
export const fetchDataFailure = (error) => ({ type: FETCH_DATA_FAILURE, payload: error });
export const loginRequest=()=>({ type: LOGIN_REQUEST })
export const loginRequestSuccess=(data)=>({type:LOGIN_REQUEST_SUCCESS,payload:data})
export const loginRequestFailed=(error)=>({type:LOGIN_REQUEST_FAILED,payload:error})

export const getStudentData=()=>({type:GET_STUDENT_DATA})
export const getStudentDataSuccess=(data)=>({type:GET_STUDENT_DATA_SUCCESS,payload:data})
export const getStudentDataFailed=(error)=>({type:GET_STUDENT_DATA_SUCCESS,payload:error})

export const addStudentData=()=>({type:ADD_STUDENT_DATA})
export const addStudentDataSuccess=(data)=>({type:ADD_STUDENT_DATA_SUCCESS,payload:data})
export const addStudentDataFailed=(error)=>({type:ADD_STUDENT_DATA_FAILED,payload:error})

export const editStudentData=()=>({type:EDIT_STUDENT_DATA})
export const editStudentDataSuccess=(data)=>({type:EDIT_STUDENT_DATA_SUCCESS,payload:data})
export const editStudentDataFailed=(error)=>({type:EDIT_STUDENT_DATA_FAILED,payload:error})

export const deleteStudentData=()=>({type:DELETE_STUDENT_DATA})
export const deleteStudentDataSuccess=(data)=>({type:DELETE_STUDENT_DATA_SUCCESS,payload:data})
export const deleteStudentDataFailed=(error)=>({type:DELETE_STUDENT_DATA_FAILED,payload:error})

export const resetStudentData=()=>({type:RESET_STUDENT_DATA})
export const resetAddEditDeleteData=()=>({type:RESET_EDIT_ADD_DELETE_DATA})
export const resetLoginData=()=>({type:RESET_LOGIN_DATA})

export const login = (username, password) => async (dispatch) => {
  dispatch(loginRequest());

  try {
    const response = await axios.post('http://localhost:5000/auth/login', {
      username,
      password,
    });
    localStorage.setItem('jwtToken', response.data.token);
    dispatch(loginRequestSuccess(response));
  } catch (error) {
    const { response, message } = error;

    if (response) {
      const { data } = response;
      dispatch(loginRequestFailed(data.error));
    } else if (message) {
      dispatch(loginRequestFailed(message));
    }
    
  }
};

export const getStudent = () => async (dispatch) => {
  dispatch(getStudentData());
  const token = localStorage.getItem('jwtToken');
  try {
    const response = await axios.get('http://localhost:5000/students/all',{
      headers: {
        'Authorization': `Bearer ${token}`, // Add the JWT token to headers
        'Content-Type': 'application/json', // Specify content type
      }
    });

    dispatch(getStudentDataSuccess(response.data));
  } catch (error) {
    const { response, message } = error;

    if (response) {
      
      const { data } = response;
      dispatch(getStudentDataFailed(data.error));
    } else if (message) {
      
      dispatch(getStudentDataFailed(message));
    }
   
  }
};

export const addStudent = (data) => async (dispatch) => {

  dispatch(addStudentData());
  const token = localStorage.getItem('jwtToken');
  try {
    const response = await axios.post('http://localhost:5000/students/add',data,{
      headers: {
        'Authorization': `Bearer ${token}`, // Add the JWT token to headers
        'Content-Type': 'application/json', // Specify content type
      }
    });
    dispatch(addStudentDataSuccess(response.data));
  } catch (error) {
    const { response,message} = error;
    if (response) {
      
      const { data,message} = response;
      
      dispatch(addStudentDataFailed(data));
    }
    else if (message) {
      
      dispatch(addStudentDataFailed(message));
    }
  }
};

export const editStudent = (data) => async (dispatch) => {
  dispatch(editStudentData());
  const token = localStorage.getItem('jwtToken');
  try {
    const response = await axios.put(`http://localhost:5000/students/update/${data.id}`,data,{
      headers: {
        'Authorization': `Bearer ${token}`, // Add the JWT token to headers
        'Content-Type': 'application/json', // Specify content type
      }
    });

    dispatch(editStudentDataSuccess(response.data));
  } catch (error) {
    const { response,message} = error;
    if (response) {
      
      const { data} = response;
      
      dispatch(editStudentDataFailed(data));
    }
    else if (message) {
      
      dispatch(editStudentDataFailed(message));
    }
  }
};

export const deleteStudent = (data) => async (dispatch) => {
  dispatch(editStudentData());
  const token = localStorage.getItem('jwtToken');
  try {
    const response = await axios.delete(`http://localhost:5000/students/delete/${data.id}`,{
      headers: {
        'Authorization': `Bearer ${token}`, // Add the JWT token to headers
        'Content-Type': 'application/json', // Specify content type
      }
    });

    dispatch(deleteStudentDataSuccess(response.data));
  } catch (error) {
    const { response,message} = error;
    if (response) {
      
      const { data} = response;
      
      dispatch(deleteStudentDataFailed(data));
    }
    else if (message) {
      
      dispatch(deleteStudentDataFailed(message));
    }
  }
};




