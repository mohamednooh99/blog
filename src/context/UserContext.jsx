import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

import React from "react";
import { getUsers } from "../services/api";

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data } = await getUsers();
      setUsers(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    fetchUsers();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, users, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
