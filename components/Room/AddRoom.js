import React from 'react'
import { Button, Header, Image, Modal, Form } from 'semantic-ui-react'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add';
import baseUrl from '../../utils/baseUrl'
import axios from 'axios'

const INITIAL_ROOM = {
    name: "",
    file: ""
}

export default function AddRoom() {
    const [open, setOpen] = React.useState(false)

    const [room, setName] = React.useState(INITIAL_ROOM);
    const [filename, setFilename] = React.useState("")
    const [imageUrl, setImageUrl] = React.useState("")

    function handleChange(event) {
        const { name, value } = event.target
        setName((prevState) => ({ ...prevState, [name]: value }))
        console.log(room)
    }

    function handlefileUpload(file) {
        let reader = new FileReader(file)
        reader.readAsDataURL(file)
        reader.onloadend = async function () {
            setFilename(file.name)

            //  To be explained later
            let secureUrl = await doUploadImage(reader.result)
            setImageUrl(secureUrl)
        }
        const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dbccwphl1/image/upload"
        const CLOUDINARY_UPLOAD_PRESET = 'moox1jnq';
        const file = event.target.files[0];
        const formData = new FormData();
        console.log(file)
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
        fetch(CLOUDINARY_URL, {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then((data) => {
                if (data.secure_url !== '') {
                    const uploadedFileUrl = data.secure_url;
                    localStorage.setItem('passportUrl', uploadedFileUrl);
                }
            })
            .catch(err => console.error(err));
    }

    async function handleAddRoom(event) {

        event.preventDefault();
        try {
            console.log(room)
            const url = `${baseUrl}/api/room`
            const payload = { ...room }
            uploadImage()
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
                    <Form.Input
                        onChange={e => handlefileUpload(e.target.files[0])}
                        fluid
                        iconPosition='left'
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