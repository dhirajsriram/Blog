import React from "react";

export const blogApi = {
    apiUrl:"https://content.googleapis.com/blogger/v3/blogs/15045980/posts/",
    key:"AIzaSyCnz169tp7MAkt0ef4AF4Xc_mBNFpU-aas"
  };
  
  export const blogContext = React.createContext(
    blogApi // default value
  );