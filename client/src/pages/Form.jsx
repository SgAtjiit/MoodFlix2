
import React, { useState } from 'react'
import genAI from '../utils/gemini';
import { useNavigate } from 'react-router-dom';

const Form = () => {
  const [formData, setFormData] = useState('');
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(e.target.value);
  }

  const cleanText = (text) => {
    return text
      .split('\n')
      .filter(line => /^\d+\.\s/.test(line))  
      .map(line => line.replace(/^\d+\.\s*/, '').trim()); 
  };

  const handleSubmit = async () => {
    if (!formData.trim()) {
      alert('Enter mood. Without that I cannot help you');
      return;
    }
    
    setLoading(true);
    
    const prompt = `I'm feeling ${formData}. Suggest 5 songs that match this mood. Just give me only the exact song names in a clean numbered list (no artist, no explanation). Format strictly like:
1. Song Name One
2. Song Name Two
3. Song Name Three
...and so on.
Make sure the song names are easily searchable on Spotify.`;

    console.log('Have some patience!');
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const res = await (await model.generateContent([prompt])).response;
      const text = await res.text();
      const songs = cleanText(text);
      console.log(songs);
      setSongs(songs);
      navigate('/choices', {
        state: {
          songs: songs
        }
      })
    } catch (error) {
      alert(`Error: ${error}`);
      console.log('An error occurred', error);
    } finally {
      setLoading(false);
    }
    console.log('I completed my work!');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            MoodFlix
          </h1>
          <p className="text-gray-400 text-lg">
            Tell us your mood, we'll find your music
          </p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 shadow-xl">
          <div className="space-y-6">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                How are you feeling today?
              </label>
              <input
                type="text"
                value={formData}
                onChange={handleChange}
                placeholder="Happy, sad, energetic, calm..."
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                disabled={loading}
              />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading || !formData.trim()}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Finding your songs...</span>
                </>
              ) : (
                <>
                  <span>Get My Playlist</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-700">
            <p className="text-xs text-gray-500 mb-3">Try these moods:</p>
            <div className="flex flex-wrap gap-2">
              {['Happy', 'Sad', 'Energetic', 'Relaxed', 'Romantic', 'Nostalgic'].map((mood) => (
                <button
                  key={mood}
                  onClick={() => setFormData(mood)}
                  disabled={loading}
                  className="px-3 py-1 text-xs bg-gray-700/50 text-gray-300 rounded-full hover:bg-purple-500/20 hover:text-purple-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {mood}
                </button>
              ))}
            </div>
          </div>
        </div>

        
      </div>
    </div>
  )
}

export default Form