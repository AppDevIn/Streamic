import React, { useState } from 'react'
import { Card, Image, Button, Dimmer, Segment, Icon, Divider } from 'semantic-ui-react'




function videoCard(props) {
  const [active, setActive] = useState(false)
  return < Card onClick={ props.onClick } onMouseOver={ (e) => {
                                                 setActive(true)
                                               } } onMouseLeave={ (e) => {
                                                                                                                                                                                             setActive(false)
                                                                                                                                                                                           } }>
           <Dimmer.Dimmable dimmed={ active } as={ Segment }>
             <Image src={ props.info.thumbnail } wrapped ui={ false } width="250px" height="200px" fluid />
             <Dimmer active={ active }>
               <Button.Group vertical floated='right'>
                 <Button color="youtube" enabled="false" icon='youtube' />
                 <Divider />
                 <Button icon='add' color='red' />
               </Button.Group>
             </Dimmer>
           </Dimmer.Dimmable>
           <Card.Content>
             <Card.Header>
               { props.info.title }
             </Card.Header>
             <Card.Meta>
               <span>{ props.info.publisher }</span>
             </Card.Meta>
           </Card.Content>
         </ Card>

}

export default videoCard;
