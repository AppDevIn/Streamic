import React, { useEffect, useState } from 'react'
import { Container } from "semantic-ui-react"
import PlayerHeader from "../components/_App/PlayerHeader"
import Player from '../components/Player/Player'


// Create context container in a global scope so it can be visible by every component
const ContextContainer = React.createContext(null);

function PlayerBase(props) {

    const [parent_link, updateLink] = useState("");
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        document.body.style.backgroundColor = "#242A2E";
        if (socket == null) {
            setSocket(io());
        }
    }, [])

    return (
        <ContextContainer.Provider value={ { parent_link, updateLink, socket, setSocket } }>
          <PlayerHeader />
          <Container fluid className="mt-5 ct">
            <Player {...props}/>
          </Container>
        </ContextContainer.Provider>

    )
}

export { ContextContainer };
export default PlayerBase;
