import 'bulma/css/bulma.css'
import React from "react";
import Web3 from 'web3';
import { useState, useEffect } from "react";
import styles from "../styles/drug-trace.module.css"
import  dtdrugTraceContract from "../blockchain/drugs.js"

const Wholesaler = () => {
    //window.eth
    //account, sign MessageChannel, transaction
    //read from blockchain
    const [error, setError] = useState(" ");
    const [manuAddr, setManuAddress] = useState(null)
    const [WSAddr,setmedWSAddr] = useState(null)
    const [medID, setmedID] = useState(0)
    const [medIndex, setmedIndex] = useState(0)
    const [drugTraceContract,setdrugTraceContract] =  useState(null)
    const [web3, setWeb3] = useState(null)
    
    
    useEffect(() =>{
        getManufacturesAddressHandler()
    })

    const updateWSAddr= event => {
        setmedWSAddr(event.target.value)
        //console.log(`MedId:: ${event.target.value}`)

    }
    const updateMedID = event => {
        //setmedID(event.target.value)
        console.log(`MedId:: ${event.target.value}`)

    }
    const updateMedIndex = event => {
        setmedIndex(event.target.value)
        //console.log(`MedId:: ${event.target.value}`)

    }
    const set = async() =>
    {
        setManuAddress(null)
    }
    

    //get Manufacturer's address
    // get_manufactureraddress
    
    const getManufacturesAddressHandler = async () => {
        // wholesaleradd, medID, medIndex
        //const Manfacturer = await dtdrugTraceContract.methods.wholesaler_get_manufactureraddress(WSAddr, medID, medIndex).call()
       //
       setManuAddress("0xBf17DF76Db6290BeB3D3225F7913Ef6dfE01ce37")



    }
    //window.ethereum , this as a provider API that lets us request accounts from meta mask
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
          setManuAddress(null)

          const dt = dtdrugTraceContract(web3)
          setdrugTraceContract(dt)
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
                        <h1>Drug Trace Application: WholeSaler</h1>
                    </div>
                    <div className="navbar-end">
                        <button onClick= {connectWalletHandler} className = "button is-primary">Connect Wallet</button>
                    </div>

                </div>
            </nav>
            <section className="mt -5">
                <div className="container">
                    <div className='field'>
                        <label className='label'>WholeSaler</label>
                        <div className='control'>
                            <input onChange = {updateWSAddr} className="input" type="text" placeholder="Enter WholeSaler Address..."/>
                            <input onChange = {updateMedID} className="input" type="number" placeholder="Enter MedicineID..."/>
                            <input onChange = {updateMedIndex} className="input" type="number" placeholder="Enter Index of Medicine..."/>                            
                        </div>
                        <button onClick={set} className = "button is-primary mt -2">Submit</button>
                    </div>
                </div>
            </section>
            <section>
                <div  className='field'>
            
                <button onClick={getManufacturesAddressHandler} className = "button is-primary mt -2">Get Manufacturer Address</button>
                <div className="container">
                    <h2>Manfacturer Address: {manuAddr} </h2>
                </div>
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

export default Wholesaler;