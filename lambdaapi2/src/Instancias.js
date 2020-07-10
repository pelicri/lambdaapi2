import React, {Component} from 'react';
import {Select} from 'react';
import CInstancias from './Componentes/CInstancias.jsx'

const Http = new XMLHttpRequest();
const url='https://gxgurg4n08.execute-api.us-east-1.amazonaws.com/dev/ec2';

class Instancias extends Component {
    state = {
        multiplo : [
            { value: 'regiao', name: 'Região' },
            { value: 'us-east-1', name: 'us-east-1 - Norte Virgínia' },
            { value: 'us-east-2', name: 'us-east-2 - Ohio' },
            { value: 'us-west-1', name: 'us-west-1 - Norte Califórnia' },
            { value: 'us-west-2', name: 'us-west-2 - Oregon' },

            { value: 'ap-east-1', name: 'ap-east-1 - Hong Kong' },
            { value: 'ap-south-1', name: 'ap-south-1 - Mumbai' },
            { value: 'ap-northeast-2', name: 'ap-northeast-1 - Seul' },
            { value: 'ap-southeast-2', name: 'ap-southeast-2 - Cingapura' },
            { value: 'ap-northeast-1', name: 'ap-northeast-1 - Tóquio' },
            { value: 'ap-southeast-1', name: 'ap-southeast-1 - Cingapura' },

            { value: 'sa-east-1', name: 'sa-east-1 - São Paulo' }
        ],
        selecionado: "cris",
        instanciasAWS: null
        
    }

    optiontab = () => {
        for(let i = 0; i < this.multiplo.length; i++){
           return <option value={this.multiplo}>{this.multiplo}</option>   
          }
    }

    //evento de seleção de Região da AWS e request de instâncias
    handleChange = e => {
        this.setState({selecionado: e.target.value})
        console.log(this.state.regiaoslc)

        switch (e.target.value) {
            //chamada da API para criação do Bucket
            case "us-east-1" :
            case "us-east-2" :
            case "us-west-1" :
            case "us-west-2" :
            case "ap-east-1" :
            case "ap-east-2" :
            case "ap-northeast-2" :
            case "ap-southeast-2" :
            case "ap-northeast-1" :
            case "ap-southeast-1" :
            case "sa-east-1":

            //configuração da variável option usada na chamada de API Fetch
                const options ={
                    method: "GET",
                    headers: {"regiao" : e.target.value}
                }
                
                fetch(url, options)
                    .then(resp => resp.json())
                    .then(json => {
                        this.setState({instanciasAWS:json.body.InstanceStatuses})
                    })
                break;
            }
    }


    render() {
        return (
        <form className="enviar"
        onSubmit={this.envioAssincrono}>

        <div className="container">
            <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4">

                <select name="regiao" 
                        value={this.state.selecionado} 
                        onChange={e => this.handleChange(e)}>
                
                {this.state.multiplo.map((e, key) => {
                    return <option key={key} value={e.value}>{e.name}</option>;
                })}

            </select>
            
            </div>
            <div className="col-md-4"></div>
            </div>
            
            { this.state.instanciasAWS ?
            <div>
            {this.state.instanciasAWS.map((ist, idx )=> {        
                return <CInstancias nome={ist.InstanceId} status={ist.InstanceState.Name} 
                                    key={idst.InstanceIdx}  /> 
            })}  </div> :  null }   
        </div>
                <input type="submit" 
                className="btn"
                style={{fontSize: '19px'}} />           
        </form>
    )}

}
export default Instancias