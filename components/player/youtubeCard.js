import { ContactsOutlined } from '@material-ui/icons'
import React, { useState } from 'react'
import { Card, Image, Button, Dimmer, Segment, Icon, Divider } from 'semantic-ui-react'


function addVideoToPlaylist(video) {

}

// function whichSocialPlatfrom(urlLink) {
//   if (urlLink.contains("https://www.twitch.tv/")) {
//     return { "social": "Twitch", "socialName": "twitch" }
//   } else if (urlLink.contains("https://www.youtube.com/watch?v=")) {
//     return { "social": "Youtube", "socialName": "youtube" }
//   } else if (urlLink.contains("https://fb.watch/")) {
//     return { "social": "Facebook", "socialName": "facebook" }
//   }
// }

const socialCard = (props) => (
  <Button color={props.socialName}>
    <Icon name={props.socialName} /> {props.social}
  </Button>
)

function youtubeCard(props) {
  const [active, setActive] = useState(false)
  // const [social, socialName] = whichSocialPlatfrom(props.info)
  return < Card onClick={props.onClick} onMouseOver={(e) => {
    setActive(true)
  }} onMouseLeave={(e) => {
    setActive(false)
  }}>
    <Dimmer.Dimmable as={Segment} dimmed={active}>
      <Image src={props.info.thumbnail} wrapped ui={false} fluid />

      <Dimmer active={active}>
        <Button.Group vertical floated='right'>
          <Button color="youtube" enabled="false" icon='youtube' />
          <Divider />
          <Button icon='add' color='red' />

        </Button.Group>
      </Dimmer>
    </Dimmer.Dimmable>

    <Card.Content>
      <Card.Header>{props.info.title}</Card.Header>
      <Card.Meta>
        <span>{props.info.publisher}</span>

      </Card.Meta>
    </Card.Content>
  </ Card>

}

export default youtubeCard
