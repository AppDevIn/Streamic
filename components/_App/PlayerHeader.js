import React, {useState, useContext} from 'react';
import {Navbar, Form, FormControl, Button, Nav} from 'react-bootstrap';
import {ContextContainer} from '../../pages/player';

function playerHeader(){

    const {updateLink} = useContext(ContextContainer);

    const [link, setLink] = useState("");

    const submit = () => {
        updateLink(link);
    }

    const changeLink = (event) => {
        event.preventDefault();
        setLink(event.target.value);
    }

    return <>
    <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#">
            <img
                alt=""
                src="/static/media/youtube.png"
                width="40"
                height="40"
                className="d-inline-block align-top ml-3"
            />{' '}
        </Navbar.Brand>

        <span id="brandname">Streamic</span>

        <Form inline className="mx-auto" id="searchForm" onSubmit={submit}>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" id="searchInput" value={link} onChange={(e) => changeLink(e)} />
            <Button id="searchBtn" type="submit"><span className="glyphicon glyphicon-search"></span></Button>
        </Form>

    </Navbar>
  </>

}

export default playerHeader;