import React from "react"
import {Fragment} from 'react'

//Componente Funcional ou STATELESS
const CInstancias = (props) => {

return <React.Fragment ><div><p>Instancia: {props.nome} |
             Status: {props.status} </p></div></React.Fragment>

}
export default CInstancias;