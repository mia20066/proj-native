

import { configureStore } from '@reduxjs/toolkit';
import { foodsReducer } from '../features/food/foodsSlice';
import { commentsReducer } from '../features/comments/commentsSlice';
import { productsReducer } from '../features/products/productsSlice';
import { promotionsReducer } from '../features/promotions/promotionsSlice';
import { favoritesReducer } from '../features/favorites/favoritesSlice';
import {
    persistStore,
    persistCombineReducers,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const config = {
    key: 'root',
    storage: AsyncStorage,
    debug: true
};

export const store = configureStore({
    reducer: persistCombineReducers(config, {
        foods: foodsReducer,
        comments: commentsReducer,
        products: productsReducer,
        promotions: promotionsReducer,
        favorites: favoritesReducer
    }),
          //middleware property it equale to a function that will ignore several types of actions redux prersist will dispatch to the store  this action is recomanded
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER
                ]
            }
        })
});

export const persistor = persistStore(store); // this enable the store to be persisted


  
