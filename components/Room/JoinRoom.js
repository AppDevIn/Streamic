import React from 'react'
import { Button, Modal, Form } from 'semantic-ui-react'
import Fab from '@material-ui/core/Fab'
import AccessibilityIcon from '@material-ui/icons/Accessibility'
import baseUrl from '../../utils/baseUrl'
import axios from 'axios'



export default function AddRoom() {
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
            console.log(room)
            const url = `${baseUrl}/api/rooms`
            const payload = { ...room }
            const response = await axios.post(url, payload)
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
            trigger={<Fab color="primary" aria-label="add" variant="extended" className="float-right"> <AccessibilityIcon />Join Room </Fab>}
        >
            <Modal.Header>Create a room</Modal.Header>
            <Modal.Content>
                <Form.Field>
                    <Form.Input
                        onChange={handleChange}
                        fluid
                        iconPosition='left'
                        placeholder='Room Code'
                        type="Email"
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
                    onClick={() => handleJoinRoom}
                    positive
                />
            </Modal.Actions>
        </Modal>
    )
}