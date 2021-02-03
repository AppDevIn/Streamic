import { Card, Image, Button } from 'semantic-ui-react'
import Layout from '../Index/Layout';

function RoomList({rooms}) {
    function mapProductsToItems(rooms) {
        return rooms.map(room => (
            <Card raised key={ room._id }>
              <Image size="large" href={ `/room?_id=${room.roomID}` } circular src={ room.mediaUrl } style={ { maxHeight: 200 } } />
              <Card.Content>
                <Card.Header>
                  { room.roomName }
                </Card.Header>
              </Card.Content>
              <Card.Content extra>
                <Button basic color='grey' onClick={ () => {
                                                         navigator.clipboard.writeText(room.roomID)
                                                     } }>
                  Copy Room Code
                </Button>
              </Card.Content>
            </Card>
        ));
    }

    return (
        // <Layout>
        <Card.Group doubling stackable itemsPerRow="6">
          { mapProductsToItems(rooms) }
        </Card.Group>
        // </Layout>
        );


}

export default RoomList;