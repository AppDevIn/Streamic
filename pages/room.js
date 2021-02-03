import React, { useEffect, useState } from 'react';
import PlayerHeader from "../components/_App/PlayerHeader"
import Player from '../components/Player/Player'
import { Container } from "semantic-ui-react";
import baseUrl from '../utils/baseUrl';
import axios from 'axios';
import ChatBox from '../components/Chat/Chatbox';
import VoiceChat from '../components/Voice/voiceChat';
import io from 'socket.io-client';

// Create context container in a global scope so it can be visible by every component
const ContextContainer = React.createContext(null);

function Room(props) {

    const [parent_link, updateLink] = useState("");
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        document.body.style.backgroundColor = "#242A2E";
        if (socket == null) {
            setSocket(io());
        }
    }, [])

    return <ContextContainer.Provider value={ { parent_link, updateLink, socket, setSocket } }>
             <PlayerHeader />
             <Container fluid className="mt-5 ct">
               <Player {...props}/>
               <ChatBox {...props} />
               { /* <VoiceChat {...props} /> */ }
             </Container>
           </ContextContainer.Provider>
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
        roomID: ctx.query._id,
        messages: responseMessage.data,
        fetchedURL: fetchedURL
    };
}

export { ContextContainer };
export default Room;