import { Card, Image  } from 'semantic-ui-react'

function RoomList({ rooms }) {

    function mapProductsToItems(rooms) {
        return rooms.map(room => (
        
             <Card raised key={room._id} >
             <Image size="large" circular src={room.mediaUrl} style={{ maxHeight: 200 }}/>
             <Card.Content>
                 <Card.Header>{room.roomName}</Card.Header>
             </Card.Content>
         </Card>
        ));
    }

    return <Card.Group doubling stackable itemsPerRow = "4"
    >{mapProductsToItems(rooms)}</Card.Group>;
    
    
}

export default RoomList;