// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class ManagerService {
  

//   getTest(): string {
//     return 'Testing testing';
//   }
 
// }

import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRegDTO } from "src/user/user.dto";
import { UserEntity } from "src/user/user.entity";
import { Repository } from "typeorm";
import { DeleteQry, ManagerInfoDTO, ManagerLoginDTO, ManagerRegDTO, ManagerUpdateDTO } from "./manager.dto";
import { ManagerEntity } from "./manager.entity";
import * as bcrypt from 'bcrypt';

@Injectable()
export class ManagerService {
    constructor (
        @InjectRepository(ManagerEntity)
            private managerRepo:Repository<ManagerEntity>,
        @InjectRepository(UserEntity)
            private userRepo:Repository<UserEntity>
    ){}



    async regManager (managerRegInfo:ManagerRegDTO) : Promise<ManagerEntity> {
      const salt = await bcrypt.genSalt();
      managerRegInfo.password = await bcrypt.hash(managerRegInfo.password, salt);

      return this.managerRepo.save(managerRegInfo);
    }
    async loginManager (managerLoginInfo:ManagerLoginDTO) {
      const manager = await this.managerRepo.findOneBy({username:managerLoginInfo.username});
      
      const isMatch:boolean = await bcrypt.compare(managerLoginInfo.password, manager.password);
      console.log(isMatch);
      return isMatch;
    }
    async regUser (userRegInfo:UserRegDTO, managerUsername:string) : Promise<UserEntity> {
      const manager = await this.managerRepo.findOneBy({username:managerUsername});
      //const user = await this.userRepo.findOneBy({username:travelerRegInfo.username});

      userRegInfo.managerID = manager.id;

      return this.userRepo.save(userRegInfo);
  }
  async getUserByManagerId (managerUsername:string) {
    console.log(managerUsername);
    const manager = await this.managerRepo.findOneBy({username:managerUsername});
    const managerId = manager.id;

    return this.managerRepo.find(
        {
            where: {id:managerId},
            relations: {users:true}
        }
    ) 
}
async updateManagerInfo (managerUpdateInfo:ManagerUpdateDTO, managerUsername:string) : Promise<ManagerEntity> {
  const manager = await this.managerRepo.findOneBy({username:managerUsername});
  managerUpdateInfo.id = manager.id;

  const salt = await bcrypt.genSalt();
  managerUpdateInfo.password = await bcrypt.hash(managerUpdateInfo.password, salt);

  await this.managerRepo.update({id:manager.id}, managerUpdateInfo);
  console.log("update!");
  return this.managerRepo.findOneBy({id:manager.id});
}

async removeManager (managerUsername:string) {
  const manager = await this.managerRepo.findOneBy({username:managerUsername});
  await this.managerRepo.delete(manager.id);
}
async removeUser (userId:number, managerUsername:string) {
  const user = await this.userRepo.findOneBy({id:userId});
        const manager = await this.managerRepo.findOneBy({username:managerUsername});
        const managerId = manager.id;

        if (user.managerID == managerId) {
            await this.userRepo.delete(userId);
            return "User is Deleted!";
        } else {
            return "Couldn't Delete user!";
        }
    }
  }

