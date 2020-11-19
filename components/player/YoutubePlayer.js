import React, { useEffect, useState, useRef, useContext} from 'react';
import Youtube from 'react-youtube';
import functions from '../../utils/room';
import {ContextContainer} from '../../pages/room';
import YoutubeCard from './youtubeCard';
import { Card, CardGroup, Image } from 'semantic-ui-react';
import io from "socket.io-client";

function YoutubePlayer({user, roomInfo}) {
    const [player, setPlayer] = useState(null);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [barWidth, setBarwidth] = useState("0px");
    const [timeLine, setTimeLine] = useState("");
    const [cardList, setCardList] = useState([]);
    const [socket, initSocket] = useState(null);
    const roomID = roomInfo.roomID;
    const videoID = roomInfo.Playing.videoID;
    
    const dummy = useRef(null);
    const progress = useRef();

    const {parent_link} = useContext(ContextContainer);

    useEffect(() => {
        if (parent_link == ""){
            functions.getTrendingVideo()
            .then(res =>{
                setCardList(res);
            })
        }else{
            functions.getRecommendations(parent_link)
            .then(res => {
                setCardList(res);
            });
        }
    }, [parent_link])

    useEffect(() => {
        if (socket == null){
            console.log("initialising socket....");
            initSocket(io());
        }

        return () => {
            socket.disconnect();
        }
    }, [])

    useEffect(() => {
        if (parent_link != "" && cardList.length != 0 && dummy != null){
            dummy.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [cardList])

    // call loopy once player is initialised
    useEffect(() => {
        if (player != null){
            loopy();
            console.log("initialising socket action....");
            socket.emit("joinRoom", {roomID, user});
            socket.emit("router", roomID);
            
            socket.on("streaming", (data) => {
                console.log(data);
                handleActions(data);
            });

            socket.on("existingUser", () => {
                var state = player.getPlayerState();
                var timeline = player.getCurrentTime();
                var isVideoChanged = false;
                const data = {state, timeline, isVideoChanged};
                socket.emit('changes', {roomID, data});
            });
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

    const handleActions = (data) => {
        if (player){
            if (data.isVideoChanged){
                player.loadVideoById(data.id);
                setTitle(data.title);
                setAuthor(data.publisher);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }else{
                switch (data.state){
                    case 1:
                        player.playVideo();
                        player.seekTo(data.timeline, true);
                        break;
                    case 2:
                        player.pauseVideo();
                        player.seekTo(data.timeline, true);
                        break;
                }
            }
        }
    }

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
        // player.playVideo();
        var state = 1;
        var timeline = player.getCurrentTime();
        const data = {state, timeline};
        socket.emit('changes', {roomID, data});
    }

    const pause = () => {
        // player.pauseVideo();
        var state = 2;
        var timeline = player.getCurrentTime();
        const data = {state, timeline};
        socket.emit('changes', {roomID, data});
    }

    const seek = (event) => {
        const x = event.pageX - progress.current.getBoundingClientRect().left;
        const bw = progress.current.scrollWidth;
        const timeline = x / bw * player.getDuration();
        setBarwidth(x);
        var state = player.getPlayerState();
        var isVideoChanged = false;
        const data = {state, timeline, isVideoChanged};
        socket.emit('changes', {roomID, data});
    }

    const playVideo = (data) => {
        data["isVideoChanged"] = true;
        socket.emit('changes', {roomID, data});
    }

    return <div className="left">
        <Youtube className="ytplayer" id='player' videoId={videoID} opts={opts} onReady={onPlayerReady} ></Youtube>
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

        <div ref={dummy}></div>

        <CardGroup className='mt-4' itemsPerRow='3'>
            {cardList.map(card => {
                return <YoutubeCard info={card} key={card.id} onClick={() => playVideo(card)} ></YoutubeCard>
            })}
        </CardGroup>
        
    </div>
}

export default YoutubePlayer;