import React, {useState} from 'react';
import styled from '@emotion/styled';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Resumen from './components/Resumen';
import Resultado from './components/Resultado';
import Spinner from './components/Spinner';

const Contenedor = styled.div`
    max-width: 600px;
    margin: 0 auto;
`;

const ContenedorFormulario = styled.div`
    background-color: #FFFFFF;
    padding: 3rem;
`;

function App() {

  const [resumen, guardarResumen] = useState({
    cotizacion: 0,
    datos: {
    marca: '',
    year: '',
    plan: ''
    }
  });

  const [cargando, guardarCargando] = useState(false);

  return ( 
    <Contenedor>
      <Header
        titulo={'Cotizador de Seguro'}
      />
      <ContenedorFormulario>
        <Formulario
        guardarResumen={guardarResumen}
        guardarCargando={guardarCargando}
        />

        { cargando ? <Spinner /> : null}

        {
        //Ternario para que <Resumen /> solo se muestre si se completo y envio el formulario
        //Para eso validamos que resumen sea distinto a 0, ya que inicializamos la variable en 0. Si tiene un valor
        //distinto es porque se completo y se envio el formulario
        (resumen.cotizacion !== 0 && !cargando) ? <Resumen datos={resumen.datos}/> : null
        }
        
        {
        //Muestro el mensaje inferior solo si no está cargando
        }
        {!cargando ? <Resultado 
          cotizacion={resumen.cotizacion}
        /> : null}
        
        
      </ContenedorFormulario>
    </Contenedor>
  );

}

export default App;
