import Web3 from 'web3';
import { Injectable } from '@nestjs/common';

import { tokenAbi, rpcNode } from './config';

@Injectable()
export class Web3Service {
  private web3: any;
  private tokenAbi: any = tokenAbi;
  private rpcNode: any = rpcNode;
  private tokenDecimals: any;
  private decimal: number;

  constructor() {
    this.web3 = new Web3(this.rpcNode);
  }

  tokenRouter(contractAddress: string): any {
    this.web3 = new Web3(this.rpcNode);
    return new this.web3.eth.Contract(this.tokenAbi, contractAddress);
  }

  async getTokenDecimals(contractAddress: string) {
    if (this.tokenDecimals) return;
    this.tokenDecimals = await this.tokenRouter(contractAddress)
      .methods.decimals()
      .call();
    this.decimal = 10 ** this.tokenDecimals;
  }

  async getTokenInfo(privatekey: string) {
    const result = await this.web3.eth.accounts.privateKeyToAccount(privatekey);
    return result;
  }

  async getTokenBalance(walletAddress: string, contractAddress: string) {
    await this.getTokenDecimals(contractAddress);
    const balance =
      (await this.tokenRouter(contractAddress)
        .methods.balanceOf(walletAddress)
        .call()) / this.decimal;
    return balance;
  }
}

export default Web3Service;
