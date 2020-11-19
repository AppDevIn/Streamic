import React, { useEffect, useState } from 'react';
import YoutubePlayer from "../components/player/YoutubePlayer";
import PlayerHeader from "../components/_App/PlayerHeader"
import { Container } from "semantic-ui-react";
import ChatBox from "../components/Chat/chatbox"
import baseUrl from '../utils/baseUrl';
import axios from 'axios';

// Create context container in a global scope so it can be visible by every component
const ContextContainer = React.createContext(null);

function Room(props) {

    const [parent_link, updateLink] = useState("");

    useEffect(() => {
        document.body.style.backgroundColor = "#242A2E";
    }, [])

    return <ContextContainer.Provider value={{ parent_link, updateLink}}>
        <PlayerHeader />
        <Container fluid className="mt-5 ct">
            <YoutubePlayer  {...props}/>
            <ChatBox/>
        </Container>
    </ContextContainer.Provider>
}

Room.getInitialProps = async (ctx, user) => {
    const url = `${baseUrl}/api/room`
    const payload = { params: { roomID : ctx.query._id , _id: user._id } };
    const response = await axios.get(url, payload);
    return {roomInfo : response.data};
}

export {ContextContainer};
export default Room;