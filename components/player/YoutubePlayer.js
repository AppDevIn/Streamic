import React, { useEffect, useState, useRef} from 'react';
import Youtube from 'react-youtube';
import styles from '../../styles/player.module.css';

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
        setAuthor(event.target.getVideoData().author);
    }


    const loopy = () => {
        const time_total = convert_to_mins_and_secs(player.getDuration(), 0);
        const current_time = convert_to_mins_and_secs(player.getCurrentTime() - 1, 0);
        const width = (player.getCurrentTime() / player.getDuration()) * 100 + "%";
        setBarwidth(width);
        setTimeLine(current_time + " / " + time_total);
        setTimeout(loopy, 1000);
    }
    
    const convert_to_mins_and_secs = (seconds, minus1) => {
        var mins = (seconds >= 60) ? Math.floor(seconds / 60) : 0;
        var secs = (seconds % 60 != 0) ? Math.round(seconds % 60) : 0;
        var secs = (minus1 == true) ? (secs - 1) : secs; //Youtube always displays 1 sec less than its duration time!!! Then we have to set minus1 flag to true for converting player.getDuration()
        var time = mins + ":" + ((secs < 10) ? "0" + secs : secs);
        return time;
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

    return <div className={styles.left}>
        <Youtube className={styles.ytplayer} id='player' videoId='8toBW1MJE0I' opts={opts} onReady={onPlayerReady} ></Youtube>
        <div onClick={loopy} id={styles.title}>{title}</div>
        <div id={styles.author}>{author}</div>

        <div ref={progress} onClick={seek} id={styles.progress}>
            <div id={styles.bar} style={{width : barWidth}}></div>
        </div>

        <div className='mt-2'>
            <button onClick={play} id={styles.play} type="button" className="btn btn-default">
                <span className="glyphicon glyphicon-play"></span>
            </button>
            <button onClick={pause} id={styles.pause} type="button" className="ml-2 btn btn-default">
                <span className="glyphicon glyphicon-pause"></span>
            </button>

            <span id={styles.timeline}>{timeLine}</span>
        </div>
    </div>
}

export default YoutubePlayer;