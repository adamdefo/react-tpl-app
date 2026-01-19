import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';


const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Отключаем проверку на несериализуемые данные (если нужно)
    }),
});

// Экспортируем типы для удобства
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
