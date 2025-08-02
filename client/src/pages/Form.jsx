import React, { useState } from 'react'
import genAI from '../utils/gemini';
import {  useNavigate } from 'react-router-dom';
const Form = () => {
  const [formData, setFormData] = useState('');
  const [songs,setSongs] = useState([]);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData(e.target.value);
  }
  // const cleanText = (text)=>{
  //   const songs = [];
  //   let song = "";
  //   for(let i=0;i<text.length;i++){
  //     if(text[i]=='\n'){
  //       songs.push(song);
  //       song = "";
  //     }
  //     else{
  //       if(text[i-1]==" " && text[i-2]=="."){
  //         while(text[i]!='n' && i<text.length){
  //           song+=text[i];
  //           i++;
  //         }
  //       }
  //     }
  //   }
  //   return songs;
  // }
  const cleanText = (text) => {
  return text
    .split('\n')
    .filter(line => /^\d+\.\s/.test(line))  
    .map(line => line.replace(/^\d+\.\s*/, '').trim()); 
};

  const handleSubmit = async ()=>{
    if(!formData){
      alert('Enter mood. Without that I cannot help you');
      return;
    }
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
      // setGeminiData(text);
      const songs = cleanText(text);
     console.log(songs);
      setSongs(songs);
     navigate('/choices',{
      state:{
        songs:songs
      }
     })

    } catch(error){
      alert(`Error:${error}`);
      console.log('An error occured',error);
    }
    console.log('I completed my work!');
  }
  return (
    <div>
        <input type="text" placeholder='Enter your mood here ' onChange={handleChange}/>
        <button onClick={handleSubmit}>Submit</button>
        
      </div>
    
  )
}

export default Form