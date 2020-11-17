import React from 'react'
import {Grid, Header, Form, Message, Button} from 'semantic-ui-react'
import baseUrl from '../utils/baseUrl'
import axios from 'axios'
import {handleLogin} from '../utils/auth'
import Head from 'next/head'

const INITIAL_USER = {
  name:"",
  email:"jeyavishnu22@yahoo.com",
  password:""

}

export default function Register() {

  const [user, setUser] = React.useState(INITIAL_USER);
  const [disabled, setDisabled] = React.useState(true)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    const isUser = Object.values(user).every(el => Boolean(el))
    setDisabled(!isUser);
  },[user])

  //Put inside the onChange 
  function handleChange(event){
    const {name, value} = event.target
    setUser((prevState) => ({...prevState, [name]:value}))
  }

  async function handleSubmit(event){
    event.preventDefault();
    try {
      setLoading(true)
      console.log(user)

      const url = `${baseUrl}/api/register`
      const payload = {...user}
      const response = await axios.post(url, payload)
      handleLogin(response.data);

    } catch (error){
      setLoading(false)
      // TODO: Catch the error
      console.log(error);

    } finally {
      setLoading(false)
    }
  }


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
            <Form.Input
            onChange={handleChange}
            name="email"
            iconPosition='left' placeholder='Email Address' />
            <Form.Input 
              onChange={handleChange}
              name="name"
              fluid
              iconPosition='left'
              placeholder='Username'
              type='Username'
            />  
             <Form.Input 
              onChange={handleChange}
              name="password"
              fluid
              iconPosition='left'
              placeholder='Password'
              type='password'
            />
        
        <Button fluid onClick={handleSubmit} active={disabled || loading} type='submit'>Submit</Button>
        
        </Form>
        </Grid.Column>
        </Grid>
        </div>
        </>



    )
}

