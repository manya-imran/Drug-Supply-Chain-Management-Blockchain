import 'bulma/css/bulma.css'
import React from "react";
import Web3 from 'web3';
import { useState, useEffect } from "react";
import styles from "../styles/drug-trace.module.css"
import  dtdrugTraceContract from "../blockchain/drugs.js"

const Patient = () => {
    //window.eth
    //account, sign MessageChannel, transaction
    //read from blockchain
    const [error, setError] = useState(" ");
    //window.ethereum , this as a provider API that lets us request accounts from meta mask
    
    const [PharmaAddr,setPharmaAddr] = useState(null)
    const [manuAddr,setManuAddr] = useState(null)
    const [patAddr, setPatAddr] = useState(null)
    const [medID, setmedID] = useState(0)
    const [medIndex, setmedIndex] = useState(0)
    const [web3, setWeb3] = useState(null)
    const [address,setAddress] =  useState(null)
    const [drugTraceContract,setdrugTraceContract] =  useState(null)


    useEffect(() =>{
        getPharmaHandler()
    })

    const updateManuAddr= event => {
        setManuAddr(event.target.value)
        //console.log(`MedId:: ${event.target.value}`)

    }
    

    const updatePatAddr= event => {
        setPatAddr(event.target.value)
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

    // patient_get_pharmacistaddress
    const getPharmaHandler = async () => {
        // wholesaleradd, medID, medIndex
        //const Pharmacist = await dtdrugTraceContract.methods.patient_get_pharmacistaddress(patAddr, medID, medIndex).call()
        //const mbalance = await drugTraceContract.methods.getBalance().call()
        setPharmaAddr("0x2Fef1c4E3f8208Ada13d17A48A82542bB573CC86")
    }

    // pay to manfacturer
    // patient_payto_manufacturer(address _pharmacistadd,address payable _to, uint id,uint index_of_med)
    const payForMedicine = async () => {
        try{
            await dtdrugTraceContract.methods.patient_payto_manufacturer(patAddr, manuAddr, medID, medIndex).send({
                from: patAddr,
                value: web3.utils.toWei('0.0001','ether')

            })

        }catch(err){
            setError(err.message)
        }
        
    }
    


    //PAY

    const connectWalletHandler = async () => {
      //“async” before a function means that function will always returns a promise and we can use it to display error if account dosent get connected when on metamask when its asked
 
      if (
        typeof window !== "undefined" &&
        typeof window.ethereum !== "undefined"
      ) {
        try {
          const addresses =await window.ethereum.request({ method: "eth_requestAccounts" });
          web3 = new Web3(window.ethereum); //when metamask open on button click on web page and if it says something went wrong switch network to ethereum
          setWeb3(web3)
          const account = await web3.getAccounts()
          
          setAddress(account[0])
          const web3v = new Web3(
            Web3.givenProvider || "http://http://localhost:3000/manufacturer"
          ); //when metamask open on button click on web page and if it says something went wrong switch network to ethereum
          setWeb3(web3v)

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
                        <h1>Drug Trace Application: Patient</h1>
                    </div>
                    <div className="navbar-end">
                        <button onClick= {connectWalletHandler} className = "button is-primary">Connect Wallet</button>
                    </div>

                </div>
            </nav>
            <section className="mt -5">
                <div className="container">
                    <div className='field'>
                        <label className='label'>Patient</label>
                        <div className='control'>
                            <input onChange = {updatePatAddr} className="input" type="text" placeholder="Enter Patient Address..."/>
                            <input onChange = {updateMedID} className="input" type="number" placeholder="Enter MedicineID..."/>
                            <input onChange = {updateMedIndex} className="input" type="number" placeholder="Enter Index of Medicine..."/>                            
                        </div>
                        <button onClick={getPharmaHandler} className = "button is-primary mt -2">Get Pharmacist Address</button>
                    </div>
                </div>
            </section>
            <section>
                <div className="container">
                    <h2>Pharmacist Address: {PharmaAddr} </h2>
                </div>
            </section>

            <section>
                <div className="container">
                <div className='field'>
                        <label className='label'>Payment</label>
                        <div className='control'>
                            <input onChange = {updateManuAddr} className="input" type="text" placeholder="Enter Manufacturer Address..."/>
                        </div>
                        <button onClick={payForMedicine} className = "button is-primary mt -2">Pay</button>
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

export default Patient;