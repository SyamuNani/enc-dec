import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import * as crypto from 'crypto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService
  ) { }
  // private kkey = 'wVZhlKeivG40/u26/BpBk8y+JT4HEQhT'
  private kkey = 'AEB7EE11FD8BB767455078D79D25ED35'

  @Post('enc')
  encryptAES256CBC(@Body() data) {
    console.log(data)
    const iv = Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const key = this.kkey
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv)
    let crypted = cipher.update(JSON.stringify(data.text), 'utf8', 'hex')
    crypted += cipher.final('hex');
    return crypted;
  };

  @Post('dec')
  decryptAES256CBC(@Body() data: { text: string }) {
    const iv = Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const key = this.kkey;
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv)
    let dec = decipher.update(data.text, 'hex', 'utf8')
    dec += decipher.final('utf8');
    return JSON.parse(dec);
  };

  @Post('dec')
  decryptAES256CBC1(@Body() data: { text: string }) {
    const iv = Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const key = this.kkey;
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv)
    let dec = decipher.update(data.text, 'hex', 'utf8')
    dec += decipher.final('utf8');
    return JSON.parse(dec);
  };

  @Get()
  getHello(): string {
    const kkey = 'wVZhlKeivG40/u26/BpBk8y+JT4HEQhT'

    function encryptAES256CBC(text: string) {
      const iv = Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
      const key = kkey
      const cipher = crypto.createCipheriv('aes-256-cbc', key, iv)
      let crypted = cipher.update(text, 'utf8', 'hex')
      crypted += cipher.final('hex');
      return crypted;
    };
    function decryptAES256CBC(text) {
      const iv = Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
      const key = kkey;
      const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv)
      let dec = decipher.update(text, 'hex', 'utf8')
      dec += decipher.final('utf8');
      return dec;
    };
    const reqdata =
    {
      "requestBody":
        { "corpId": "FEBACOPR5", "userId": "ENTAPP1", "appId": "FMCONN", "randomKey": "FMCONN1712897310182" }
    };
    const encReq = encryptAES256CBC(JSON.stringify(reqdata));
    const decRes = JSON.parse(decryptAES256CBC("98375abd7d995fee4fc9435bad8e7a7154c36d8f73ca96e8893b7fa4a7dd0ff5a2582db11cba5393ec420a8acfd9b0e8"));
    console.log(encReq);
    console.log(decRes);
    return this.appService.getHello();
  }
}
