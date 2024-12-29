import React, { createContext, useContext, useState, useEffect } from "react";
import useAxios from "axios-hooks";

type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  birthday: string;
};

type UsersContextType = {
  users: User[];
  fetchUsers: () => void;
  updateUser: (updateUser: User) => Promise<void>;
  getUserById: (id: number) => User | undefined;
};

const UsersContext = createContext<UsersContextType | undefined>(undefined);

export const UsersProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);

  const [{ data }, refetch] = useAxios(
    `${process.env.REACT_APP_SERVER_BASE_URL}/users`,
  );

  useEffect(() => {
    if (data && data.users) setUsers(data.users);
  }, [data]);

  const fetchUsers = () => {
    refetch();
  };

  const updateUser = async (updatedUser: User) => {
    try {
      await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/users/${updatedUser.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        },
      );

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === updatedUser.id ? updatedUser : user,
        ),
      );
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const getUserById = (id: number) => {
    return users.find((user) => user.id === id);
  };

  return (
    <UsersContext.Provider
      value={{ users, fetchUsers, updateUser, getUserById }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UsersContext);

  if (!context)
    throw new Error("useUsers must be called from within the UsersProvider");

  return context;
};
