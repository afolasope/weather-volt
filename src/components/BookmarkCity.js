import React from 'react';
import { MdOutlineBookmark } from 'react-icons/md';
import { useCitiesContext } from '../context/cities_context';

const BookmarkCity = ({ isFave, id }) => {
  const { addToFavlist, fav_cities, removeFromFavlist } = useCitiesContext();

  const handleBookmark = (id) => {
    const check = fav_cities.find((item) => item.id === id);
    if (!check) {
      addToFavlist(id);
    } else {
      removeFromFavlist(id);
    }
  };

  return (
    <div onClick={() => handleBookmark(id)}>
      <MdOutlineBookmark
        className={isFave ? 'btn-icon favorite' : 'btn-icon'}
      />
    </div>
  );
};

export default BookmarkCity;
