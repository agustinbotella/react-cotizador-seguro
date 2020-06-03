import React, {useState} from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import {obtenerDiferenciaYear, calcularMarca, calcularPlan} from '../helper';

const Campo = styled.div`
    display: flex;
    margin-bottom: 1rem;
    align-items: center;
`;
const Label = styled.label`
    flex: 0 0 100px;
`;
const Select = styled.select`
    display: block;
    width: 100%;
    padding: 1rem;
    border: 1px solid #e1e1e1;
    -webkit-appearance: none;
`;

const InputRadio = styled.input`
    margin: 0 1rem;
`;

const Boton = styled.button`
    background-color: #00838F;
    font-size: 16px;
    width: 100%;
    padding: 1rem;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    border: none;
    transition: background-color .3s ease;
    margin-top: 2rem;
    &:hover {
        background-color: #26C6DA;
        cursor: pointer;
    }
`;

const Error = styled.div`
    background-color: red;
    color: white;
    padding: 1rem;
    width:100%;
    text-align: center;
    margin-bottom: 2rem;
`;

const Formulario = ({guardarResumen, guardarCargando}) => {

    const [datos, guardarDatos] = useState({
        marca: '',
        year: '',
        plan: ''
    })

    //State Error
    const [error, guardarError] = useState(false);

    //Extraer los valores del state
    const {marca, year, plan} = datos;

    //Leer los datos del formulario y colocarlos en el state
    const obtenerInformacion = e => {
        guardarDatos({
            ...datos,
            [e.target.name] : e.target.value
        })
    }

    //Cuando el usuario presiona submit
    const cotizarSeguro = e => {
        e.preventDefault();

        //Validamos que se hayan seleccionado todos los campos
        //Usamos .trim() por si alguien decide modificar desde dev tools
        if(marca.trim() === '' || year.trim() === '' || plan.trim() === '') {
            guardarError(true);
            return;
        }

        //En caso de que todos los campos hayan sido seleccionados
        guardarError(false);

        //Base para cotizar. Es el valor con el que se comienza
        let resultado = 2000;

        //Obtener la diferencia de años
        const diferencia = obtenerDiferenciaYear(year);
        console.log('Diferencia: '+diferencia);

        //Por cada año de diferencia restar un 3% al valor vase (resultado)
        resultado -= ( ( diferencia * 3 ) * resultado ) / 100; 
        console.log('Resultado: '+resultado);

        //Asiatico 5% mas //Americano 15% mas //Europeo 30% mas
        //Usamos la funcion calcularMarca, que proviene de un helper
        resultado = resultado * calcularMarca(marca);
        console.log('Resultado: '+resultado);

        //Plan basico 20% mas //Plan completo 50%
        resultado =  parseFloat( resultado * calcularPlan(plan) ).toFixed(2);
        console.log('Resultado: '+resultado);

        //Cambiar State cargando a true para que muestre el spinner
        guardarCargando(true);

        //Enviar el total al componente principal, luego de 2 segundos.
        //Antes cambia cargando a false para que no muestre el spinner
        setTimeout( () => {

                guardarCargando(false);

                guardarResumen({
                cotizacion: Number(resultado),
                datos
                });

        }, 2000);

    }

    return (
        <form
            onSubmit={cotizarSeguro}
        >
            {
            //Ternario para mostrar mensaje de error
            error ? <Error>Todos los campos son obligatorios</Error>  : null
            }

            <Campo>
                <Label>Marca: </Label>
                <Select
                    name="marca"
                    value={marca}
                    onChange={obtenerInformacion}    
                >
                    <option value="">-- Seleccione --</option>
                    <option value="americano">Americano</option>
                    <option value="europeo">Europeo</option>
                    <option value="asiatico">Asiatico</option>
                </Select>
            </Campo>
            <Campo>
                <Label>Año: </Label>
                <Select
                    name="year"
                    value={year}
                    onChange={obtenerInformacion}
                >
                    <option value="">-- Seleccione --</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
                </Select>
            </Campo>
            <Campo>
            <Label>Plan: </Label>
                <InputRadio
                    type="radio"
                    name="plan"
                    value="basico"
                    checked={plan === "basico"}
                    onChange={obtenerInformacion}
                /> Basico
                <InputRadio
                    type="radio"
                    name="plan"
                    value="completo"
                    checked={plan === "completo"}
                    onChange={obtenerInformacion}
                />Completo
            </Campo>

            <Boton type="submit">Cotizar</Boton>
        </form>
    );
}

Formulario.propTypes = {
    guardarCargando: PropTypes.func.isRequired,
    guardarResumen: PropTypes.func.isRequired
}

export default Formulario;