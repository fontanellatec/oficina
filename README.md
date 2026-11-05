# Fontanella ERP — Módulo Oficina

Módulo web de gestão e apontamento de Ordens de Serviço (O.S.) e controle de mecânicos da frota da **Fontanella Transportes**.

Integrado ao ecossistema ERP Fontanella sob o caminho base `/app/oficina`.

---

## 🛠️ Tecnologias Utilizadas

* **React** 17.0.2 (Create React App)
* **React Router DOM** 6.17.0
* **Material-UI** (@mui/material 5.9.3, @material-ui/core 4.12.4)
* **Axios** 0.27.2
* **React Bootstrap** & **Bootstrap** 5.2.0
* **Chart.js** & **React-Chartjs-2**
* **React Input Mask** & **Dayjs** / **Date-fns**

---

## 🧭 Rotas Principais

A aplicação opera com `basename="/app/oficina"`:

| Rota | Componente | Descrição |
| :--- | :--- | :--- |
| `/login` | `Login` | Tela de autenticação de usuários e mecânicos |
| `/` | `OrdemServico` | Listagem e gerenciamento de Ordens de Serviço |
| `/mecanico` | `Mecanico` | Apontamento de O.S. via QR Code / crachá do mecânico |

---

## 🚀 Instalação e Execução

### Pré-requisitos
* Node.js (recomendado v16 ou v18, ou v20+ com `--openssl-legacy-provider`)
* npm

### Instalar dependências
```bash
npm install --legacy-peer-deps
```

### Executar em desenvolvimento
```bash
npm start
```
A aplicação abrirá em `http://localhost:3000/app/oficina`.

### Gerar build de produção
```bash
npm run build
```
Os arquivos otimizados e minificados serão gerados no diretório `/build`.

---

## 🌐 Integração com a API

A comunicação com o backend é configurada em `src/services/api.jsx`, apontando dinamicamente conforme o ambiente:
* **Produção:** `https://erp.fontanellatransportes.com.br/api/?/app/oficina`
* **Rede Interna:** `http://192.168.0.12/api/?/app/oficina`
