import { useUserContext } from "../contexts/UserContext";

const UserList = () => {
  const { users, deleteUser } = useUserContext();

  return (
    <div>
      <h2>Lista de Usuários</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <span>{user.name} - {user.email}</span>
            <button className="delete" onClick={() => deleteUser(user.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;

