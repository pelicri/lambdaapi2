import React from "react"
import {Fragment} from 'react'
import './CInstancias.css'
//import '!style-loader!css-loader!bootstrap/dist/css/bootstrap.css';


//Componente Funcional ou STATELESS
const CInstancias = (props) => {


        let buttonclass = ""

        if(props.status === "stopped") {
                buttonclass = "buttongreen"
        } else {
                buttonclass = "buttonred"
        }

return <Fragment ><div className="Instancias"><p >Instancia: {props.nome} <br />    
             Status: {props.status} 
             <br /><br /> 
             <button className={buttonclass} onClick={props.click} color="info">
                     On/Off
            </button></p>
             </div></Fragment>

}
export default CInstancias;