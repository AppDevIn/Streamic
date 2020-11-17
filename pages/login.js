import {Grid, Header, Form, Message} from 'semantic-ui-react'
import Head from 'next/head'



export default function Login() {
    return (
      <>
      <Head>
        <link rel="stylesheet" href="../static/register.css"/>
      </Head>
    <div>
      <Grid  textAlign='left' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 , margin : 55}}>
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
    </div>
  </>
    )
  }