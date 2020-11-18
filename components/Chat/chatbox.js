import React from 'react'
import { Button, Comment, Form, Header } from 'semantic-ui-react'

export default function chatbox({ messages }) {


    function mapMessagesToItems(messages) {
        return messages.map(message => (
            <Comment>
                <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
                <Comment.Content>
                    <Comment.Author as='a'>Matt</Comment.Author>
                    <Comment.Metadata>
                        <div>Today at 5:42PM</div>
                    </Comment.Metadata>
                    <Comment.Text>How artistic!</Comment.Text>
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
