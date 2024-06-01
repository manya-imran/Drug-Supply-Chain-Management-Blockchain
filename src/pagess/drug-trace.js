import 'bulma/css/bulma.css'
import React from "react";
import Web3 from 'web3';
import { useState } from "react";
import styles from "../styles/drug-trace.module.css"

const DrugTrace = () => {
    //window.eth
    //account, sign MessageChannel, transaction
    //read from blockchain
    const [error, setError] = useState(" ");
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
                        <h1>Drug Trace Application</h1>
                    </div>
                    <div className="navbar-end">
                        <button onClick= {connectWalletHandler} className = "button is-primary">Connect Wallet</button>
                    </div>

                </div>
            </nav>
            <section>
                <div className="container">
                    <p>Line 1</p>
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

export default DrugTrace;