import React, { useEffect, useState } from 'react';
import PlayerHeader from "../components/_App/PlayerHeader"
import Player from '../components/Player/Player'
import VideoQueue from '../components/Player/VideoQueue'
import { Container } from "semantic-ui-react";
import axios from 'axios';
import io from 'socket.io-client';
import Router from 'next/router'
import ChatBox from '../components/Chat/Chatbox';
import VoiceChat from '../components/Voice/voiceChat';
import baseUrl from '../utils/baseUrl';


// Create context container in a global scope so it can be visible by every component
const ContextContainer = React.createContext(null);

function Room(props) {

    const [parent_link, updateLink] = useState("");
    const [socket, setSocket] = useState(null);
    const [urls, setUrls] = useState(props.fetchedURL)
    const [playingIndex, setPlayingIndex] = useState(props.roomInfo.playingIndex)
    const [existingUser, setexistingUser] = useState(true);

    useEffect(() => {
        document.body.style.backgroundColor = "#242A2E";
        if (socket == null) {
            setSocket(io());
        }
    }, [])

    useEffect(() => {
        
        if (socket != null) {

            socket.emit("usersToRoom", props.user._id);

            socket.on("retrieve usersToRoom", (room) => {
                if (room) {
                    Router.push('/index')
                } else {
                    socket.emit("joinRoom", ({roomID:props.roomID, user:props.user}));
                    setexistingUser(false)
                }
            })
        }
    }, [socket])

    return existingUser ? <></> : <ContextContainer.Provider value={ { parent_link, updateLink, socket, setSocket, urls, setUrls, playingIndex, setPlayingIndex } }>
        <PlayerHeader />
        <Container fluid className="mt-5 ct">
            <Player {...props } />
            <ChatBox {...props} />
        </Container>
    </ContextContainer.Provider >   
}

Room.getInitialProps = async (ctx, user) => {
    
    var url = `${baseUrl}/api/room`
    const payload = {
        params: {
            roomID: ctx.query._id,
            _id: user._id
        }
    };
    const responseRoom = await axios.get(url, payload);

    const videoInfos = responseRoom.data.Playing
    var fetchedURL = []
    videoInfos.forEach(video => {
        fetchedURL.push(video.videoURL)
    });

    url = `${baseUrl}/api/messages`
    const responseMessage = await axios.get(url, {
        params: {
            roomID: ctx.query._id
        }
    });

    return {
        roomInfo: responseRoom.data,
        user:user,
        roomID: ctx.query._id,
        messages: responseMessage.data,
        fetchedURL: fetchedURL
    };
}

export { ContextContainer };
export default Room;