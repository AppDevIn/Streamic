import React, { useEffect, useState, useContext, useRef} from 'react'
import { Button, Form, Comment, Header, Tab } from 'semantic-ui-react'
import { ContextContainer } from '../../pages/room';
import baseUrl from '../../utils/baseUrl'
import axios from 'axios'
import Chat from './chat'
import classnames from 'classnames'
import VoiceChat from '../../components/Voice/voiceChat';

export default function ChatBox({ roomID, user, messages }) {


    let props = {roomID, user}
    

    const { socket } = useContext(ContextContainer);
    const [msgs, setMsgs] = useState(messages)
    const [m, setM] = useState("")
    const [tabItemVoice, setTabItemVoice] = useState("item")
    const [tabItemChat, setTabItemChat] = useState("active item")
    const [currentTab, setCurrentTab] = useState(1)
    const [users, setUsers] = useState([])
    const [isMute, setMute] = useState(false)

    async function postMessage(message) {
        const url = `${baseUrl}/api/message`
        const payload = { ...message }
        const response = await axios.post(url, payload)
        return response.data
    }

    useEffect(() => {
        if (socket != null) {
            console.log("initialising socket connection for message")

            socket.emit("memeber add", ({user, roomID}))

            //Receive the messages
            socket.on("message", (message) => {
                console.log(message);
            });

            socket.on("messageChanges", (message) => {

                console.log("client", message.messageContent)
                setMsgs(messages => [...messages, message]);
            })

            socket.on("memeber join", (usr) => {
                console.log(`Member in the room: ${usr}`);
                setUsers(usr)
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

        setM((prevState) => ({ value: ""}))
        
    }

    //Put inside the onChange 
    function handleChange(event) {
        const { name, value } = event.target
        setM((prevState) => ({ ...prevState, value }))
    }


function Memebers({ memeberList }) {
    const dummy = useRef();

    

    useEffect(() => {
        console.log(memeberList);
        dummy.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    })

    function mapMessagesToItems(list) {


        return list.map(user => (
            <div class="ui item label">
                {user.username}
            </div>
        ));
    }

    return (
        // <Layout>
        <div class="ui list">
            <Header as='h3' dividing>
                Memebers
            </Header>
            {mapMessagesToItems(memeberList)}
            <div ref={dummy} ></div>
         </div>
    );
}

    return (
        <div className="chat chat-main chat-sidebar right">
            <div class="ui top attached tabular menu">
                
                <div onClick={() => {
                    setTabItemChat("active item")
                    setTabItemVoice("item")
                    setCurrentTab(1)
                    

                }} className={ "item " + classnames({ active: currentTab == 1})}>Chat</div>

                <div onClick={() => {
                    setCurrentTab(2)

                }} className={ "item " + classnames({ active: currentTab == 2})}>Video</div>

                <div onClick={() => {
                    setCurrentTab(3)
                    socket.emit("get member", (roomID))

                }} className={ "item " + classnames({ active: currentTab == 3})}>Members</div>
                
                <div onClick={() => {

                    if (!isMute) {
                        socket.emit("mute user", ({roomID:roomID}))
                    } else {
                        socket.emit("unmute user", ({roomID:roomID}))
                    }
                    setMute(!isMute)
                }} className={"item"} >{isMute ? "Unmute" : "Mute"}</div>

            </div>
            <div className={"ui bottom attached tab " + classnames({ active: currentTab == 1})}>
                <div >
                    <Chat messages={msgs}/>
                    <div id="chatFormContainer">
                        <Form onSubmit={sendMessage} reply>
                            <Form.Input required placeholder="Enter Message" autoComplete="off" value={m.value} onChange={handleChange} id="chatMsg"/>
                        </Form>
                    </div>
                </div>
            </div>
            <div className={"ui bottom attached tab " + classnames({ active: currentTab == 2})}>
                <VoiceChat {...props} />
            </div>
            <div className={"ui bottom attached tab " + classnames({ active: currentTab == 3})}>
                <Memebers memeberList={users}/>
                
            </div>
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



