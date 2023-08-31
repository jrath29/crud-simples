import GlobalStyle from './styles/Global'
import styled from 'styled-components'
import { toast, ToastContainer } from 'react-toastify'
import { useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import Form from './components/Form'
import Grid from './components/Grid'

const Container = styled.div`
width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`
const Title = styled.h1``

function App() {

  const [users, setUsers] = useState([])
  const [onEdit, setOnEdit] = useState(null)

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3001");
      setUsers(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [setUsers]);

  return (
   <>
     <Container>
      <Title>Usuários</Title>
      <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
      <Grid setOnEdit={setOnEdit} users={users} setUsers={setUsers} />
     </Container>
     <ToastContainer autoClose={3000} positions={toast.POSITION.BOTTOM_LEFT}/>
     <GlobalStyle />

   </>
  );
}

export default App;
