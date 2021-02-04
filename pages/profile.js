import {
    Container,
    Header,
    Image,
    Button,
    Divider,
    Dimmer,
    Modal,
    Form
} from 'semantic-ui-react'
import React, {useState, useEffect} from 'react'
import baseUrl from '../utils/baseUrl'
import axios from 'axios'
import Router from 'next/router'
import Layout from '../components/Index/Layout'


const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dbccwphl1/image/upload"
const CLOUDINARY_UPLOAD_PRESET = 'midfduhh';

export default function Profile({user}) {
    const INITIAL_User = {
        user : user,
        photo: ""
    }
    const [active,
        setActive] = useState(false)
    const [open,
        setOpen] = useState(false)
    const [profileOpen,
        setProfileOpen] = useState(false)
    const [User,
        setUser] = useState(INITIAL_User)

    useEffect(() => {
        document.body.style.backgroundColor = "#242A2E";
    }, [])

    function handleChange(event) {
        const {name, value} = event.target
        if (name == 'confirmPassword') {
            if (user.password == value) {
                console.log("can change password")
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
        } else if (name == 'photo') {
            let file = event.target.files[0]
            setUser((prevState) => ({
                ...prevState,
                [name]: file
            }))
        }
    }

    // async function changePassword(event) {
    //     event.preventDefault();
    //     try {
    //         print(User.confirmPassword,user.password)
    //         const url = `${baseUrl}/api/user`
    //         const payload = { params: { password: user.password , _id: user._id } }
    //         const response = await axios.get(url, payload)
    //         setOpen(false)
    //         Router.push("/")
    //     } catch (error) {
    //         console.log(error);
    //     } finally { 
    //         setOpen(false)
    //     }
    // }

    async function changeProfile(event) {
        event.preventDefault();
        try {
            console.log(User.photo)
            const formData = new FormData();
            formData.append('file', User.photo);
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
                const url = `${baseUrl}/api/user?type=2`
                const payload = {
                    userID: user.UID,
                    photo: imageUrl
                }
                await axios.post(url, payload)
                Router.push("/")
                setOpen(false)
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
        <Layout>
            <Divider hidden/>
            <Divider hidden/>
            <Divider hidden/>
            <Divider hidden/>
            <Container fluid textAlign='center'>
                        <Dimmer.Dimmable dimmed={active} >
                            <Image
                                src={user.photo}
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
                                            name="photo"/>
                                    </Form.Field>
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button color='black' onClick={() => setProfileOpen(false)}>
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

                <Header inverted color='grey' as='h1'>{user.username}</Header>
                <Header inverted color='grey' as='h1'>{user.email.split("&")[0]}</Header>
                <Divider hidden/>
                <Divider hidden/> 
                
                {/* <Modal
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
                </Modal> */}

           </Container>
           </Layout>
        </>
        
    )
}