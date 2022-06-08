import web3 from "./web3";
import { abi, lotteryContractAddress } from "./data/lotteryData";

export default new web3.eth.Contract(abi, lotteryContractAddress);
