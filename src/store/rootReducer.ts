import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  // Здесь можно добавить другие редьюсеры (например, `users`, `posts`)
});

export default rootReducer;
