import { Injectable } from '@nestjs/common';

@Injectable()
export class ManagerService {
  

  getTest(): string {
    return 'Testing testing';
  }
 
}