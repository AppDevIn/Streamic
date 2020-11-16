import React, { useEffect } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import io from "socket.io-client";
import YoutubePlayer from "../components/player/YoutubePlayer";

function Player() {

    // useEffect(() => {
    //     const socket = io();
    //     socket.emit("joinRoom");

    //     return () => socket.disconnect();
    // }, [])

    return <>
        <YoutubePlayer/>
    </>

}

export default Player;