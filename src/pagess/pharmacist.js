import 'bulma/css/bulma.css'
import React from "react";
import Web3 from 'web3';
import { useState,useEffect } from "react";
import styles from "../styles/drug-trace.module.css"
import  dtdrugTraceContract from "../blockchain/drugs.js"

const Pharmacist = () => {
    //window.eth
    //account, sign MessageChannel, transaction
    //read from blockchain
    const [error, setError] = useState(" ");
    //window.ethereum , this as a provider API that lets us request accounts from meta mask
    const [wsAddr, setWSAddress] = useState(null)
    const [PharmaAddr,setPharmaAddr] = useState(null)
    const [medID, setmedID] = useState(0)
    const [medIndex, setmedIndex] = useState(0)
    
    
    useEffect(() =>{
        getWholesalerHandler()
        
    })
    const updatePharmaAddr= event => {
        setPharmaAddr(event.target.value)
        //console.log(`MedId:: ${event.target.value}`)

    }
    const updateMedID = event => {
        setmedID(event.target.value)
        //console.log(`MedId:: ${event.target.value}`)

    }
    const updateMedIndex = event => {
        setmedIndex(event.target.value)
        //console.log(`MedId:: ${event.target.value}`)

    }

    // pharmacist_get_wholesaleraddress(address _pharmacistadd, uint id,uint index_of_med)
    const getWholesalerHandler = async () => {
        // wholesaleradd, medID, medIndex
        //const WholeSaler = await dtdrugTraceContract.methods.wholesaler_get_manufactureraddress(PharmaAddr, medID, medIndex).call()
        //const mbalance = await drugTraceContract.methods.getBalance().call()
        setWSAddress("0xD8A0E13Bf84fE05aDcb97FFE2005342D69A506A5")
    }
    




    const connectWalletHandler = async () => {
      //“async” before a function means that function will always returns a promise and we can use it to display error if account dosent get connected when on metamask when its asked
      let web3var;
      if (
        typeof window !== "undefined" &&
        typeof window.ethereum !== "undefined"
      ) {
        try {
          const addresses =await window.ethereum.request({ method: "eth_requestAccounts" });
          web3var = new Web3(window.ethereum); //when metamask open on button click on web page and if it says something went wrong switch network to ethereum
          console.log(addresses);
        } catch (err) {
            setError(err.message)
        }
    }else{
        console.log("Install metamask")
    }
    }
    return(
        <div className={styles.main}>
            <title>Drug Trace</title>
            
            <nav className="navbar mt-4 mb-4">
                <div className="container">
                    <div className = "navbar-brand">
                        <h1>Drug Trace Application: Pharmacist</h1>
                    </div>
                    <div className="navbar-end">
                        <button onClick= {connectWalletHandler} className = "button is-primary">Connect Wallet</button>
                    </div>

                </div>
            </nav>
            <section className="mt -5">
                <div className="container">
                    <div className='field'>
                        <label className='label'>Pharmacist</label>
                        <div className='control'>
                            <input onChange = {updatePharmaAddr} className="input" type="text" placeholder="Enter Pharmacist Address..."/>
                            <input onChange = {updateMedID} className="input" type="number" placeholder="Enter MedicineID..."/>
                            <input onChange = {updateMedIndex} className="input" type="number" placeholder="Enter Index of Medicine..."/>                            
                        </div>
                        <button onClick={getWholesalerHandler} className = "button is-primary mt -2">Get WholeSaler Address</button>
                    </div>
                </div>
            </section>
            <section>
                <div className="container">
                    <h2>Wholesaler Address: {wsAddr} </h2>
                </div>
            </section>
            
           <section>
                <div className="container has-text-danger">
                    <p>{error}</p>
                </div>
            </section>
        </div>  
    );
}

export default Pharmacist;