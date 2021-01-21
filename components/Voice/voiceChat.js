import React, { useEffect, useState, useContext, useRef} from 'react'
import { ContextContainer } from '../../pages/room';
var Peer = require('simple-peer')
import styled from "styled-components";
import room from '../../utils/room';




const Container = styled.div`
    padding: 20px;
    display: flex;
    height: 100vh;
    width: 90%;
    margin: auto;
    flex-wrap: wrap;
`;

const StyledVideo = styled.video`
    height: 40%;
    width: 50%;
`;

const Video = (props) => {
    const ref = useRef();

    useEffect(() => {
        props.peer.on("stream", stream => {
            ref.current.srcObject = stream;
        })
    }, []);

    return (
        <StyledVideo playsInline autoPlay ref={ref} />
    );
}

// const videoConstraints = {
//   height: window.innerHeight / 2,
//   width: window.innerWidth / 2
// };


export default function VoiceChat({roomID}) {

  const { socket } = useContext(ContextContainer);

  const [peers, setPeers] = useState([]);
  const socketRef = useRef();
  const userVideo = useRef()
  const peersRef = useRef([])

    

  useEffect(() => {
    
    if (socket != null) {
      socketRef.current = socket
      navigator.mediaDevices.getUserMedia({ video: false, audio: true }).then(stream => {
        

        socketRef.current.emit("join room", roomID);

        //Get back the array peers in this room
        socketRef.current.on("all users", users => {
          const peers = []

          console.log(users);

          users.forEach(userID => {
            console.log("User id, ", userID);
            //Create the peer
            const peer = createPeer(userID, socketRef.current.id, stream);

            //To keep track of the peers
            peersRef.current.push({
              peerID: userID,
              peer,
            })

            //For rendering the video
            peers.push(peer)
            setPeers(peers)

          });
        })

        //For those that is already in the room
        socketRef.current.on("user joined", payload => {
          //Add the peer
          const peer = addPeer(payload.signal, payload.callerID, stream)


          peersRef.current.push({
            peerID: payload.callerID,
            peer,
          })

          //Update to be render the video again
          setPeers(users => [...users, peer])
        })
            
        socketRef.current.on("receiving returned signal", payload => {
          const item = peersRef.current.find(p => p.peerID === payload.id);
          item.peer.signal(payload.signal)
        });
        
        
      });

      
    }


  }, [socket])


  //Create peer 
  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    // This is called instantly upon craetion of the peer
    peer.on("signal", signal => {
      socketRef.current.emit("sending signal", {userToSignal, callerID, signal})
    });


    return peer;

  }


  //Add peer 
  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    //This will be triggered when someone want to make contact when accepted than it will be send 
    peer.on("signal", signal => {
      console.log("Getting signal from connection");
      socketRef.current.emit("returning signal", {signal, callerID})
    });

    //This will triggert the signal ☝️
    peer.signal(incomingSignal)

    return peer;

  }

  




  return (
    <Container>
        <StyledVideo muted ref={userVideo} autoPlay playsInline />
        {peers.map((peer, index) => {
            return (
                <Video key={index} peer={peer} />
            );
        })}
    </Container>
);
    
}

