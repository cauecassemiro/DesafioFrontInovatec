import { useState } from "react";
import { useUserContext } from "../contexts/UserContext";

const UserForm = () => {
  const { createUser } = useUserContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createUser({ name, email });
    setName("");
    setEmail("");
  };

  return (
    <div>
      <h2>Adicionar Usuário</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Nome" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required
        />
        <button type="submit">Adicionar</button>
      </form>
    </div>
  );
};

export default UserForm;
