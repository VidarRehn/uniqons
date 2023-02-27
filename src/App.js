import './styles/global.css'
import styled from 'styled-components';
import AppContext from './context/AppContext'
import Header from './components/Header';
import ImageGenerator from "./components/ImageGenerator";
import Loader from './components/Loader';
import { useState } from 'react';

function App() {

  const [loader, setLoader] = useState(false)

  return (
    <AppContext.Provider  value={{ loader, setLoader }}>
      <Loader />
      <Container>
        <Header />
        <ImageGenerator />
      </Container>
    </AppContext.Provider>
  )
}

const Container = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`

export default App;
