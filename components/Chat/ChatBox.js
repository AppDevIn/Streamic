import React from 'react'
import { Button, Comment, Form, Header } from 'semantic-ui-react'

export default function ChatBox({messages} ) {

    function mapMessagesToItems(messages) {
        return messages.map(message => (
            <Comment key={message._id}>
                <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
                <Comment.Content>
                    <Comment.Author as='a'>{message.authorID}</Comment.Author>
                    <Comment.Metadata>
                        <div>Today at 5:42PM</div>
                    </Comment.Metadata>
                    <Comment.Text>{message.messageContent}</Comment.Text>
                    <Comment.Actions>
                        <Comment.Action>Reply</Comment.Action>
                    </Comment.Actions>
                </Comment.Content>
            </Comment>
        ));
    }

    return (
        // <Layout>
        <Comment.Group>
            <Header as='h3' dividing>
                Comments
            </Header>

            {mapMessagesToItems(messages)}
        </Comment.Group>
        // </Layout>
    );
}