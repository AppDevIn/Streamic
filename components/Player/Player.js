import React, { useEffect, useState, useRef, useContext } from 'react';
import ReactPlayer from 'react-player/lazy'
import { findDOMNode } from 'react-dom'
import { ContextContainer } from '../../pages/room';
import screenfull from 'screenfull'
import functions from '../../utils/room';
import VideoCard from './videoCard';
import { Card, CardGroup, Image } from 'semantic-ui-react';


function Player({user, roomInfo}) {
    const roomID = roomInfo.roomID

    const [playerReady, setPlayerReady] = useState(false)
    const [title, setTitle] = useState("Title")
    const [author, setAuthor] = useState("Author")
    const [playing, setPlaying] = useState(false)
    const [played, setPlayed] = useState(0)
    const [playedText, setPlayedText] = useState("0:00")
    const [duration, setDuration] = useState(0)
    const [durationText, setDurationText] = useState("0:00")
    const [muted, setMuted] = useState(false)
    const [barWidth, setBarwidth] = useState("0%")
    const [cardList, setCardList] = useState([]);

    const {parent_link, socket, urls, setUrls, playingIndex, setPlayingIndex} = useContext(ContextContainer);

    const dummy = useRef(null);
    const player = useRef()
    const bar = useRef(null)

    useEffect(() => {
        functions.updatePlayingIndex(roomID, playingIndex)

        functions.getVideoInfo(urls[playingIndex]).then(({title, author}) => {
            setTitle(title)
            setAuthor(author)
        })

    }, [playingIndex])

    useEffect(() => {
        if (parent_link !== "") {
            var newURL = functions.filterVideoURL(parent_link)
            if (ReactPlayer.canPlay(newURL)) {
                console.log(newURL)

                // need to retrieve video info
                functions.insertNewVideo(newURL, roomID).then(result => {
                    socket.emit("resetURLs", {
                        roomID: roomID,
                        url: newURL
                    })
                })

            } else {
                functions.getRecommendations(parent_link)
                    .then(res => {
                        setCardList(res);
                    });
            }
        } else {
            functions.getTrendingVideo()
                .then(res => {
                    setCardList(res);
                })
        }

    }, [parent_link])

    useEffect(() => {
        if (parent_link != "" && cardList.length != 0 && dummy != null) {
            dummy.current.scrollIntoView({
                behavior: "smooth"
            });
        }
    }, [cardList])

    useEffect(() => {
        if (playerReady) {
            console.log("initialising socket action....");
            socket.emit("joinRoom", {
                roomID,
                user
            });
            socket.emit("router", roomID);

            socket.on("streaming", (data) => {
                handleActions(data);
            });

            socket.on("existingUser", () => {
                console.log("existingUser")
                var isPlaying = player.current.player.isPlaying;
                var timeline = player.current.getCurrentTime();
                var isVideoChanged = false;
                const data = {
                    isPlaying,
                    timeline,
                    isVideoChanged
                };
                socket.emit('changes', {
                    roomID,
                    data
                });

            });
        }
    }, [playerReady]);

    const onPlayerReady = () => {
        console.log(player.current)
        setPlayerReady(true)
        setPlaying(true)
        setMuted(true)
    }

    var handleActions = async function(data) {
        if (playerReady) {
            if (data.addToQueue) {
                setUrls(data.updatedURLs)
            } else if (data.playVideoAt) {
                setPlayingIndex(data.index)
            } else if (data.resetQueue) {
                setUrls([data.url])
                setPlayingIndex(0)

                if (data.update) {
                    functions.getVideoInfo(data.url).then(({title, author}) => {
                        setTitle(title)
                        setAuthor(author)
                    })
                }
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                if (data.isPlaying) {
                    setPlaying(true)
                    player.current.seekTo(data.timeline, "seconds")
                } else {
                    setPlaying(false)
                    player.current.seekTo(data.timeline, "seconds")
                }
            }
        }
    }

    const handleClickFullscreen = () => {
        screenfull.request(findDOMNode(player.current))
    }

    const updateProgress = ({played, playedSeconds}) => {
        setPlayed(playedSeconds)
        setBarwidth(played * 100 + "%")
        setPlayedText(convertTime(playedSeconds))
    }

    const updateDuration = (duration) => {
        setDuration(duration)
        setDurationText(convertTime(duration))
    }

    const play = () => {
        var isPlaying = true;
        var timeline = player.current.getCurrentTime();
        const data = {
            isPlaying,
            timeline
        };
        socket.emit('changes', {
            roomID,
            data
        });
    }

    const pause = () => {
        var isPlaying = false;
        var timeline = player.current.getCurrentTime();
        const data = {
            isPlaying,
            timeline
        };
        socket.emit('changes', {
            roomID,
            data
        });
    }

    const seek = (event) => {
        const x = event.pageX - bar.current.getBoundingClientRect().left;
        const bw = bar.current.scrollWidth;
        const timeline = x / bw * duration;

        // player.current.seekTo(timeline, "seconds")

        var isPlaying = playing;
        const data = {
            isPlaying,
            timeline
        };
        socket.emit('changes', {
            roomID,
            data
        });
    }

    const playVideo = (data) => {
        socket.emit("resetURLs", {
            roomID: roomID,
            url: data.url,
            info: data,
            update: true
        })
    }

    const convertTime = (value) => {
        const mins = Math.floor(value / 60);
        const secs = value % 60 != 0 ? Math.floor(value % 60) : 0
        return mins + ":" + ((secs < 10) ? "0" + secs : secs)
    }

    function playNextVideo() {
        if (playingIndex + 1 < urls.length) {
            const data = {}
            data["playVideoAt"] = true
            data["index"] = playingIndex + 1

            socket.emit('changes', {
                roomID,
                data
            })
        }
    }

    function playPreviousVideo() {
        if (playingIndex > 0) {
            const data = {}
            data["playVideoAt"] = true
            data["index"] = playingIndex - 1

            socket.emit('changes', {
                roomID,
                data
            })

        }
    }

    return (
        <div className="left">
          <div className='player-wrapper'>
            <ReactPlayer className='react-player' width='100%' height='100%' onProgress={ (callback) => updateProgress(callback) } onDuration={ (duration) => updateDuration(duration) } onReady={ () => onPlayerReady() } muted={ muted }
              onEnded={ () => playNextVideo() } playing={ playing } ref={ player } url={ urls[playingIndex] } config={ { youtube: { playerVars: { showinfo: 0, controls: 0, disablekb: 1, modestbranding: 1, rel: 0 } } } } />
          </div>
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
            <button onClick={ play } id="play" type="button" className="btn btn-default">
              <span className="glyphicon glyphicon-play"></span>
            </button>
            <button onClick={ pause } id="pause" type="button" className="ml-2 btn btn-default">
              <span className="glyphicon glyphicon-pause"></span>
            </button>
            <button onClick={ () => handleClickFullscreen() } id="fullScreen" type="button" className="ml-2 btn btn-default">
              <span className="glyphicon glyphicon-fullscreen"></span>
            </button>
            <button onClick={ () => playPreviousVideo() } id="previous" type="button" className="ml-2 btn btn-default">
              <span className="glyphicon glyphicon-step-backward"></span>
            </button>
            <button onClick={ () => playNextVideo() } id="next" type="button" className="ml-2 btn btn-default">
              <span className="glyphicon glyphicon-step-forward"></span>
            </button>
            <span id="timeline">{ playedText } / { durationText }</span>
          </div>
          <div ref={ dummy }></div>
          <CardGroup className='mt-4 cardDeck' itemsPerRow='3'>
            { cardList.map(card => {
                  card["roomID"] = roomID
                  return <VideoCard info={ card } key={ card.url } onClick={ () => playVideo(card) } />
              }) }
          </CardGroup>
        </div>
    )

}

export default Player;