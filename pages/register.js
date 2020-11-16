import React from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'
import baseUrl from '../utils/baseUrl'
import axios from 'axios'

const INITIAL_USER = {
  name:"",
  email:"dsds",
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
      await axios.post(url, payload)

    } catch (error){
      setLoading(false)
      // TODO: Catch the error

    } finally {
      setLoading(false)
    }
  }


    return (
    <>
      <Form loading={loading}>
        <Form.Field>
          <label>First Name</label>
          <input onChange={handleChange} name="name" placeholder='First Name' />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input onChange={handleChange} name="password" placeholder='Last Name' />
        </Form.Field>
        <Button onClick={handleSubmit} active={disabled || loading} type='submit'>Submit</Button>
      </Form>

    </>
    )
}