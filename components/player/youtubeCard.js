import React from 'react'
import { Card, Image } from 'semantic-ui-react'

const youtubeCard = (props) => (
  <Card>
    <Image src={props.info.thumbnail} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{props.info.title}</Card.Header>
      <Card.Meta>
        <span>{props.info.publisher}</span>
      </Card.Meta>
    </Card.Content>
  </Card>
)

export default youtubeCard
