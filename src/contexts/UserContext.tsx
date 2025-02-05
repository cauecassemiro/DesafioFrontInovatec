import React, { createContext, useContext, useState, useEffect } from "react";
import { API_URL } from "../config";

// Definição da interface para um usuário
type User = {
  id: number;
  name: string;
  email: string;
};

// Definição da interface do contexto
type UserContextType = {
  users: User[];
  fetchUsers: () => Promise<void>;
  createUser: (user: Omit<User, "id">) => Promise<void>;
  updateUser: (id: number, user: Partial<User>) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/users`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Erro ao buscar usuários", error);
    }
  };

  const createUser = async (user: Omit<User, "id">) => {
    try {
      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (response.ok) fetchUsers();
    } catch (error) {
      console.error("Erro ao criar usuário", error);
    }
  };

  const updateUser = async (id: number, user: Partial<User>) => {
    try {
      const response = await fetch(`${API_URL}/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (response.ok) fetchUsers();
    } catch (error) {
      console.error("Erro ao atualizar usuário", error);
    }
  };

  const deleteUser = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/users/${id}`, {
        method: "DELETE",
      });
      if (response.ok) fetchUsers();
    } catch (error) {
      console.error("Erro ao deletar usuário", error);
    }
  };

  return (
    <UserContext.Provider value={{ users, fetchUsers, createUser, updateUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext deve ser usado dentro de um UserProvider");
  }
  return context;
};
