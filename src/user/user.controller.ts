import { Body, Controller, Get, Param, Patch, Post, UseFilters } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from '../shared/filters/http-exception.filter';
import { RestrictionFilter } from '../shared/filters/restriction.filter';
import { User } from './model/user.dto';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('User')
@UseFilters(HttpExceptionFilter, RestrictionFilter)
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Post('create')
    @ApiOperation({
        summary: 'Inserts User',
        description: 'This is my message to create user'
    })
    create(@Body() user: User): Promise<User> {
        return this.userService.create(user);
    }
    @Get()
    read(): Promise<User[]> {
        return this.userService.read();
    }

    @Patch('update/:id')
    @ApiOperation({
        summary: 'Patches User',
        description: 'Tdpaiwdjapwdok paowdk apowdk '
    })
    @ApiParam({
        name: 'id',
        description: 'This is the userId that you want to update'
    })
    @ApiResponse({
        status: 200,
        description: 'Test'
    })
    @ApiResponse({
        status: 400,
        description: 'When you give me what I dont want'
    })
    update(@Param('id') id: string, @Body() user: User): Promise<User> {
        return this.userService.update(id, user);
    }

}
