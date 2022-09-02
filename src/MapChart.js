import React, { memo, useState } from "react";
import {
    ZoomableGroup,
    ComposableMap,
    Geographies,
    Geography
} from "react-simple-maps";

const MapChart = ({ setTooltipContent }) => {
    const [clickedCountry, setClickedCountry] = useState("");
    const [active, setActive] = useState(false)

    const handleClick = (geo) => {
        setClickedCountry(geo.properties.name);
        setActive(current => !current)
    }
    return (
        <div data-tip="">
            <ComposableMap projection="geoMercator">
                <ZoomableGroup>
                    <Geographies geography="/features.json">
                        {({ geographies }) => 
                            geographies.map((geo) => {
                                const isClicked = clickedCountry === geo.properties.name && active;
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