import React, {useState, useContext} from 'react';
import {Navbar, Form, FormControl, Nav} from 'react-bootstrap';
import {ContextContainer} from '../../pages/room';
import { removeCookie } from '../../utils/auth'
import { Button } from 'semantic-ui-react'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

function playerHeader(){

    const {updateLink} = useContext(ContextContainer);

    const [link, setLink] = useState("");

    const submit = (event) => {
        event.preventDefault();
        updateLink(link);
        setLink("")
    }

    const changeLink = (event) => {
        event.preventDefault();
        setLink(event.target.value);
    }

    function logout() {
        console.log("Logging out");
    
        removeCookie("token")
      }

    return <>
    <Navbar className="playerNavbar" variant="dark">
        <Navbar.Brand href="/">
            <img
                alt=""
                src="/static/media/streamix_logo.png"
                width="40"
                height="40"
                className="d-inline-block align-top ml-3"
            />{' '}
        </Navbar.Brand>

        <span id="brandname">Streamic</span>

        <Form inline className="mx-auto" id="searchForm" onSubmit={(e) => submit(e)}>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" id="searchInput" value={link} onChange={(e) => changeLink(e)} />
            <Button id="searchBtn" type="submit"><span className="glyphicon glyphicon-search"></span></Button>
        </Form>

        <Nav className="justify-content-end" text-align="center">
          <Button color='blue' as='a' href="/profile" title="Profile page" > 
          <AccountCircleIcon/>
          </Button>

          <Button color='red' onClick={() => logout()} title="Logout" >            
            <ExitToAppIcon/>
          </Button>
        </Nav >

    </Navbar>
  </>

}

export default playerHeader;