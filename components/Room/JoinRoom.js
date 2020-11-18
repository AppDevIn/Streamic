import React from 'react'
import { Button, Modal, Form } from 'semantic-ui-react'
import Fab from '@material-ui/core/Fab'
import AccessibilityIcon from '@material-ui/icons/Accessibility'
import baseUrl from '../../utils/baseUrl'
import axios from 'axios'




export default function JoinRoom() {
    const [open, setOpen] = React.useState(false)

    const [room, setName] = React.useState("");

    function handleChange(event) {
        const { name, value } = event.target
        setName((prevState) => ({ ...prevState, [name]: value }))
        console.log(room)
    }

    async function handleJoinRoom(event) {
        event.preventDefault();
        try {
            const url = `${baseUrl}/api/room`
            const payload = { params: { roomID: room.name } }
            const response = await axios.get(url, payload)
            setOpen(false)

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
            size={'tiny'}
            trigger={<Fab color="primary" aria-label="add" variant="extended" className="float-right"> <AccessibilityIcon />Join Room </Fab>}
        >
            <Modal.Header>Join a room</Modal.Header>
            <Modal.Content>
                <Form.Field>
                    <Form.Input
                        onChange={handleChange}
                        fluid
                        iconPosition='left'
                        placeholder='Room Code'
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
                    content="Join"
                    labelPosition='right'
                    icon='checkmark'
                    onClick={handleJoinRoom}
                    positive
                />
            </Modal.Actions>
        </Modal>
    )
}