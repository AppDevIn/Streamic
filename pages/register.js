import React from "react";
import { Grid, Header, Form, Message, Button } from "semantic-ui-react";
import axios from "axios";
import Head from "next/head";
import validator from "email-validator";
import { GoogleLogin } from "react-google-login";
import Layout from "../components/Register/Layout";
import { handleLogin, handleRegister } from "../utils/auth";
import baseUrl from "../utils/baseUrl";

const INITIAL_USER = {
  name: "",
  email: "",
  password: "",
};

const INITIAL_ERROR = {
  isError: false,
  message: "",
};

export default function Register() {
  const [user, setUser] = React.useState(INITIAL_USER);
  const [disabled, setDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [isVaildEmail, setisVaildEmail] = React.useState(true);
  const [error, setError] = React.useState(INITIAL_ERROR);

  React.useEffect(() => {
    const isUser = Object.values(user).every((el) => Boolean(el));
    setDisabled(!isUser);
  }, [user]);

  React.useEffect(() => {
    console.log(error.isError);
    console.log(error.message);
  }, [error]);

  //Put inside the onChange
  function handleChange(event) {
    const { name, value } = event.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  }

  function handleGoogleSubmit(response) {
    console.log(
      "🚀 ~ file: register.js ~ line 48 ~ handleGoogleSubmit ~ response",
      response
    );

    const {
      Es: { kt, wR, bT },
    } = response;
    console.log(
      "🚀 ~ file: register.js ~ line 55 ~ handleGoogleSubmit ~ kt, wR,bT",
      kt,
      wR,
      bT
    );

    const googleUser = {
      name: bT,
      email: kt + "-" + wR,
      password: wR,
    };

    console.log(
      "🚀 ~ file: login.js ~ line 60 ~ handleGoogleSubmit ~ googleUser",
      googleUser
    );

    setUser(googleUser);
    register(googleUser);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    register(user);
  }

  async function register(user) {
    setError(INITIAL_ERROR);

    const isVaild = validator.validate(user.email);
    if (isVaild === false) {
      console.log(
        "🚀 ~ file: register.js ~ line 86 ~ register ~ user.email",
        user.email
      );
      console.log("Invaild email");
      setisVaildEmail(isVaild);
      return;
    }

    try {
      setLoading(true);
      console.log(user);

      const url = `${baseUrl}/api/register`;
      const payload = { ...user };
      const response = await axios.post(url, payload);
      handleRegister(response.data);
    } catch (error) {
      setLoading(false);
      // TODO: Catch the error
      setError({
        isError: true,
        message: error.response.data.message,
      });

      console.log(error, error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <link rel="stylesheet" href="../static/register.css" />
      </Head>
      <Layout>
        <Grid
          textAlign="left"
          style={{ height: "100vh" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450, margin: 55 }}>
            <Header as="h3" color="blue" textAlign="left">
              <a href="/">Back to Home</a>
            </Header>
            {error.isError}
            <Message hidden={isVaildEmail && !error.isError} warning>
              <Message.Header>
                {isVaildEmail ? (
                  <></>
                ) : (
                  <p>The email is not formatted correctly</p>
                )}
                {error.isError ? <p>{error.message}</p> : <></>}
              </Message.Header>
            </Message>
            <Form size="large">
              <Form.Input
                onChange={handleChange}
                name="email"
                iconPosition="left"
                placeholder="Email Address"
              />
              <Form.Input
                onChange={handleChange}
                name="name"
                fluid
                iconPosition="left"
                placeholder="Username"
                type="Username"
              />
              <Form.Input
                onChange={handleChange}
                name="password"
                fluid
                iconPosition="left"
                placeholder="Password"
                type="password"
              />

              <Button
                fluid
                onClick={handleSubmit}
                disabled={disabled}
                type="submit"
              >
                Submit
              </Button>

              <GoogleLogin
                clientId="923560120356-o0qjo2jhb2j0a66l04r1ibb7qm3rseq0.apps.googleusercontent.com"
                render={(renderProps) => (
                  <Button
                    fluid
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    Register with google
                  </Button>
                )}
                buttonText="Login"
                onSuccess={handleGoogleSubmit}
                // onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
            </Form>
          </Grid.Column>
        </Grid>
      </Layout>
    </>
  );
}
