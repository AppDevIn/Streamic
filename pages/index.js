import _ from 'lodash'
import React, { useEffect } from 'react'
import Head from "next/head"
import RoomList from '../components/Index/RoomList'
import baseUrl from '../utils/baseUrl'
import axios from 'axios'
import Room from '../components/Room/Room'
import { Button, Icon } from 'semantic-ui-react'
import mongoose from 'mongoose'
import AddRoom from '../components/Room/AddRoom'
import Layout from '../components/Index/Layout'

import JoinRoom from '../components/Room/JoinRoom'

const INITIAL_ROOM = {
  name: "Hello world()",
}

//fetch mongodb list room
//set count 
//update the room , displays all the rooms
// add to rooms , creates room objects pushes to mongo. 

export default function Home({ rooms, user }) {

  const [room, setRoom] = React.useState(INITIAL_ROOM);


  useEffect(() => {
    document.body.style.backgroundColor = "#242A2E";
  }, [])

  async function handleAddRoom(event) {
    event.preventDefault();
    try {

      console.log(room)

      const url = `${baseUrl}/api/room`
      const payload = { ...room }
      const response = await axios.post(url, payload)

    } catch (error) {

      // TODO: Catch the error
      console.log(error);

    } finally {

    }
  }


  async function handleJoinRoom(event) {
    event.preventDefault();

    const url = `${baseUrl}/api/room`
    const roomID = "Q2pNvkbaq" //TODO: get the roomid code
    const payload = { params: { roomID } }
    const response = await axios.get(url, payload)
    console.log(response.data);

  }

  return (
    <>
      <Head>
        <link rel="stylesheet" type="text/css" href="../static/room.css" />
      </Head>
      <Layout>
        <RoomList rooms={rooms} />
        <JoinRoom user={user}></JoinRoom>
        <AddRoom user={user} />
      </Layout>
    </>
  )
}

Home.getInitialProps = async (ctx, user) => {
  //fetch data from server 
  const url = `${baseUrl}/api/rooms?type=1`

  const response = await axios.get(url, { params: { ...user } });
  // return response as a object 
  return { rooms: response.data };
  //note: thios object will be merged with exisiting props

}