import { useState } from "react";
import { UserProvider } from "./contexts/UserContext";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";

function App() {
  const [activeTab, setActiveTab] = useState("form");

  return (
    <UserProvider>
      <div className="container mt-5">
        <div className="text-center mb-4">
          <img
            src="https://www.inovatecjp.com.br/wp-content/uploads/2023/04/LOGO.svg"
            alt="Logo da Inovatec"
            className="img-fluid"
            style={{ maxWidth: "200px" }} 
          />
        </div>

        {/* Título Centralizado */}
        <h1 className="text-center mb-4">Gerenciamento de Usuários</h1>

        {/* Abas de Navegação */}
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a
              href="#"
              className={`nav-link ${activeTab === "form" ? "active" : ""}`}
              onClick={() => setActiveTab("form")}
            >
              Adicionar Usuário
            </a>
          </li>
          <li className="nav-item">
            <a
              href="#"
              className={`nav-link ${activeTab === "list" ? "active" : ""}`}
              onClick={() => setActiveTab("list")}
            >
              Lista de Usuários
            </a>
          </li>
        </ul>

        {/* Conteúdo das Abas */}
        <div className="tab-content mt-4">
          {activeTab === "form" && (
            <div className="tab-pane fade show active">
              <UserForm />
            </div>
          )}
          {activeTab === "list" && (
            <div className="tab-pane fade show active">
              <UserList />
            </div>
          )}
        </div>
      </div>
    </UserProvider>
  );
}

export default App;


