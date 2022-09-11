import React, { memo, useState } from "react";
import {
    ZoomableGroup,
    ComposableMap,
    Geographies,
    Geography
} from "react-simple-maps";



const MapChart = ({ setTooltipContent }) => {
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
        
    
    }
    return (
        <div data-tip="">
            <ComposableMap projection="geoMercator">
                <ZoomableGroup>
                    <Geographies geography="/features.json">
                        {({ geographies }) => 
                            geographies.map((geo) => {
                                const isClicked = visited.includes(geo.properties.name);
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
                                    fill={isClicked ? 
                                        (geo.properties.continent === 'AS' ? "#8ED2CD" :
                                        geo.properties.continent === 'AF' ? "#C2ED98" :
                                        geo.properties.continent === 'NA' ? "#F59B7C"  :
                                        geo.properties.continent === 'SA' ? "#FED776"  :
                                        geo.properties.continent === 'EU' ? "#F1F487"  :
                                        "#98A9D7") : "#D3D3D3"
                                    }

                                    stroke="#232323"
                                    strokeWidth="0.3"
                                    className="focus:outline-none"
                                    
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