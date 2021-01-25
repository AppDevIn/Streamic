import React, { useEffect, useState, useRef, useContext } from 'react';
import ReactPlayer from 'react-player/lazy'
import { ContextContainer } from '../../pages/player';


function Player() {
    const [title, setTitle] = useState("Hi")
    const [author, setAuthor] = useState("Hi2")
    const [url, setUrl] = useState("https://www.youtube.com/watch?v=xcgUm7VNIXE&list=RDxcgUm7VNIXE")
    const [playing, setPlaying] = useState(false)
    const [isFullScreen, setFullScreen] = useState(false)
    const [played, setPlayed] = useState(0)
    const [playedText, setPlayedText] = useState("")
    const [duration, setDuration] = useState(0)
    const [durationText, setDurationText] = useState("")
    const [muted, setMuted] = useState(false)
    const [barWidth, setBarwidth] = useState("0%")

    const {parent_link, socket} = useContext(ContextContainer);

    const player = useRef()
    const bar = useRef(null)

    useEffect(() => {
        if (parent_link !== "") {
            if (ReactPlayer.canPlay(parent_link)) {
                console.log(parent_link)
                setUrl(parent_link)
                setPlayed(0)
            }
        }
    }, [parent_link])

    const onPlayerReady = () => {
        setPlaying(true)
        setMuted(true)
    }

    const updateProgress = ({played, playedSeconds}) => {
        setPlayed(played)
        setBarwidth(played * 100 + "%")
        setPlayedText(convertTime(playedSeconds))
    }

    const updateDuration = (duration) => {
        setDuration(duration)
        setDurationText(convertTime(duration))
    }

    const seek = (event) => {
        const x = event.pageX - bar.current.getBoundingClientRect().left;
        const bw = bar.current.scrollWidth;
        const timeline = x / bw * duration;
        player.current.seekTo(timeline, "seconds")
    }

    const convertTime = (value) => {
        const mins = Math.floor(value / 60);
        const secs = value % 60 != 0 ? Math.floor(value % 60) : 0
        return mins + ":" + ((secs < 10) ? "0" + secs : secs)
    }

    return (
        <div className="left">
          <ReactPlayer onProgress={ (callback) => updateProgress(callback) } onDuration={ (duration) => updateDuration(duration) } onReady={ () => onPlayerReady() } muted={ muted } playing={ playing }
            ref={ player } url={ url } config={ { youtube: { playerVars: { showinfo: 0, controls: 1, disablekb: 0, modestbranding: 0, rel: 0 } } } } />
          <div id="title">
            { title }
          </div>
          <div id="author">
            { author }
          </div>
          <div ref={ bar } onClick={ seek } id="progress">
            <div id="bar" style={ { width: barWidth } }></div>
          </div>
          <div className='mt-2'>
            <button onClick={ () => setPlaying(true) } id="play" type="button" className="btn btn-default">
              <span className="glyphicon glyphicon-play"></span>
            </button>
            <button onClick={ () => setPlaying(false) } id="pause" type="button" className="ml-2 btn btn-default">
              <span className="glyphicon glyphicon-pause"></span>
            </button>
            <span id="timeline">{ playedText } / { durationText }</span>
          </div>
        </div>
    )

}

export default Player;