import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { RequestDTO } from './request.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('sendRequest')
  async sendRequest(@Body() Requestdto: RequestDTO) {
    return this.userService.sendRequest(
      Requestdto.requester,
      Requestdto.recipient,
    );
  }
  @Put('rejectRequest')
  async rejectRequest(@Body() Requestdto: RequestDTO) {
    return this.userService.rejectRequest(
      Requestdto.requester,
      Requestdto.recipient,
    );
  }
  @Put('acceptRequest')
  async acceptRequest(@Body() Requestdto: RequestDTO) {
    return this.userService.acceptRequest(
      Requestdto.requester,
      Requestdto.recipient,
    );
  }
  @Get('getStatus/:requester/:recipient')
  async getStatus(
    @Param('requester') requester,
    @Param('recipient') recipient,
  ) {
    return this.userService.returnStatus(requester, recipient);
  }
  @Get('getFriends/:id')
  async getFriends(@Param('id') id: string) {
    return await this.userService.getFriends(id);
  }
  @Post('addnotif/:id')
  async addnotif(@Param('id') id: string) {
    return await this.userService.initNotif(id);
  }
  @Get("getNotif/:id")
  async getNotif(@Param('id') id: string){
    return await this.userService.getNotifs(id);

  }
  @Get("deleteNotif/:id")
  async deleteNotif(@Param('id') id: string){
    return await this.userService.deleteNotifs(id);

  }
}
