var CONTRACT_ABI = [
	{
		"constant": true,
		"inputs": [],
		"name": "entryFee",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "award",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "registerPlayer",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "awardPot",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getAward",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	}
]

function convertToEthUnit(amount) {
		return amount / 10000;
}

window.addEventListener('load', function() {
  web3js = new Web3(web3.currentProvider);
	var contractAddress = "0x041aCe263A36B3443d29Fc61678e6BB046C8D041";
	var account = web3js.eth.accounts[0];
	var contract = web3js.eth.contract(CONTRACT_ABI).at(contractAddress);
	
	function printCurrentAwardAmount(amount) {
		document.getElementById("award").innerText = `Current amount in play => ${amount} eth`;
	}
	
	contract.getAward((err, res) => {
		if (err) {
			console.log(err);
		} else {
			printCurrentAwardAmount(convertToEthUnit(res.c[0]));
		}
	});
	

  document.getElementById('submit').addEventListener('click', function() {
		// submit your answer
		var answer = document.getElementById('answer').value;
		
    
  });
	
	document.getElementById('register').addEventListener('click', function() {
		// register for the game, pay your fee		
		var answer = document.getElementById('answer').value;
		
		contract.registerPlayer({from: account, gas: 50000, value: 10000}, function(err, res) {
				console.log(err);
				console.log(res);
		})
		
		contract.getAward((err, res) => {
			if (err) {
				console.log(err);
			} else {
				printCurrentAwardAmount(convertToEthUnit(res.c[0]));
			}
		})
			
	});
  
  
  // document.getElementById('set').addEventListener('click', function() {
  //   var contractAddress = document.getElementById('contract-address').value;
  //   var newValue = document.getElementById('set-value').value;
  //   var account = web3js.eth.accounts[0];
  // 
  //   var contract = web3js.eth.contract(CONTRACT_ABI).at(contractAddress);
  //   contract.set(newValue, {value: 0, from: account, to: contractAddress}, function(err, result) {
  //     if (err) {
  //       console.error(err);
  //       return;
  //     }
  //   });
  // });
  // 
  // document.getElementById('get').addEventListener('click', function() {
  //   var contractAddress = document.getElementById('contract-address').value;
  //   var contract = web3js.eth.contract(CONTRACT_ABI).at(contractAddress);
  //   contract.get(function(err, result) {
  //     if (err) {
  //       console.error(err);
  //       return;
  //     }
  //     document.getElementById('get-value').setAttribute('value', result);
  //   });
  // });
});
