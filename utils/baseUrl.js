const baseUrl =
    process.env.NODE_ENV === "production" ?
    'https://p2streamic.herokuapp.com/' :
    'http://localhost:3000';

export default baseUrl;