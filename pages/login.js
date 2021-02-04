import React, { useRef } from "react";
import { Grid, Header, Form, Message, Button } from "semantic-ui-react";
import baseUrl from "../utils/baseUrl";
import axios from "axios";
import { handleLogin, handleRegister } from "../utils/auth";
import Head from "next/head";
import Layout from "../components/Register/Layout";
import { GoogleLogin } from "react-google-login";

const INITIAL_USER = {
  email: "",
  password: "",
};

const INITIAL_ERROR = {
  isError: false,
  message: "",
};

export default function Login(props) {
  const [user, setUser] = React.useState(INITIAL_USER);

  const [disabled, setDisabled] = React.useState(true);
  const [error, setError] = React.useState(INITIAL_ERROR);
  const [loading, setLoading] = React.useState(false);
  const formInput = useRef();

  React.useEffect(() => {
    const isUser = Object.values(user).every((el) => Boolean(el));
    setDisabled(!isUser);
  }, [user]);

  //Put inside the onChange
  function handleChange(event) {
    const { name, value } = event.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
    console.log(user);
  }

  function handleGoogleSubmit(response) {
    console.log(
      "🚀 ~ file: login.js ~ line 50 ~ handleGoogleSubmit ~ response",
      response
    );

    const {
      Es: { kt, wR },
    } = response;
    console.log("🚀 ~ file: login.js ~ line 53 ~ handleGoogleSubmit ~ wR", wR);
    console.log("🚀 ~ file: login.js ~ line 52 ~ handleGoogleSubmit ~ kt", kt);

    const googleUser = {
      email: kt + "-" + wR,
      password: wR,
    };
    console.log(
      "🚀 ~ file: login.js ~ line 65 ~ handleGoogleSubmit ~ googleUser",
      googleUser
    );

    setUser(googleUser);

    login(googleUser);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    login(user);
  }

  async function login(user) {
    try {
      setLoading(true);
      console.log("Submitting", user);

      const url = `${baseUrl}/api/login`;
      const payload = { ...user };
      const response = await axios.post(url, payload);

      handleLogin(response.data);

      setError(INITIAL_ERROR);
    } catch (error) {
      setLoading(false);
      // TODO: Catch the error
      //set the Error Message

      setError({
        isError: true,
        message: error.response.data.message,
      });

      console.log("Error for login", error);
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
            <Message hidden={!error.isError} negative>
              <Message.Header>{error.message}</Message.Header>
            </Message>
            <Form size="large">
              <Form.Input
                onChange={handleChange}
                name="email"
                fluid
                iconPosition="left"
                placeholder="Email"
                type="Email"
              />
              <Form.Input
                onChange={handleChange}
                name="password"
                fluid
                iconPosition="left"
                placeholder="Password"
                type="password"
              />
              <GoogleLogin
                clientId="923560120356-o0qjo2jhb2j0a66l04r1ibb7qm3rseq0.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={handleGoogleSubmit}
                // onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
              <Message>
                <a href="/register">Sign Up</a> .{" "}
                <a href="/forgotpassword">Forgot Password</a> .{" "}
                <a disabled onClick={handleSubmit}>
                  Log In
                </a>
              </Message>
            </Form>
          </Grid.Column>
        </Grid>
      </Layout>
    </>
  );
}
