import React, { useEffect, useState } from 'react';
import io from "socket.io-client";
import YoutubePlayer from "../components/player/YoutubePlayer";
import PlayerHeader from "../components/_App/PlayerHeader"
import { Container } from "semantic-ui-react";

// Create context container in a global scope so it can be visible by every component
const ContextContainer = React.createContext(null);

function Player() {

    const [parent_link, updateLink] = useState("");

    useEffect(() => {
        document.body.style.backgroundColor = "#A1A2AB"
        // const socket = io();
        // socket.emit("joinRoom");

        // return () => socket.disconnect();
    }, [])

    return <ContextContainer.Provider value={{ parent_link, updateLink}}>
        <PlayerHeader />
        <Container fluid className="mt-5 ct">
            <YoutubePlayer/>
        </Container>
    </ContextContainer.Provider>

}

export {ContextContainer};
export default Player;