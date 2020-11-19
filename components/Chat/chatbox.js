import React, { useEffect, useState, useContext } from 'react'
import { Button, Form, Comment, Header } from 'semantic-ui-react'
import { ContextContainer } from '../../pages/room';
import baseUrl from '../../utils/baseUrl'
import axios from 'axios'
import Chat from './chat'


export default function ChatBox({ roomID, user, messages }) {
    const { socket } = useContext(ContextContainer);
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
            console.log("initialising socket connection for message")
            //Receive the messages
            socket.on("message", (message) => {
                console.log(message);
            });

            socket.on("messageChanges", (message) => {

                console.log("client", message.messageContent)
                setMsgs(messages => [...messages, message]);
            })
        }

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

    function mapMessagesToItems(messages) {


        return messages.map(message => (
            <Comment key={message._id} className="white">
                <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
                <Comment.Content>
                    <Comment.Author as='a'>{message.authorID.username}</Comment.Author>
                    <Comment.Metadata>
                        <div>{message.dateTime}</div>
                    </Comment.Metadata>
                    <Comment.Text>{message.messageContent}</Comment.Text>
                </Comment.Content>
            </Comment>
        ));
    }

    return (
        // <Layout>
        <div className="right chat-containner chat">
            <Chat messages={msgs} />
            <Form onSubmit={sendMessage} reply>
                <Form.TextArea value={m.value} onChange={handleChange} />
                <Button type="submit" content='Add Reply' labelPosition='left' icon='edit' primary />
            </Form>
        </div>
    );
}

ChatBox.getInitialProps = async ({ query: { _id }, req: { cookies: { token } } }) => {

    // const user = await getUser(token)
    console.log("id", _id)

    const url = `${baseUrl}/api/messages`
    const response = await axios.get(url, { params: { roomID: _id } });
    return { roomID: _id, messages: response.data }
};