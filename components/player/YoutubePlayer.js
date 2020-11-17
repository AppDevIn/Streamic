import React, { useEffect, useState, useRef} from 'react';
import Youtube from 'react-youtube';
import functions from '../../utils/player';

function YoutubePlayer() {
    const [player, setPlayer] = useState(null);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [barWidth, setBarwidth] = useState("0px");
    const [timeLine, setTimeLine] = useState("");
    
    const progress = useRef();

    // call loopy once player is initialised
    useEffect(() => {
        if (player != null){
            loopy();
        }
    },[player]);


    const opts = {
        height: '600',
        width: '1000'
        // ,
        // playerVars: {
        //     'controls': 0,
        //     'disablekb': 1,
        //     'modestbranding': 1,
        //     'rel': 0,
        //     'showinfo': 0
        // }
    };

    const onPlayerReady = (event) => {
        event.target.playVideo();
        event.target.mute();
        setPlayer(event.target);
        setTitle(event.target.getVideoData().title);
        functions.getVideoTitle(event.target.getVideoData().video_id)
        .then(result => {
            setAuthor(result);
        });
    }


    const loopy = () => {
        const time_total = convertTime(player.getDuration());
        const current_time = convertTime(player.getCurrentTime());
        const width = (player.getCurrentTime() / player.getDuration()) * 100 + "%";
        setBarwidth(width);
        setTimeLine(current_time + " / " + time_total);
        setTimeout(loopy, 1000);
    }

    function convertTime(value) {
        const mins = Math.floor(value / 60);
        const secs = value % 60 != 0 ? Math.floor(value % 60) : 0
        return mins + ":" + ((secs < 10) ? "0" + secs : secs)
    }

    const play = () => {
        player.playVideo();
    }

    const pause = () => {
        player.pauseVideo();
    }
    
    const seek = (event) => {
        const x = event.pageX - progress.current.getBoundingClientRect().left;
        const bw = progress.current.scrollWidth;
        const tl = x / bw * player.getDuration();
        setBarwidth(x);
        player.seekTo(tl, true);
    }

    return <div className="left">
        <Youtube className="ytplayer" id='player' videoId='GTcM3qCeup0' opts={opts} onReady={onPlayerReady} ></Youtube>
        <div onClick={loopy} id="title">{title}</div>
        <div id="author">{author}</div>

        <div ref={progress} onClick={seek} id="progress">
            <div id="bar" style={{width : barWidth}}></div>
        </div>

        <div className='mt-2'>
            <button onClick={play} id="play" type="button" className="btn btn-default">
                <span className="glyphicon glyphicon-play"></span>
            </button>
            <button onClick={pause} id="pause" type="button" className="ml-2 btn btn-default">
                <span className="glyphicon glyphicon-pause"></span>
            </button>

            <span id="timeline">{timeLine}</span>
        </div>
    </div>
}

export default YoutubePlayer;