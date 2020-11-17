import Head from "next/head";

function Layout({ children }) {
    return (
      <>
        <div style={{ padding: "3em" }}>
          {children}
        </div> 
      </>
    );
  }
  
  export default Layout;
  