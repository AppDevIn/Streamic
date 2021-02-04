import React, { useEffect, useRef } from 'react'
import { Button, Form, Comment, Header } from 'semantic-ui-react'
import moment from 'moment'

function fetchUser(userID) {
    return
}

export default function ChatBox({messages}) {
    const dummy = useRef();

    useEffect(() => {
        dummy.current.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'start'
        });
    })

    function mapMessagesToItems(messages) {

        return messages.map(message => (

            <Comment key={ message._id } className="messages_content">
              <Comment.Avatar src={ message.authorID.photo } />
              <Comment.Content>
                <span>
                                                                                                                                                <Comment.Author as='a'>{ message.authorID.username }</Comment.Author>
                                                                                                                                                <Comment.Metadata>
                                                                                                                                                    <div>{ moment(message.dateTime).format("LT") }</div>
                                                                                                                                                </Comment.Metadata>
                                                                                                                                            </span>
                <Comment.Text>
                  { message.messageContent }
                </Comment.Text>
              </Comment.Content>
            </Comment>
        ));
    }

    return (
        // <Layout>
        <Comment.Group className="chat-messages">
          <Header as='h3' dividing>
            Messages
          </Header>
          { mapMessagesToItems(messages) }
          <div ref={ dummy }></div>
        </Comment.Group>



        );
}

