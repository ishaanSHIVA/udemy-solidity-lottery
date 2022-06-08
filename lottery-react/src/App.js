import logo from "./logo.svg";
import "./App.css";
import React from "react";
import web3 from "./web3";
import lottery from "./lottery";

class App extends React.Component {
  state = {
    manager: "",
    players: [],
    balance: 0,
    value: "",
    messages: "",
  };
  constructor(props) {
    super(props);
    // this.handleInputChange = this.handleInputChange.bind(this);
  }

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();

    const players = await lottery.methods.getPlayers().call();

    const balance = await web3.eth.getBalance(lottery.options.address);

    console.log(this.state.value);

    this.setState({
      manager,
      players,
      balance,
    });
  }

  onSubmit = async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({
      messages: "Waiting for transaction!!!",
    });

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value),
    });

    this.setState({
      messages: "You have entered!!!",
    });
  };

  onWin = async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({
      messages: "Waiting for transaction!!!",
    });

    await lottery.methods.pickWinner().send({
      from: accounts[0],
    });

    const winner = lottery.methods.winner().call()[0];

    if (winner) {
      this.setState({
        messages: `${winner} won`,
      });
    }
  };

  render() {
    web3.eth.getAccounts().then(console.log);
    return (
      <div className="">
        <h2>Lottery Contract</h2>
        <p>This contract is managed by {this.state.manager}</p>
        <p>
          There are currently {this.state.players.length} players competing to
          win {web3.utils.fromWei(String(this.state.balance), "ether")} ethers
        </p>

        <hr />
        <form onSubmit={this.onSubmit}>
          <h4>Want to try your luck!</h4>
          <div className="">
            <label htmlFor="">Amount of ether to enter :-</label>
            <input
              type="text"
              value={this.state.value}
              onChange={(event) => this.setState({ value: event.target.value })}
            />
            <button>Enter</button>
          </div>
        </form>
        <h1>{this.state.messages}</h1>
        <button onClick={this.onWin}>Pick Winner</button>
      </div>
    );
  }
}
export default App;
