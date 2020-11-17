import _ from 'lodash'
import React from 'react'
import Head from "next/head"
import RoomList from '../components/Index/RoomList'
import baseUrl from '../utils/baseUrl'
import axios from 'axios'
import Room from '../components/Room/Room'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add';
import {Button} from 'semantic-ui-react'
import mongoose from 'mongoose'


const INITIAL_ROOM = {
  name:"Hello world()",
}



//fetch mongodb list room
//set count 
//update the room , displays all the rooms
// add to rooms , creates room objects pushes to mongo. 

export default function Home({rooms}) {

  const [room, setRoom] = React.useState(INITIAL_ROOM);

  async function handleAddRoom(event){
    event.preventDefault();
    try {
      
      console.log(room)

      const url = `${baseUrl}/api/room`
      const payload = {...room}
      const response = await axios.post(url, payload)

    } catch (error){
      
      // TODO: Catch the error
      console.log(error);

    } finally {
      
    }
  }


  async function handleJoinRoom(event){
    event.preventDefault();

    const url = `${baseUrl}/api/room`
    const roomID = "Q2pNvkbaq"
    const payload = {params: {roomID}}
    const response = await axios.get(url, payload)
    console.log(response.data);

  }

  return( 
    <>
     <Head>
       <link rel="stylesheet" type="text/css" href="../static/room.css"/>
       <link rel="stylesheet" type="text/css" href="../static/room.css"/>
     </Head>
     <RoomList rooms={rooms}/>
     <Fab color="primary" aria-label="add" variant="extended" className="float-right">
            <AddIcon /> Add Room
      </Fab>
      <Button onClick={handleAddRoom} >Click me </Button>
    </>
  )
}

Home.getInitialProps = async () => {
  //fetch data from server 
  const url = `${baseUrl}/api/rooms`
  const response = await axios.get(url);
  // return response as a object 
  return {rooms:response.data};
  //note: thios object will be merged with exisiting props
  
}