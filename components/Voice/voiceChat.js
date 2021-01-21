import React, { useEffect, useState, useContext, useRef} from 'react'
import { ContextContainer } from '../../pages/room';
var Peer = require('simple-peer')
import styled from "styled-components";

const Video = styled.video`
  border: 1px solid blue;
  width: 50%;
  height: 50%;
`;

export default function VoiceChat({roomID}) {
  const [stream, setStream] = useState();
  const [callerSignal, setCallerSignal] = useState();
    
  const { socket } = useContext(ContextContainer);

  const partnerVideo = useRef();
    

    useEffect(() => {
      
      if (socket != null) {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
          setStream(stream);
          
          
        });

        callPeer()

        socket.on("hey", (data) => {
          console.log("Reciveing a call");
          console.log(data);
          setCallerSignal(data.signal);
          acceptCall(data.signal)
        });

      }


  }, [socket])

    function callPeer(){
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream,
          });
          
        peer.on("signal", data => {
          console.log( "Peer connected" + data);
          socket.emit("callUser", { roomID: roomID, signalData: data})
        })

        peer.on("stream", stream => {
          partnerVideo.current.srcObject = stream;
        });

          socket.on("callAccepted", signal => {
            // setCallAccepted(true);
            console.log("Call Accepted");
            peer.signal(signal);
          })
      

    }

    function acceptCall(callerSignal) {

      const peer = new Peer({
        initiator: false,
        trickle: false,
        stream: stream,
      });



      peer.on("signal", data => {
        socket.emit("acceptCall", { roomID: roomID, signal: data})
      })
  
      peer.on("stream", stream => {
        console.log("Streaming");
        partnerVideo.current.srcObject = stream;
      });
  
      console.log(`The caller signal ${callerSignal}`)

      
      peer.signal(callerSignal);
    }

    let PartnerVideo = (
        <Video playsInline ref={partnerVideo} autoPlay />
      );
    


    return PartnerVideo;
    
}

