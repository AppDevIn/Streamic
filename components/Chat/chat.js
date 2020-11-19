import React from 'react'
import { Button, Form, Comment, Header } from 'semantic-ui-react'
import moment from 'moment'

export default function ChatBox({ messages }) {

    function mapMessagesToItems(messages) {


        return messages.map(message => (
            <Comment key={message._id} className="messages_content">
                <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
                <Comment.Content >
                    <Comment.Author as='a'>{message.authorID.username}</Comment.Author>
                    <Comment.Metadata>
                        <div>{moment(message.dateTime).format("lll")}</div>
                    </Comment.Metadata>
                    <Comment.Text>{message.messageContent}</Comment.Text>
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
            {mapMessagesToItems(messages)}
        </Comment.Group>



    );
}

