import React, {Component} from 'react';
import {Select} from 'react';
import CInstancias from './Componentes/CInstancias.jsx'

const Http = new XMLHttpRequest();
const url='https://gxgurg4n08.execute-api.us-east-1.amazonaws.com/dev/ec2';
const urlon='https://gxgurg4n08.execute-api.us-east-1.amazonaws.com/dev/ec2/ligar';
const urloff='https://gxgurg4n08.execute-api.us-east-1.amazonaws.com/dev/ec2/desligar';


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
        regiaoslc: "Região",
        instanciasAWS: null
        
    }

    changeStatus = (IDX) => {
        const options = {
            method: "POST",
            headers: {"regiao" : this.state.regiaoslc, "nomeinst": this.state.instanciasAWS[IDX].InstanceId}
        }
        console.log(this.state.instanciasAWS[IDX].InstanceState.Name)
        console.log(this.state.instanciasAWS[IDX].InstanceState.InstanceId)
        if(this.state.instanciasAWS[IDX].InstanceState.Name === "stopped"){
            this.callAPIposton(options, IDX)
        }else{
            this.callAPIpostoff(options, IDX)
        }
        
    }

    callAPIget = (options) =>{
        console.log(options)
        fetch(url, options)
        .then(resp => resp.json())
        .then(json => {
            this.setState({instanciasAWS:json.body.InstanceStatuses})
        })
    }

    callAPIposton = (options, IDX) =>{
        console.log(options)
        fetch(urlon, options)
        .then(resp => resp.json())
        .then(json => {
            //this.changeStatus(this.regiaoslc)
            console.log(json.body)
            const changedInst = [...this.state.instanciasAWS]
            changedInst[IDX].InstanceState.Name = "running"
            this.setState({instanciasAWS:changedInst})
        })
    }

    callAPIpostoff = (options, IDX) =>{
        console.log(options)
        fetch(urloff, options)
        .then(resp => resp.json())
        .then(json => {
            //handleChange(this.regiao)
            console.log(json.body)
            const changedInst = [...this.state.instanciasAWS]
            changedInst[IDX].InstanceState.Name = "stopped"
            this.setState({instanciasAWS:changedInst})
        })
    }

    optiontab = () => {
        for(let i = 0; i < this.multiplo.length; i++){
           return <option value={this.multiplo}>{this.multiplo}</option>   
          }
    }

    //evento de seleção de Região da AWS e request de instâncias
    handleChange = e => {
        this.setState({regiaoslc: e.target.value})
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
                const options = {
                    method: "GET",
                    headers: {"regiao" : e.target.value}
                }
                //chama APIgateway
                this.callAPIget(options)
                break;
            }
    }


    render() {
        return (
        <div className="container">
            <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4">

                <select name="regiao" 
                        value={this.state.regiaoslc} 
                        onChange={e => this.handleChange(e)}>
                
                {this.state.multiplo.map((e, key) => {
                    return <option key={key} 
                                   value={e.value}
                                   >{e.name}</option>;
                })}

            </select>
            
            </div>
            <div className="col-md-4"></div>
            </div>
            
            { this.state.instanciasAWS ?
            <div>
            {this.state.instanciasAWS.map((ist, idx )=> {        
                return <CInstancias nome={ist.InstanceId} status={ist.InstanceState.Name} 
                                    key={ist.InstanceId} click={() => this.changeStatus(idx)} /> 
            })}  </div> :  null }   
        </div>

    )}

}
export default Instancias