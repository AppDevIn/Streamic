import React from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

const LoginForm = () => (
  <Grid textAlign='left' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 , margin : 50}}>
    <Header as='h3' color='blue' textAlign='left'>
        <a href='/'>Back to Home</a>
      </Header>
      <Form size='large'>
          <Form.Input iconPosition='left' placeholder='Email Address' />
          <Form.Input
            fluid
            iconPosition='left'
            placeholder='Password'
            type='password'
          />
      <Message >
          <a href='/register'>Sign Up</a> . <a href='/forgotpassword'>Forgot Password</a> . <a href='/api/login'>Log In</a>
      </Message>
      </Form>
    </Grid.Column>
  </Grid>
)

export default LoginForm