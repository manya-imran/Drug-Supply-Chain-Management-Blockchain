/*import Web3 from 'web3'

//to know whick blockchain to target
// pass link to your goerli blockchain over here
const provider = new Web3.providers.HttpProvider(
    "https://goerli.infura.io/v3/0f6f36e3b4b74976a82aaca737405aaa"
)

const web3 = new Web3(provider)
*/

//variable for abi
// copy abi from blockchain/build
const abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"stateMutability":"payable","type":"fallback"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_des","type":"string"},{"internalType":"address","name":"_manufactureradd","type":"address"},{"internalType":"address","name":"_wholesaleradd","type":"address"},{"internalType":"address","name":"_pharmacistadd","type":"address"},{"internalType":"address","name":"_patientadd","type":"address"}],"name":"createmeds","outputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"med","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"des","type":"string"},{"internalType":"address","name":"manufactureradd","type":"address"},{"internalType":"address","name":"wholesaleradd","type":"address"},{"internalType":"address","name":"pharmacistadd","type":"address"},{"internalType":"address","name":"patientadd","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"medicine","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"des","type":"string"},{"internalType":"address","name":"manufactureradd","type":"address"},{"internalType":"address","name":"wholesaleradd","type":"address"},{"internalType":"address","name":"pharmacistadd","type":"address"},{"internalType":"address","name":"patientadd","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_pharmacistadd","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"index_of_med","type":"uint256"}],"name":"patient_get_pharmacistaddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_pharmacistadd","type":"address"},{"internalType":"address payable","name":"_to","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"index_of_med","type":"uint256"}],"name":"patient_payto_manufacturer","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"_pharmacistadd","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"index_of_med","type":"uint256"}],"name":"pharmacist_get_wholesaleraddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"recievepayment","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address payable","name":"_to","type":"address"}],"name":"sendViaCall","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"_wholesaleradd","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"index_of_med","type":"uint256"}],"name":"wholesaler_get_manufactureraddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"stateMutability":"payable","type":"receive"}]
 

const dtdrugTraceContract = web3 =>{
    return new web3.eth.Contract(
        abi,
        "0x71CB4c2c2ACb9c41413253CB6422D415FbbaD572"
    )
}
// create local copy of contract
// first argument abi
//second = is the contract address of contract deployed on goerli earlier

//const drugTraceContract = new web3.eth.Contract(abi,"0x71CB4c2c2ACb9c41413253CB6422D415FbbaD572")

export default  dtdrugTraceContract