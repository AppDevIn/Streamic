import React from 'react'
import { Card, Image } from 'semantic-ui-react'

const youtubeCard = (props) => (
  <Card onClick={props.onClick}>
    <div class="blurring dimmable image">
      <div class="ui dimmer">
        <div class="content">
          <div class="center">
            <div class="ui inverted button">Add Friend</div>
          </div>
        </div>
      </div>
      <Image src={props.info.thumbnail} wrapped ui={false} />
    </div>
    <Card.Content>
      <Card.Header>{props.info.title}</Card.Header>
      <Card.Meta>
        <span>{props.info.publisher}</span>
      </Card.Meta>
    </Card.Content>
  </Card>
)

export default youtubeCard
