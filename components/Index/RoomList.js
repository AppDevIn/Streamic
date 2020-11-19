import { Card, Image  } from 'semantic-ui-react'
import Layout from '../Index/Layout';

function RoomList({ rooms }) {

    function mapProductsToItems(rooms) {
        return rooms.map(room => (
        
             <Card href={`/room?_id=${room._id}`} raised key={room._id} >
             <Image size="large" circular src={room.mediaUrl} style={{ maxHeight: 200 }}/>
             <Card.Content>
                 <Card.Header>{room.roomName}</Card.Header>
             </Card.Content>
         </Card>
        ));
    }

    return (
    // <Layout>
    <Card.Group doubling stackable itemsPerRow = "6"
    >{mapProductsToItems(rooms)}</Card.Group>
    // </Layout>
    );
    
    
}

export default RoomList;