import _ from 'lodash'
import 'semantic-ui-css/semantic.min.css'
import React from 'react'
import Head from "next/head"
import Room from '../components/Room'
import AddRoom from '../components/AddRoom'




//fetch mongodb list room
//set count
//update the room , displays all the rooms
// add to rooms , creates room objects pushes to mongo. 

export default function Home() {
  return( 
    <>
     <Head>
       <link rel="stylesheet" type="text/css" href="../static/room.css"/>
       <link rel="stylesheet" type="text/css" href="../static/room.css"/>
     </Head>
     <Room></Room>
     <AddRoom></AddRoom>
    </>
  )
}
