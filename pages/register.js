import React from 'react'
import {Grid, Header, Form, Message, Button} from 'semantic-ui-react'
import baseUrl from '../utils/baseUrl'
import axios from 'axios'
import {handleLogin, handleRegister} from '../utils/auth'
import Head from 'next/head'
import Layout from '../components/Register/Layout'
import validator from 'email-validator'

const INITIAL_USER = {
  name:"",
  email:"",
  password:""
}

const INITIAL_ERROR = {
  isError:false,
  message:"" 
}

export default function Register() {

  const [user, setUser] = React.useState(INITIAL_USER);
  const [disabled, setDisabled] = React.useState(true)
  const [loading, setLoading] = React.useState(false)
  const [isVaildEmail, setisVaildEmail] = React.useState(true)
  const [error, setError] = React.useState(INITIAL_ERROR)


  React.useEffect(() => {
    const isUser = Object.values(user).every(el => Boolean(el))
    setDisabled(!isUser);
  },[user])

  React.useEffect(() => {
    console.log(error.isError);
    console.log(error.message);
  },[error])

  //Put inside the onChange 
  function handleChange(event){
    const {name, value} = event.target
    setUser((prevState) => ({...prevState, [name]:value}))
  }

  async function handleSubmit(event){
    event.preventDefault();
    

    setError(INITIAL_ERROR)
    
    const isVaild = validator.validate(user.email)
    if(isVaild === false){
      console.log("Invaild email");
      setisVaildEmail(isVaild)
      return
    }

    

    try {



      setLoading(true)
      console.log(user)

      const url = `${baseUrl}/api/register`
      const payload = {...user}
      const response = await axios.post(url, payload)
      handleRegister(response.data);

    } catch (error){
      setLoading(false)
      // TODO: Catch the error
      setError({
        isError:true,
        message:error.response.data.message
      }
      )
      

      console.log(error, error.response.data.message);

    } finally {
      setLoading(false)
    }
  }


    return (
        <>
        <Head>
          <link rel="stylesheet" href="../static/register.css"/>
        </Head>
        <Layout>
        <Grid  textAlign='left' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 , margin : 55}}>
        <Header as='h3' color='blue' textAlign='left'>
          <a href='/'>Back to Home</a>
        </Header>
            {error.isError}
        <Message hidden={isVaildEmail && (!error.isError)} warning>
          <Message.Header>
            {isVaildEmail ? (<></>) : (<p>The email is not formatted correctly</p>)}
            {error.isError ? (<p>{error.message}</p>) : (<></>) } 
          </Message.Header>
        
        </Message>
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
        
        <Button fluid onClick={handleSubmit} disabled={disabled} type='submit'>Submit</Button>
        
        </Form>
        </Grid.Column>
        </Grid>
        </Layout>
        </>



    )
}

