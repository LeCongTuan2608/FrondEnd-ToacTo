import { createContext, useEffect, useState } from 'react';

export const JwtContext = createContext({});

export const JwtProvider = ({ children }) => {
   const [jwt, setJwt] = useState({
      type: 'Bearer',
      token: null,
   });
   //    useEffect(() => {
   //       localStorage.setItem('token', jwt.token);
   //    }, [jwt]);
   return <JwtContext.Provider value={{ jwt, setJwt }}>{children}</JwtContext.Provider>;
};
