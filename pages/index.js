import _ from 'lodash'
import React from 'react'
import Head from "next/head"
import RoomList from '../components/Index/RoomList'
import baseurl from '../utils/baseUrl'
import axios from 'axios'
import Room from '../components/Room/Room'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add';


//fetch mongodb list room
//set count 
//update the room , displays all the rooms
// add to rooms , creates room objects pushes to mongo. 

export default function Home({rooms}) {
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
    </>
  )
}

Home.getInitialProps = async () => {
  //fetch data from server 
  const url = `${baseurl}/api/rooms`
  const response = await axios.get(url);
  // return response as a object 
  return {rooms:response.data};
  //note: thios object will be merged with exisiting props
  
}