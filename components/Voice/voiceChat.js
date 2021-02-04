import React, { useEffect, useState, useContext, useRef} from 'react'
var Peer = require('simple-peer')
import styled from "styled-components";
import { ContextContainer } from '../../pages/room';




const Container = styled.div`
    padding: 20px;
    display: flex;
    height: 100vh;
    width: 90%;
    margin: auto;
    flex-wrap: wrap;
`;

const StyledVideo = styled.video`
    height: 50%;
    width: 50%;
`;

const Video = (props) => {
    const ref = useRef();

    

    useEffect(() => {
      console.log("Video " + props.id )
      console.log("Destroy video " + props.destroy )
      
      
        props.peer.on("stream", stream => {
            
          if(props.destory == props.id) {
            props.peer.destroy()
            console.log("This has been removed");
            
          } else {
            ref.current.srcObject = stream
          }
        })
      
    }, [props]);

    return (
        <StyledVideo muted={props.isAudio} playsInline autoPlay ref={ref} />
    );
}

// const videoConstraints = {
//   height: window.innerHeight / 2,
//   width: window.innerWidth / 2
// };


export default function VoiceChat({roomID, user}) {

  const { socket } = useContext(ContextContainer);

  const [peers, setPeers] = useState([]);
  const [mute, setMuted] = useState([]);
  const [destroyID, setDestoryID] = useState("");
  const [id, setID] = useState("");

  const socketRef = useRef();
  const userVideo = useRef();
  const [peersRef, setRef] = useState([]);

  useEffect(() => {
    if (socket != null) {
      socketRef.current = socket;

      socketRef.current.emit("socket room", { roomID: roomID, user: user });
      //Get list of cameras
      navigator.getMedia = ( navigator.getUserMedia || // use the proper vendor prefix
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia);

        

        navigator.getMedia(
          { video: true },
          function () {
            console.log(
              "🚀 ~ file: voiceChat.js ~ line 79 ~ navigator.getMedia ~ video",
              "Camera avaiable"
            );
            navigator.mediaDevices
              .getUserMedia({ video: true, audio: true })
              .then((stream) => {
                // userVideo.current.srcObject = stream;

                streaming(stream);
              });
          },
          function () {
            console.log(
              "🚀 ~ file: voiceChat.js ~ line 79 ~ navigator.getMedia ~ video",
              "Camera Unavailable"
            );
            navigator.mediaDevices
              .getUserMedia({ video: false, audio: true })
              .then((stream) => {
                // userVideo.current.srcObject = stream;
                streaming(stream);
              });
          }
        );
   


 
    }
  }, [socket]);


  function streaming(stream) {
    
    socketRef.current.emit("join room", { roomID: roomID, user: user });
    

    //Get back the array peers in this room
    socketRef.current.on("muted user", (muted) => {
      console.log("Muted user: " + muted);

      setMuted(muted);
    });

    //Get back the array peers in this room
    socketRef.current.on("all users", (users) => {
      const peers = [];

      console.log(users);

      users.forEach((userID) => {
        console.log("User id, ", userID);
        //Create the peer
        const peer = createPeer(userID, socketRef.current.id, stream);

        //To keep track of the peers
        peersRef.push({
          peerID: userID,
          peer,
        });
        setRef(peersRef);

        //For rendering the video
        peers.push(peer);
        setPeers(peers);
      });
    });

    //For those that is already in the room
    socketRef.current.on("user joined", (payload) => {
      //Add the peer
      const peer = addPeer(payload.signal, payload.callerID, stream);

      console.log("User joined");

      setRef((peersRef) => [
        ...peersRef,
        {
          peerID: payload.callerID,
          peer,
        },
      ]);
      //Update to be render the video again
      setPeers((users) => [...users, peer]);
    });

    socketRef.current.on("receiving returned signal", (payload) => {
      console.log("reciveing signal");
      const item = peersRef.find((p) => p.peerID === payload.id);
      item.peer.signal(payload.signal);
    });
  }


  useEffect(() => {

    // console.log(mute);
    console.log("Peer ref" + peersRef);


    if(socket != null){

      socket.on("remove socket", id => {     
        console.log("Remove socket id = " + id);


        peersRef.forEach((payload, index) => {
          if (payload.peerID == id) {
            console.log("Destroying peer " + payload.peerID);
            payload.peer.destroy()
          }
          
        })

        setRef(peersRef.filter(payload => payload.peerID !== destroyID))

        setDestoryID(id)
      })
    }

    

  }, [peersRef, socket])


  //Create peer 
  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });


    // This is called instantly upon craetion of the peer
    peer.on("signal", signal => {
      console.log("Sending signal");
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

    console.log("Peer id: " + peer.id);

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
          
          {/* <StyledVideo muted ref={userVideo} autoPlay playsInline /> */}
          <div mute={mute} destroy={destroyID}>
          {peersRef.map((payload, index) => {
              return payload.peerID != destroyID ?  <Video key={payload.peerID} isAudio={mute.includes(payload.peerID)} peer={payload.peer} destroy={destroyID} id={payload.peerID}/> : <div key={index}></div>

              
          
        })}
        </div>
      </Container>
    
    
);
    
}

