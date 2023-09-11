const Web3 = require("web3").default;
const web3 = new Web3("wss://mainnet.infura.io/ws/v3/<YOUR_PROJECT_ID>");

let options721 = {
  topics: [web3.utils.sha3("ApprovalForAll(address,address,bool)")],
};

web3.eth.subscribe("logs", options721).then((subscription721: any) => {
  subscription721.on("data", (event: any) => {
    if (event.topics.length == 3) {
      let transaction = web3.eth.abi.decodeLog(
        [
          {
            type: "address",
            name: "owner",
            indexed: true,
          },
          {
            type: "address",
            name: "operator",
            indexed: true,
          },
          {
            type: "bool",
            name: "approved",
            indexed: false,
          },
        ],
        event.data,
        [event.topics[1], event.topics[2]]
      );

      console.log(transaction);
    }
  });

  subscription721.on("error", (err: any) => {
    throw err;
  });
});
