import React, { memo, useState } from "react";
import {
    ZoomableGroup,
    ComposableMap,
    Geographies,
    Geography
} from "react-simple-maps";



const MapChart = ({ setTooltipContent }) => {
<<<<<<< HEAD
    const [visited, setVisited] = useState([]);
    
    
    const handleClick = (geo) => {
        //clickedCountries[geo.properties.name] = true;
        if (visited.includes(geo.properties.name)) {
            const index = visited.getindexOf(geo.properties.name);
            if (index > 1) {
                
            }
        }
        setVisited(prevClicked => {
            prevClicked.push(geo.properties.name);
        })
        
=======
    const [clickedCountry, setClickedCountry] = useState("");
    const [active, setActive] = useState(false)
    const [visited, setVisited] = useState([]);

    const handleClick = (geo) => {
        if(visited.includes(geo.properties.name)) {
            const index = visited.indexOf(geo.properties.name)
            if (index > -1) {
                setVisited(prevVisited => {
                    return prevVisited.filter(country => country !== geo.properties.name)
                })
            }
            // visited.pop(geo.properties.name)
        } else {
            setVisited(prevVisited => 
                [...prevVisited, geo.properties.name]
            )
            console.log(visited)
        }
        
    
>>>>>>> 46d219848fe653f6f2634056fc075d801f7d218b
    }
    return (
        <div data-tip="">
            <ComposableMap projection="geoMercator">
                <ZoomableGroup>
                    <Geographies geography="/features.json">
                        {({ geographies }) => 
                            geographies.map((geo) => {
<<<<<<< HEAD
                                const isClicked = clickedCountries[geo.properties.name];
=======
                                const isClicked = visited.includes(geo.properties.name);
>>>>>>> 46d219848fe653f6f2634056fc075d801f7d218b
                                return (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    onMouseEnter={() => {
                                        setTooltipContent(`${geo.properties.name}`);
                                    }}
                                    onMouseLeave={() => {
                                        setTooltipContent("")
                                    }}
                                    fill={isClicked ? "#11ad21" : "#D6D6DA"}
                                    
                                    onClick = {() => handleClick(geo)}

                                    style={{
                                        default: {
                                            outline: "none"
                                        },
                                        hover: {
                                            fill: "grey",
                                            outline: "none"
                                        },
                                        pressed: {
                                            outline: "none"
                                        }
                                    }}
                                />
                            )})
                        }
                    </Geographies>
                </ZoomableGroup>
            </ComposableMap>
        </div>
    )
};

export default memo(MapChart);