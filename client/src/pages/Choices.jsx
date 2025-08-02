import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import ChoicesCard from '../components/ChoicesCard';
const Choices = () => {
     const [songs,setSongs]  = useState([]);
  const location = useLocation();
  useEffect(()=>{
    let s = location.state.songs;
    setSongs(s);
  },[songs]);
  return (
    
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Songs Container */}
        {songs && songs.length > 0 ? (
          <div className="grid gap-4 md:gap-6 max-w-4xl mx-auto">
            {songs.map((song, index) => (
              <div
                key={index}
                className="transform transition-all duration-300 hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ChoicesCard song={song} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto border border-gray-700">
              <div className="text-6xl mb-4">🎵</div>
              <h3 className="text-xl font-semibold text-white mb-2">No Songs Found</h3>
              <p className="text-gray-400 mb-6">
                We couldn't find any songs for your mood. Let's try again!
              </p>
              <button 
                onClick={() => window.history.back()}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Go Back
              </button>
            </div>
          </div>
        )}
      </div>
      </div>
  )
}

export default Choices