import React from 'react'
import { Button, Header, Image, Modal, Form } from 'semantic-ui-react'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add';
import baseUrl from '../../utils/baseUrl'
import axios from 'axios'

const INITIAL_ROOM = {
    name: ""
}

export default function AddRoom() {
    const [open, setOpen] = React.useState(false)

    const [room, setName] = React.useState(INITIAL_ROOM);

    function handleChange(event) {
        const { name, value } = event.target
        setName((prevState) => ({ ...prevState, [name]: value }))
        console.log(room)
    }

    async function handleAddRoom(event) {
        
        event.preventDefault();
        try {
            console.log(room)
            const url = `${baseUrl}/api/room`
            const payload = { ...room }
            await axios.post(url, payload)

        } catch (error) {
            // TODO: Catch the error
            console.log(error);

        } finally {
            setOpen(false)
        }
    }

    // React.useEffect(() => {
    //     const isUser = Object.values(user).every(el => Boolean(el))
    //     setDisabled(!isUser);
    // }, [user])

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Fab color="primary" aria-label="add" variant="extended" className="float-right"> <AddIcon /> Add Room </Fab>}
        >
            <Modal.Header>Create a room</Modal.Header>
            <Modal.Content>
                <Form.Field>
                    <Form.Input
                        onChange={handleChange}
                        fluid
                        iconPosition='left'
                        placeholder='Room Name'
                        type="Email"
                        name="name"
                    />
                </Form.Field>
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => setOpen(false)}>
                    Cancel
                </Button>
                <Button
                    content="Create"
                    labelPosition='right'
                    icon='checkmark'
                    onClick={handleAddRoom}
                    positive
                />
            </Modal.Actions>
        </Modal>
    )
}