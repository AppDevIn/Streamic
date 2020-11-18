import React, {useEffect, useState} from 'react'
import io from "socket.io-client";
import {Button} from 'semantic-ui-react'

import baseUrl from '../utils/baseUrl'
import axios from 'axios'

export default function Messages({roomID, user}){

    const [socket, setSocket] = useState(null)




    async function postMessage(message) {
    
        const url = `${baseUrl}/api/message`
        const payload = { ...message }
        const response = await axios.post(url, payload)
    
    }

    
    React.useEffect(()=>{

    },[])

    useEffect(() =>{
        if (socket != null){

            //Pass the idea to the socket server
            socket.emit("joinRoom", roomID, user );
        
            //Receive the messages
            socket.on("message", (message) => {
                console.log(message);
            });

            socket.on("messageChanges", (message) => {
                console.log("client",message)
        })
        } else 
            setSocket(io())

    }, [socket])


    function sendMessage(event){
        const message = {
            msg:"HELLO_WORLD()",
            user,
            roomID
        }
        postMessage(message)
        
        socket.emit("sendMessage", {roomID ,message:"HELLO_WORLD()"})
    }

    return <><Button onClick={sendMessage}>Send</Button></>


}

async function getUser(token) {
    
    const url = `${baseUrl}/api/user`
    const payload = { params: { token } }
    const response = await axios.get(url, payload)
    return response.data

  }


Messages.getInitialProps = async ({query : {_id}, req: {cookies: {token}}}) => {
    
    // const user = await getUser(token)
    console.log("id",_id) 
    return {roomID:_id}
};
  

