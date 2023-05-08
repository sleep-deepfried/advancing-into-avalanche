import { ethers } from "ethers";
import abi from "../abi.json";

export async function connectToWallet() {
  const provider = new ethers.providers.Web3Provider(window.ethereum); 
  await provider.send("eth_requestAccounts", []); 
  return provider.getSigner();
}

export async function getContract(signer) {
  const contractAddress = "0x4013f19d2f672523971ED8D16CAe08513530663f"; 
  return new ethers.Contract(contractAddress, abi, signer);
}

export async function mintNFT(stringURI, contract) {
  const tx = await contract.mint(stringURI); 
  console.log("transaction:>> ", tx); 
  await tx.wait(); 
  return tx;
}

export function configureTokenURI(imageURL, name, description) {
  return JSON.stringify({
    name,
    description,
    image: imageURL,
    attributes: [],
  });
}
