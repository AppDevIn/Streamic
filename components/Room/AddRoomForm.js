import React, { useState } from 'react';
import { Form } from 'semantic-ui-react'

function AddRoomForm() {
  const [roomName, setName] = useState("")

  function handleChange(event) {
    const { name, value } = event.target
    setName((prevState) => ({ ...prevState, [name]: value }))
    console.log(roomName)
  }

  return (
    <Form size='large'>
      <Form.Input
        value=""
        onChange={handleChange}
        name="name"
        fluid
        iconPosition='left'
        placeholder='Room Name'
        type="password"
      />
    </Form>
  )

}

export default AddRoomForm