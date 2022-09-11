import React, { useState } from "react"
import ReactTooltip from "react-tooltip";
import MapChart from "./MapChart";
import { db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore"; 
import { useEffect } from "react";

function App() {
  const [content, setContent] = useState("");
  const [visited, setVisited] = useState([]); 
 
  useEffect(() => { 
    async function getVisited() {
      const docRef = doc(db, "users", "0u9TaqaQIjiZdOI8wejX");
      const get_visited = await getDoc(docRef);
      //console.log(get_visited.data());
      setVisited(prevVisited => 
        [...get_visited.data()['visited']]
      )
    }
    getVisited();
  }, [])

  const handleClick = async () => {    
    console.log('Saved: ' + visited);  
    // save to firebase
    const docRef = doc(db, "users", "0u9TaqaQIjiZdOI8wejX");
    await setDoc(docRef, {
      'visited': visited
    });
  };

  return (
    <div>
      <MapChart setTooltipContent={setContent} visited={visited} setVisited={setVisited} />
      <button onClick={handleClick}>
        Save
      </button>
      <p>Visited {visited.length} / 195</p>
      <ReactTooltip>{content}</ReactTooltip>
    </div>
  )
}

export default App;
