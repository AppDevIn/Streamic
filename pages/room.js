import React, { useEffect, useState } from 'react';
import YoutubePlayer from "../components/player/YoutubePlayer";
import PlayerHeader from "../components/_App/PlayerHeader"
import { Container } from "semantic-ui-react";
import baseUrl from '../utils/baseUrl';
import axios from 'axios';
import ChatBox from '../components/Chat/ChatBox';
import io from "socket.io-client";

// Create context container in a global scope so it can be visible by every component
const ContextContainer = React.createContext(null);

function Room(props) {

    const [parent_link, updateLink] = useState("");
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        document.body.style.backgroundColor = "#242A2E";
        if (socket == null){
            setSocket(io());

        }
    }, [])

    return <ContextContainer.Provider value={{ parent_link, updateLink, socket, setSocket }}>
        <PlayerHeader />
        <Container fluid className="mt-5 ct">
            <YoutubePlayer  {...props} />
            <ChatBox {...props} />
        </Container>
    </ContextContainer.Provider>
}

Room.getInitialProps = async (ctx, user) => {
    var url = `${baseUrl}/api/room`
    const payload = { params: { roomID: ctx.query._id, _id: user._id } };
    const responseRoom = await axios.get(url, payload);


    url = `${baseUrl}/api/messages`
    const responseMessage = await axios.get(url, { params: { roomID: ctx.query._id } });

    return { roomInfo: responseRoom.data, roomID: ctx.query._id, messages: responseMessage.data };
}

export { ContextContainer };
export default Room;