import React, { useState, useEffect, useContext } from 'react'
import { Card, Image, Comment, Header, Button, Segment, Divider } from 'semantic-ui-react'
import { ContextContainer } from '../../pages/room';
import functions from '../../utils/room';

function VideoCard(props) {
  return (
    <Card className="mx-auto" onClick={ props.onClick }>
      <Image src={ props.info.thumbnail } wrapped ui={ false } />
      <Card.Content>
        <Card.Header>
          { props.info.title }
        </Card.Header>
        <Card.Meta>
          <span>{ props.info.author }</span>
        </Card.Meta>
      </Card.Content>
    </Card>
  )
}

function PlayingVideoCard(props) {
  return (
    <Card className="mx-auto" onClick={ props.onClick }>
      <Image src={ props.info.thumbnail } wrapped ui={ false } />
      <Card.Content>
        <Card.Header>
          <Header as='h2' color='red'>
            { props.info.title }
          </Header>
        </Card.Header>
        <Card.Meta>
          <span>{ props.info.author }</span>
        </Card.Meta>
      </Card.Content>
    </Card>
  )
}

function VideoQueue({roomInfo}) {

  const roomID = roomInfo.roomID
  const {socket, urls, setUrls, playingIndex, setPlayingIndex} = useContext(ContextContainer);
  const [videos, setVideos] = useState([])

  useEffect(() => {

    functions.getVideosInfo(urls).then(result => {
      setVideos(result)
    })

  }, [urls])

  const playVideoAt = (index) => {
    const data = {}
    data["playVideoAt"] = true
    data["index"] = index

    socket.emit('changes', {
      roomID,
      data
    })
  }

  const clearQueue = () => {
    setVideos([])
  }

  return (
    <div className="chat chat-main chat-sidebar right">
      <Comment.Group>
        <Segment>
          <Header as='h1' dividing>
            Video Queue
            <Button onClick={ clearQueue }>Clear Queue</Button>
          </Header>
        </Segment>
        <Divider hidden/>
        <div className="scroll">
          { videos.map((video, index) => {
              return (
              index != playingIndex
                ) ? (<VideoCard info={ video } key={ `VQ${video.url}` } onClick={ () => playVideoAt(index) } className="videoCardCenter" />) : (<PlayingVideoCard info={ video } key={ `VQ${video.url}` } onClick={ () => playVideoAt(index) } className="videoCardCenter" />)
            }) }
        </div>
        </ Comment.Group>
    </div>
  )
}

export default VideoQueue;