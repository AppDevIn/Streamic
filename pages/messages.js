import React, { useEffect, useState } from 'react'
import io from "socket.io-client";
import { Button } from 'semantic-ui-react'
import ChatBox from '../components/Chat/ChatBox'

export default function Messages({ roomID }) {

    const [socket, setSocket] = useState(null)

    React.useEffect(() => {

    }, [])

    useEffect(() => {
        if (socket != null) {

            //Pass the idea to the socket server
            socket.emit("joinRoom", "f48k6mnSC");

            //Receive the messages
            socket.on("message", (message) => {
                console.log(message);
            });

            socket.on("messageChanges", (message) => {
                console.log(message)
            })
        } else
            setSocket(io())

    }, [socket])


    function sendMessage(event) {
        console.log("Sending message ")
        socket.emit("sendMessage", { message: "HELLO_WORLD()" })
    }

    return <>
        {/* <ChatBox></ChatBox> */}
        <Form reply>
            <Form.TextArea />
            <Button content='Add Reply' labelPosition='left' icon='edit' primary onClick={sendMessage} />
        </Form>
    </>
}