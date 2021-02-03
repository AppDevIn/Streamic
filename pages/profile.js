import {
    Container,
    Header,
    Image,
    Button,
    Divider,
    Dimmer,
    Segment,
    Modal,
    Form,
    Grid
} from 'semantic-ui-react'
import React, {useState} from 'react'
import baseUrl from '../utils/baseUrl'
import axios from 'axios'
import Router from 'next/router'

const INITIAL_User = {
    _id : "",
    password: "",
    confirmPassword: "",
    newPassword: "",
    profilePic: ""
}

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dbccwphl1/image/upload"
const CLOUDINARY_UPLOAD_PRESET = 'midfduhh';

export default function Profile() {
    const [active,
        setActive] = useState(false)
    const [open,
        setOpen] = useState(false)
    const [profileOpen,
        setProfileOpen] = useState(false)
    const [user,
        setUser] = useState(INITIAL_User)

    function handleChange(event) {
        const {name, value} = event.target
        if (name == 'confirmPassword') {
            if (user[password] == value) {
                setUser((prevState) => ({
                    ...prevState,
                    [name]: value
                }))
            } 
        } else if (name == 'newPassword') {
            setUser((prevState) => ({
                ...prevState,
                [name]: value
            }))
        } else if (name == 'profilePic') {
            let file = event.target.files[0]
            setUser((prevState) => ({
                ...prevState,
                [name]: file
            }))
        }
    }

    async function changePassword(event) {
        event.preventDefault();
        try {
            const url = `${baseUrl}/api/user`
            const payload = { params: { password: user.password , _id: user._id } }
            const response = await axios.get(url, payload)
            setOpen(false)
            Router.push("/")
        } catch (error) {
            console.log(error);
        } finally {
            setOpen(false)
        }
    }

    async function changeProfile(event) {
        event.preventDefault();
        try {
            console.log(user)
            const formData = new FormData();
            formData.append('file', user.profilePic);
            formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
            console.log(formData)
            try {
                var imageUrl = "https://react.semantic-ui.com/images/avatar/large/matthew.png"

                try {
                    const res = await axios.post(CLOUDINARY_URL, formData);
                    imageUrl = res.data.secure_url;
                } catch (error) {
                    console.log("Cannout upload image")
                }

                console.log("imageUrl", imageUrl)
                const url = `${baseUrl}/api/user`
                const payload = {
                    photo: imageUrl,
                    _id: user._id
                }
                await axios.post(url, payload)
                Router.push("/")
            } catch (err) {
                console.error(err);
            }
        } catch (error) {
            // TODO: Catch the error
            console.log(error);
        } finally {
            setOpen(false)
        }
    }

    return (
        <>
            <Divider hidden/>
            <Divider hidden/>
            <Divider hidden/>
            <Divider hidden/>
            <Container fluid textAlign='center'>
                 <Grid centered verticalAlign='middle' columns={1}>
                    <Grid.Column>
                        <Dimmer.Dimmable as={Segment} dimmed={active} circular >
                            <Image
                                src='https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.chilloutpoint.com%2Fimages%2F2010%2F07%2Fhorses-in-the-clouds%2Fhorses-in-the-clouds-17.jpg&f=1&nofb=1'
                                centered
                                circular
                                width="300px"
                                height="300px"
                                onMouseOver={(e) => {
                                setActive(true)
                            }}
                                onMouseLeave={(e) => {
                                setActive(false)
                            }}/>

                        <Dimmer active={active}>
                            <Modal
                                onClose={() => setProfileOpen(false)}
                                onOpen={() => setProfileOpen(true)}
                                open={profileOpen}
                                trigger={<Header Header as = 'a' > Change Profile Pic </Header>}>
                                <Modal.Header>Change Profile Pic</Modal.Header>
                                <Modal.Content>
                                    <Form.Field>
                                        <Form.Input
                                            onChange={handleChange}
                                            fluid
                                            iconPosition='left'
                                            placeholder='profile picture'
                                            type="file"
                                            name="profilePic"/>
                                    </Form.Field>
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button color='black' onClick={() => setOpen(false)}>
                                        Nope
                                    </Button>
                                    <Button
                                        content="Yep, Confirm"
                                        labelPosition='right'
                                        icon='checkmark'
                                        onClick={changeProfile}
                                        positive/>
                                </Modal.Actions>
                            </Modal>

                        </Dimmer>
                        </Dimmer.Dimmable>
                    </Grid.Column>
                </Grid>

                <Header as='h1'>Jack Ma</Header>

                <Modal
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                    open={open}
                    trigger={< Button content = 'Change Password' secondary />}>
                    <Modal.Header>Change Password</Modal.Header>
                    <Modal.Content>
                        <Form.Field>
                            <Form.Input
                                fluid
                                onChange={handleChange}
                                iconPosition='left'
                                placeholder='Current Password'
                                type="password"
                                name="confirmPassword"/>
                            <Form.Input
                                fluid
                                onChange={handleChange}
                                iconPosition='left'
                                placeholder='New Password'
                                type="password"
                                name="newPassword"/>
                        </Form.Field>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='black' onClick={() => setOpen(false)}>
                            Nope
                        </Button>
                        <Button
                            content="Yep, Confirm"
                            labelPosition='right'
                            icon='checkmark'
                            onClick={changePassword}
                            positive/>
                    </Modal.Actions>
                </Modal>

           </Container>
        </>
    )
}