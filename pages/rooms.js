import React from 'react'
import io from 'socket.io-client'

import { Header, Form, Button, Input, Label } from 'semantic-ui-react'
import Head from 'next/head';

export default function Room({id}) {
    React.useEffect(() => {
        const socket = io();
        // this.socket.on('updateRoom', loadRooms);
        console.log(socket);
    },[]);
    return <>Rooms {id}</>

}

// loadRooms = (room) => {
//     if (room.id == this.state.id){
//       this.setState(state => ({ room }))
//     }
//     return;
// }


Room.getInitialProps = async ({ query: { id } }) => {
    // const appUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000/rooms' : 'https://robertrules.io/rooms';
    // const response = await fetch(appUrl)
    // const rooms = await response.json()
    
    return { id:id }
    
  
  };