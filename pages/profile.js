import { Container, Header, Image, Button, Divider, Dimmer, Segment, Modal, Form } from 'semantic-ui-react'
import React, { useState } from 'react'

const INITIAL_User = {
    password: "",
    profile_pic: ""
}

export default function Profile() {
    const [active, setActive] = useState(false)
    const [open, setOpen] = useState(false)
    const [user, setUser] = useStatue(INITIAL_User)

    function handleChange(event) {
        const { name, value } = event.target
        if (name == 'currpassword') {
            if (user[password] == value) {
                setName((prevState) => ({ ...prevState, [name]: value }))
            }
        }
        console.log(room)
    }

    function changePassword() {

    }

    return (
        <>
            <Divider hidden />
            <Divider hidden />
            <Divider hidden />
            <Divider hidden />
            <Container fluid textAlign='center' >
                <Dimmer.Dimmable as={Segment} dimmed={active} circular  >
                    <Image src='https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.chilloutpoint.com%2Fimages%2F2010%2F07%2Fhorses-in-the-clouds%2Fhorses-in-the-clouds-17.jpg&f=1&nofb=1' centered circular width="300px" height="300px" onMouseOver={(e) => {
                        setActive(true)
                    }} onMouseLeave={(e) => {
                        setActive(false)
                    }} />

                    <Dimmer active={active}>
                        <Header as='a'>
                            Change Profile Pic
                        </Header>
                    </Dimmer>
                </Dimmer.Dimmable>

                <Header as='h1'>Jack Ma</Header>

                <Modal
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                    open={open}
                    trigger={<Button content='Change Password' secondary />}
                >
                    <Modal.Header>Change Password</Modal.Header>
                    <Modal.Content>
                        <Form.Field>
                            <Form.Input
                                fluid
                                onChange={handleChange}
                                iconPosition='left'
                                placeholder='Current Password'
                                type="password"
                                name="currpassword"
                            />
                            <Form.Input
                                fluid
                                onChange={handleChange}
                                iconPosition='left'
                                placeholder='New Password'
                                type="password"
                                name="newpassword"
                            />
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
                            positive
                        />
                    </Modal.Actions>
                </Modal>

            </Container>
        </>
    )
}