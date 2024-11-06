import React, { createContext, useState } from 'react';

const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [favoriteItems, setFavoriteItems] = useState([]);

  const addFavorite = (item) => {
    setFavoriteItems(prevItems => [...prevItems, item]);
  };

  const removeFavorite = (key) => {
    setFavoriteItems(prevItems => prevItems.filter(item => item.key !== key));
  };

  const isFavorite = (key) => {
    return favoriteItems.some(item => item.key === key);
  };

  return (
    <FavoriteContext.Provider value={{ favoriteItems, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export default FavoriteContext;
