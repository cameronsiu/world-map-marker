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
        //clickedCountries[geo.properties.name] = true;
        if (visited.includes(geo.properties.name)) {
            const index = visited.getindexOf(geo.properties.name);
            if (index > 1) {
                
            }
        }
        setVisited(prevClicked => {
            prevClicked.push(geo.properties.name);
        })
        
    }
    return (
        <div data-tip="">
            <ComposableMap projection="geoMercator">
                <ZoomableGroup>
                    <Geographies geography="/features.json">
                        {({ geographies }) => 
                            geographies.map((geo) => {
                                const isClicked = clickedCountries[geo.properties.name];
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