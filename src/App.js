import React, { useState } from "react"
import ReactTooltip from "react-tooltip";
import MapChart from "./MapChart";
import { db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore"; 
import { useEffect } from "react";

// TODO: Make save button look good
// TODO: Add authentication and login / register page
// TODO: Zooming out more
// TODO: add menu bar (visited countries at bottom)

function App() {
  const [content, setContent] = useState("");
  const [visited, setVisited] = useState([]); 
 
  useEffect(() => { 
    async function getVisited() {
      const docRef = doc(db, "users", "hKDhmzpTZrJyDJaCat2s");
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
    const docRef = doc(db, "users", "hKDhmzpTZrJyDJaCat2s");
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
      <ReactTooltip>{content}</ReactTooltip>
    </div>
  )
}

export default App;
