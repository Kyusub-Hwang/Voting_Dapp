import './App.css';

import {useState, useEffect} from 'react';
import {ethers} from 'ethers';
import {contractAbi, contractAddress} from './Constant/constant';
import Login from './Components/Login';
import Connected from './Components/Connected';


function App() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [votingStatus, setVotingStatus] = useState(false);
  const [remainingTime, setRemainingTime] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [number, setNumber] = useState(0);
  const [voted, setVoted] = useState(false);

  useEffect(() => {
    getCandidates();
    getRemainingTime();
    getCurrentStatus();
    getVoted();

    if (window.ethereum){
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }

    return () => {
      if (window.ethereum){
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    }
  });

  const handleAccountsChanged = (accounts) => {
    if (accounts.length > 0 && account !== accounts[0] ){
      setAccount(accounts[0]);
      getVoted();
    } else {
      setIsConnected(false);
      setAccount(null);
    }
  }

  const vote = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(
      contractAddress, contractAbi, signer
    );
    const tx = await contractInstance.vote(number);
    await tx.wait();
    getVoted();
  }

  const getVoted = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(
      contractAddress, contractAbi, signer
    );
    const voted = await contractInstance.voted(await signer.getAddress());
    setVoted(voted);
  }

  const getCurrentStatus = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(
      contractAddress, contractAbi, signer
    );
    const status = await contractInstance.getVotingStatus();
    setVotingStatus(status);
  }

  const getCandidates = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(
      contractAddress, contractAbi, signer
    );
    const candidatesList = await contractInstance.getAllVotes();
    const formattedCandidates = candidatesList.map((candidate, index)=>{
      return {
        index,
        name: candidate.name,
        voteCount: candidate.voteCount.toNumber()
      }
    })
    setCandidates(formattedCandidates);
  }

  

  const getRemainingTime = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(
      contractAddress, contractAbi, signer
    );
    const time = await contractInstance.getRemainingTime();
    setRemainingTime(parseInt(time));
  }

  const connectToMetamask = async () => {
    if(window.ethereum){
      try{
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        console.log("Metamask connected :" + address);

        setIsConnected(true);
      } catch (err) {
        console.error(err);
      }
    } else {
      console.error("Metamask undetected");
    }
  }

  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  }

  return (
    <div className="App">
      {isConnected ? (<Connected account={account} candidates={candidates} remainingTime={remainingTime} voteFunction={vote} handleNumberChange={handleNumberChange} votingStatus={votingStatus} voted={voted} />) : (<Login connectWallet={connectToMetamask} />) };
    </div>
  );
}

export default App;
