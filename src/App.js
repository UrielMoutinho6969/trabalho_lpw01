import React, {useState,useEffect} from 'react';

import './App.css';

function App() {
  const [codibge, setCodibge] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [estado, setEstado] = useState("");
  const [cadastros, setCadastros] = useState([]);
  function handleSubmit(e) {
    console.log(codibge)
    if(codibge == "" || municipio == "" || estado == ""){
      alert("Algum campo esta faltando verifique e envie novamente");
      return;
    }

    e.preventDefault();
    setCadastros([...cadastros, {
      id:new Date().getTime(),
      codibge,
      municipio,
      estado,
    }]);
    setCodibge("");
    setMunicipio("");
    setEstado("");
  }

  useEffect(() => {
    const NewCadastros = localStorage.getItem("@IBGE:cadastros");
    setCadastros(JSON.parse(NewCadastros));
  }, []);

  useEffect(() => {
    localStorage.setItem("@IBGE:cadastros", JSON.stringify(cadastros));
  }, [cadastros]);
  function handleDelete(id) {
    setCadastros(cadastros.filter((item) => item.id !== id));
  }
  return (
    <div className="page">
    <form className="cadastro" onSubmit={handleSubmit}>
          <div>
            <h2 className = "IBGEtitle">Cadastro IBGE</h2>
            <label htmlFor="codibge">Codigo do IBGE</label>
            <input
              type="text"
              name="codibge"
              value={codibge}
              onChange={(e) => {
                setCodibge(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="municipio">Município</label>
            <input
              type="text"
              name="municipio"
              value={municipio}
              onChange={(e) => {
                setMunicipio(e.target.value);
              }}
            />
          </div>
          <div>
          <label htmlFor="estado">Estado</label>
            <input
              type="text"
              name="estado"
              value={estado}
              onChange={(e) => {
              setEstado(e.target.value);
              }}
            />
          </div>
          <button>Enviar</button>
          
    </form>
    <table>
    <thead>
              <tr>
                <th>Codigo IBGE</th>
                <th>Município</th>
                <th>Estado</th>
                <th colSpan={1}>Opções</th>
              </tr>
            </thead>
            <tbody>
              {cadastros.map((item, ind) => (
                <tr key={ind}>
                  <td>{item.codibge}</td>
                  <td>{item.municipio}</td>
                  <td>{item.estado}</td>
                  <td colSpan={1}>
                    <button className="Excluir"
                      onClick={() => {
                        handleDelete(item.id);
                      }}
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

    </div>
    
  );
}

export default App;
