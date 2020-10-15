import { ProfileDTO } from './profile.dto';
import { ProfileService } from './profile.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { diskStorage } from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
import { profile } from 'console';

export const storage = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const filename: string = file.originalname;

      cb(null, `${filename}`);
    },
  }),
};
@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Put(':userid/headline')
  @UseInterceptors(FileInterceptor('image', storage))
  updateAvatar(
    @UploadedFile() file,
    @Req() req,
    @Param('userid') userid,
    @Body() profiledto: ProfileDTO,
  ) {
    const url =
      req.protocol + '://' + req.get('host') + '/' + file.originalname;

    return this.profileService.updateHeader(userid, url, profiledto);
  }
  @Put(':userid/mobilephone')
  updateMobilePhone(@Param('userid') userid, @Body() profiledto: ProfileDTO) {
    return this.profileService.updateMobilePhone(userid, profiledto);
  }
  @Put(':userid/facebook')
  updateFacebook(@Param('userid') userid, @Body() profiledto: ProfileDTO) {
    return this.profileService.updateFacebook(userid, profiledto);
  }
  @Put(':userid/website')
  updateWebsite(@Param('userid') userid, @Body() profiledto: ProfileDTO) {
    return this.profileService.updateWebsite(userid, profiledto);
  }
  @Put(':userid/adress')
  updateAdress(@Param('userid') userid, @Body() profiledto: ProfileDTO) {
    return this.profileService.updateAdress(userid, profiledto);
  }
  @Put(':userid/dateofbirth')
  updateDateOfBirth(@Param('userid') userid, @Body() profiledto: ProfileDTO) {
    return this.profileService.updateDateOfBirth(userid, profiledto);
  }
  @Put(':userid/gender')
  updateGender(@Param('userid') userid, @Body() profiledto: ProfileDTO) {
    return this.profileService.updateGender(userid, profiledto);
  }
  @Put(':userid/work')
  updateWork(@Param('userid') userid, @Body() profiledto: ProfileDTO) {
    return this.profileService.updateWork(userid, profiledto);
  }
  @Put(':userid/education')
  updateEducation(@Param('userid') userid, @Body() profiledto: ProfileDTO) {
    return this.profileService.updateEducation(userid, profiledto);
  }
  @Put(':userid/skills')
  updateSkills(@Param('userid') userid, @Body() profiledto: ProfileDTO) {
    return this.profileService.updateSkills(userid, profiledto);
  }
  @Get(':userid/getprofile')
  async getProfile(@Param('userid') userid) {
    return this.profileService.getProfile(userid);
  }
  
  @Get('search/:username/:userid')
  async searchByUserName(@Param('username') username,@Param("userid") userid) {
    return this.profileService.getSearchResut(username,userid);
  }
  @Get('search/:headline')
  async getProfileSuggestion(@Param('headline') headline) {
    return this.profileService.getProfileSuggestion(headline);
  }
}
