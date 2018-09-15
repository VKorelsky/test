var CONTRACT_ABI = [
  {
    "constant": false,
    "inputs": [{"name": "newValue", "type": "uint256"}],
    "name": "set",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "get",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];

window.addEventListener('load', function() {
  web3js = new Web3(web3.currentProvider);

  document.getElementById('set').addEventListener('click', function() {
    var contractAddress = document.getElementById('contract-address').value;
    var newValue = document.getElementById('set-value').value;
    var account = web3js.eth.accounts[0];
    
    var contract = web3js.eth.contract(CONTRACT_ABI).at(contractAddress);
    contract.set(newValue, {value: 0, from: account, to: contractAddress}, function(err, result) {
      if (err) {
        console.error(err);
        return;
      }
    });
  });
  
  document.getElementById('get').addEventListener('click', function() {
    var contractAddress = document.getElementById('contract-address').value;
    var contract = web3js.eth.contract(CONTRACT_ABI).at(contractAddress);
    contract.get(function(err, result) {
      if (err) {
        console.error(err);
        return;
      }
      document.getElementById('get-value').setAttribute('value', result);
    });
  });
});
