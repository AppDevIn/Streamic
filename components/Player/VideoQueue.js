import React, { useState, useEffect, useContext } from 'react'
import { Card, CardGroup, Image, Comment, Header } from 'semantic-ui-react'
import { ContextContainer } from '../../pages/room';
import functions from '../../utils/room';

function VideoCard(props) {
  return (
    <Card onClick={ props.onClick }>
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
    <Card onClick={ props.onClick }>
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

  return (
    <div className="chat chat-main chat-sidebar right">
      <Comment.Group>
        <Header as='h3' dividing>
          Video Queue
        </Header>
        <div className="scroll mx-auto videoCardCenter">
          { videos.map((video, index) => {
              return (
              index != playingIndex
                ) ? (<VideoCard info={ video } key={ `VQ${video.url}` } onClick={ () => playVideoAt(index) } className="videoCardCenter" />) : (<PlayingVideoCard info={ video } key={ `VQ${video.url}` } onClick={ () => playVideoAt(index) } className="videoCardCenter" />)
            }) }
        </div>
        </ Comment.Group>
        { /* <CardGroup className='mt-4 cardDeck' itemsPerRow='1'>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              { videos.map((video, index) => {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    return (<> <p>{index} </p> <VideoCard info={ video } key={ `VQ${video.url}` } onClick={ () => playVideoAt(index) } /> </> )
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  }) }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              </CardGroup> */ }
    </div>
  )
}

export default VideoQueue;