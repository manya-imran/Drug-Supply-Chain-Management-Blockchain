//SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract DrugTrace{
    address payable manufacturer;

    constructor(){
        manufacturer=payable(msg.sender);
    }

    struct Medicine{
        uint id;
        string name;
        string des;
        address manufactureradd;
        address wholesaleradd;
        address pharmacistadd;
        address patientadd;
    }

    Medicine[] public med;
    mapping(uint => Medicine) public medicine;

    function createmeds (uint _id, string memory _name, string memory _des, address _manufactureradd,address _wholesaleradd,address _pharmacistadd, address _patientadd)
    external payable returns (address,address,address,address){
        require(msg.sender==manufacturer,"Only Manufacturer can create Medicines");
        med.push(Medicine(_id,_name,_des,_manufactureradd,_wholesaleradd,_pharmacistadd,_patientadd));
        return(_manufactureradd,_wholesaleradd,_pharmacistadd,_patientadd);
    }

    receive() external payable{}

    fallback() external payable{}
   // function retrieve(uint num) external view returns( Medicine memory){
   //         if(med[num].id==num){
   //         return (medicine[num]);
   //         }
   // }

   function recievepayment()public payable{

   }
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }


    function sendViaCall(address payable _to) public payable {
        _to.transfer(msg.value);
    }

    function wholesaler_get_manufactureraddress(address _wholesaleradd, uint id,uint index_of_med)
    external view returns (address){
            require(msg.sender==_wholesaleradd,"only wholesaler can call this method");
            if(med[index_of_med].id==id){
                return(med[index_of_med].manufactureradd);
            }
            return address(0x0);
        }

    function pharmacist_get_wholesaleraddress(address _pharmacistadd, uint id,uint index_of_med)
    external view returns (address){
            require(msg.sender==_pharmacistadd,"only pharmacist can call this method");
            if(med[index_of_med].id==id){
                return(med[index_of_med].wholesaleradd);
            }
            return address(0x0);
        }

    function patient_payto_manufacturer(address _pharmacistadd,address payable _to, uint id,uint index_of_med)
    public payable {
            require(msg.sender==_pharmacistadd,"only Patient can call this method");
            if(med[index_of_med].id==id){
                _to.transfer(msg.value);
                //return(med[index_of_med].pharmacistadd);
            }
        }

    function patient_get_pharmacistaddress(address _pharmacistadd, uint id,uint index_of_med)
    external view returns(address) {
            require(msg.sender==_pharmacistadd,"only Patient can call this method");
            if(med[index_of_med].id==id){
                return(med[index_of_med].pharmacistadd);
            }
            return address(0x0);
        }

        



}