import React from 'react'
import { Button, Header, Image, Modal, Form } from 'semantic-ui-react'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add';
import baseUrl from '../../utils/baseUrl'
import axios from 'axios'

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dbccwphl1/image/upload"
const CLOUDINARY_UPLOAD_PRESET = 'midfduhh';

const INITIAL_ROOM = {
    name: "",
    file: ""
}

export default function AddRoom({user}) {
    const [open, setOpen] = React.useState(false)

    const [room, setName] = React.useState(INITIAL_ROOM);

    function handleChange(event) {
        const { name, value } = event.target
        if (name == 'file') {
            let file = event.target.files[0]
            setName((prevState) => ({ ...prevState, [name]: file }))
        } else
            setName((prevState) => ({ ...prevState, [name]: value }))
        console.log(room)
    }

    async function handleAddRoom(event) {
        event.preventDefault();
        try {
            console.log(room)
<<<<<<< HEAD
            const url = `${baseUrl}/api/room`
            console.log(user);
            const payload = { ...room, ...user}
            await axios.post(url, payload)
            console.log(room)

=======
            const formData = new FormData();
            formData.append('file', room.file);
            formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
            console.log(formData)
            try {
                const res = await axios.post(CLOUDINARY_URL, formData);
                const imageUrl = res.data.secure_url;
                console.log(imageUrl)
                const url = `${baseUrl}/api/room`
                const payload = {
                    name: room.name, file: imageUrl
                }
                await axios.post(url, payload)
                console.log(room)
            } catch (err) {
                console.error(err);
            }
>>>>>>> feature-cloudinary-v1
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
                    <Form.Input
                        onChange={handleChange}
                        fluid
                        iconPosition='left'
                        placeholder='Room Name'
                        type="file"
                        name="file"
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