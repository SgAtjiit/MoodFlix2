// ChoicesCard.jsx
import React from 'react';

const ChoicesCard = ({ song }) => {
  const openSpotify = () => {
    const searchUrl = `https://open.spotify.com/search/${encodeURIComponent(song)}`;
    window.open(searchUrl, '_blank');
  };

  return (
    <div className="bg-gray-800 text-white p-4 rounded-xl shadow-md flex justify-between items-center">
      <div className="text-lg">{song}</div>
      <button
        onClick={openSpotify}
        className="bg-green-500 hover:bg-green-600 text-white py-1 px-4 rounded-lg ml-4"
      >
        Play 
      </button>
    </div>
  );
};

export default ChoicesCard;
