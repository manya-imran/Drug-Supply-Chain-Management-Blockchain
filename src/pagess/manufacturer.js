import 'bulma/css/bulma.css'
import React from "react";
import Web3 from 'web3';
import { useState,useEffect } from "react";
import styles from "../styles/drug-trace.module.css"
import  dtdrugTraceContract from "../blockchain/drugs.js"

//const contractAddress = ""
//const contractABI =  dtdrugTraceContract.abi

//useEffect to load logic, once page has loaded completely
const Manufacturer = () => {
    //window.eth
    //account, sign MessageChannel, transaction
    //read from blockchain
    const [error, setError] = useState(" ");
    const [mbalance, setBalance] = useState("");
    //store input
    const [medID, setmedID]=useState();
    const [medName, setmedName] = useState(" ");
    const [medDes, setmedDes] = useState(" ");
    const [manuAddr, setmanuAddr] = useState(" ");
    const [wsAddr, setwsAddr] = useState(" ");
    const [pharmaAddr, setpharmaAddr] = useState("");
    const [patAddr, setpatAddr] = useState("");
    const [web3, setWeb3] = useState(null)
    const [address,setAddress] =  useState([])
    const [drugTraceContract,setdrugTraceContract] =  useState(null)



    //let web3var;
    // fetch function to get balance from contract
    // and call that using useEffect
    useEffect(() =>{
        if (drugTraceContract && address) getBalanceHandler()
    }, [drugTraceContract,address])

    //function to fetch
    //use web3 instance to interact with smartcontract

    // call-> read without send ether
    // send -> write to blockchain ->buy donut send ether
    const updateManuAddr = event =>{
        setmanuAddr("0xBf17DF76Db6290BeB3D3225F7913Ef6dfE01ce37")
    }
    const updateWSAddr = event =>{
        setwsAddr("0xD8A0E13Bf84fE05aDcb97FFE2005342D69A506A5")
    }
    const updatePharmaAddr = event =>{
        setpharmaAddr("0x2Fef1c4E3f8208Ada13d17A48A82542bB573CC86")
    }
    const updatePatAddr = event =>{
        setpatAddr("0xf6Dd8b98A8CC7AD66656a3eB56a30020EF64c266")
    }

    const getBalanceHandler = async () => {
        // variable to hold the fetched value
        // drugTraceContract declared in blockchain/drugs.js
        const mbalance = await drugTraceContract.methods.getBalance().call()
        //setBalance(mbalance)
        setBalance(0.2)

    }

    const updateMedID = event => {
        setmedID(event.target.value)
        //console.log(`MedId:: ${event.target.value}`)

    }
    const updateMedName = event => {
        setmedName(event.target.value)
        //console.log(`MedId:: ${event.target.value}`)

    }
    

    const updateMedDes = event => {
        setmedDes(event.target.value)
        //console.log(`MedId:: ${event.target.value}`)

    }
    const addMedicineHandler = async() =>{
        await drugTraceContract.methods.createmeds(medID,medName,medDes,manuAddr,wsAddr,pharmaAddr,patAddr).send({
            from: address
        })




    }

    //window.ethereum , this as a provider API that lets us request accounts from meta mask
    const connectWalletHandler = async () => {
      //“async” before a function means that function will always returns a promise and we can use it to display error if account dosent get connected when on metamask when its asked
      //check if Metamask available
      if (
        typeof window !== "undefined" &&
        typeof window.ethereum !== "undefined"
      ) {
        try {
            //request connect
          const addresses =await window.ethereum.request({ method: "eth_requestAccounts" });
          setAddress(addresses)
        
          console.log(addresses.length)
          console.log(addresses[0])
          //set web3 instance
          
          const web3v = new Web3(
            Web3.givenProvider || "http://http://localhost:3000/manufacturer"
          ); //when metamask open on button click on web page and if it says something went wrong switch network to ethereum
          setWeb3(web3v)
          

          /* get list of current accounts*/

          //const account = await web3.getAccounts()
          
          
          
          console.log(address)
          //create local contract copy
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
            <title>Manfacturer</title>

            <div className="navbar-end">
                        <button onClick= {connectWalletHandler} className = "button is-primary">Connect Wallet</button>
            </div>
            
            <nav className="navbar mt-4 mb-4">
                <div className="container">
                    <div className = "navbar-brand">
                        <h1>Manufacturers functions: </h1>
                    </div>

                </div>
            </nav>
            <section>
                <div className="container">
                    <h2>Get Current Balance: {mbalance} </h2>
                    <button onClick={connectWalletHandler} className = "button is-primary mt -2">Get Balance</button>
                </div>
            </section>
            <section className="mt -5">
                <div className="container">
                    <div className='field'>
                        <label className='label'>Create Medicine: Add Information</label>
                        <div className='control'>
                            <input onChange = {updateMedID} className="input" type="number" placeholder="Enter ID..."/>
                            <input onChange = {updateMedName} className="input" type="text" placeholder="Enter Name..."/>
                            <input onChange = {updateMedDes} className="input" type="text" placeholder="Enter Description..."/>  
                            <input onChange = {updateManuAddr} className="input" type="text" placeholder="Enter Manufacturers Address..."/>  
                            <input onChange = {updateWSAddr} className="input" type="text" placeholder="Enter Wholesaler Address..."/>  
                            <input onChange = {updatePharmaAddr} className="input" type="text" placeholder="Enter Pharmacist Address..."/>  
                            <input onChange = {updatePatAddr} className="input" type="text" placeholder="Enter Patient Address..."/>                            
                        </div>
                        <button onClick={addMedicineHandler} className = "button is-primary mt -2">Create</button>
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

export default Manufacturer;