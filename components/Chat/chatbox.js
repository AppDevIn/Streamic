import React from 'react'
import { Button, Comment, Form, Header } from 'semantic-ui-react'


export default function ChatBox({messages} ) {

    function mapMessagesToItems(messages) {
        
        
        return messages.map(message => (
            <Comment key={message._id}>
                <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
                <Comment.Content>
                    <Comment.Author as='a'>{message.authorID.username}</Comment.Author>
                    <Comment.Metadata>
                        <div>{message.dateTime}</div>
                    </Comment.Metadata>
                    <Comment.Text>{message.messageContent}</Comment.Text>
                </Comment.Content>
            </Comment>
        ));
    }

    return (
        // <Layout>
        <Comment.Group>
            <Header as='h3' dividing>
                Messages
            </Header>

            {mapMessagesToItems(messages)}
        </Comment.Group>
        // </Layout>
    );
}