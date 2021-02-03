import React from 'react'
import { Card, Image, Button } from 'semantic-ui-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fab)

function addVideoToQueue(video) {
  console.log(video)
}

function videoCard(props) {
  return < Card>
           <Image onClick={ props.onClick } src={ props.info.thumbnail } wrapped ui={ false } width="100%" height="auto" />
           <Card.Content>
             <Card.Header>
               { props.info.title }
             </Card.Header>
             <Card.Meta>
               <span>{ props.info.publisher }</span>
             </Card.Meta>
             <Button basic color='blue' onClick={ () => addVideoToQueue(props.info.url) }>
               <FontAwesomeIcon icon={ ['fab', props.info.platform] } fixedWidth /> Add To Queue
             </Button>
           </Card.Content>
         </ Card>
}

export default videoCard;
