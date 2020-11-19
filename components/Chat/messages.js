import React, { useEffect, useState } from 'react'
import io from "socket.io-client";
import { Button, Form } from 'semantic-ui-react'
import ChatBox from './ChatBox'

import baseUrl from '../../utils/baseUrl'
import axios from 'axios'

export default function Messages({ roomID, user, messages }) {

    const [socket, setSocket] = useState(null)
    const [msgs, setMsgs] = useState(messages)
    const [m, setM] = useState("")


    async function postMessage(message) {
        const url = `${baseUrl}/api/message`
        const payload = { ...message }
        const response = await axios.post(url, payload)
        return response.data
    }


    useEffect(() => {
        if (socket != null) {

            //Pass the idea to the socket server
            socket.emit("joinRoom", {roomID, user});

            //Receive the messages
            socket.on("message", (message) => {
                console.log(message);
            });

            socket.on("messageChanges", (message) => {

                console.log("client", message.messageContent)
                setMsgs(messages => [...messages, message]);
            })
        } else
            setSocket(io())

    }, [socket])


    async function sendMessage(event, data) {
        const { value } = event.target[0]

        const message = {
            msg: value,
            user,
            roomID
        }
        const M = await postMessage(message)
        M.authorID = user

        socket.emit("sendMessage", { roomID, message: M })

        setM((prevState) => ({ value: "" }))

    }

    //Put inside the onChange 
    function handleChange(event) {
        const { name, value } = event.target
        setM((prevState) => ({ ...prevState, value }))
    }


    return (<>
        <ChatBox  messages={msgs}/>
        <Form onSubmit={sendMessage}  reply>
            <Form.TextArea value={m.value} onChange={handleChange}/>
            <Button type="submit"  content='Add Reply' labelPosition='left' icon='edit' primary  />
        </Form>
    </>)



}





