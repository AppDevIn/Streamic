import React, { useEffect, useState, useRef, useContext} from 'react';
import ReactPlayer from 'react-player/lazy'

function Player() {
    const [url, setUrl] = useState("https://www.youtube.com/watch?v=jXQg_1NvF4U")
    const [playing, setPlaying] = useState(true)
    const [isFullScreen, setFullScreen] = useState(false)

    
    return <ReactPlayer
        url = {url}
        config = {{
            youtube: {
            playerVars: { showinfo: 0,
            controls: 0, disablekb: 0, modestbranding: 0, rel: 0 }}
            }}
        />
}

export default Player;