import React, { useState, useEffect } from 'react';
import sso from '@aftership/sso-basic';

export const UserContext = React.createContext({});

interface SSOData {
  user: any;
  token: any;
}

const UserProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<null | SSOData>(null);
  const [loading, setLoading] = useState(false);

  const getSSO = async () => {
    setLoading(true);
    const token = await sso.getToken();
    const user = await sso.getUser();
    setData({ token, user });
    setLoading(false);
  };
  useEffect(() => {
    getSSO();
  }, []);

  return (
    <UserContext.Provider value={{ loading, data }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
