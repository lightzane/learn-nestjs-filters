import { BadRequestException, HttpException, HttpStatus, Injectable, UseFilters } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { AgeRestrictionException } from '../shared/exceptions/age-restriction.exception';
import { User } from './model/user.dto';

@Injectable()
export class UserService {

    constructor(@InjectModel(User) private readonly userModel: ReturnModelType<typeof User>) { }

    // Insert User data to the collection
    create(user: User): Promise<User> {
        if (user.age < 0) throw new BadRequestException('Dont give me negative age');
        else if (user.age > 0 && user.age < 20) throw new AgeRestrictionException();
        return this.userModel.create(user);
    }

    read(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    update(_id: string, user: User): Promise<User> {
        const filter = { _id };
        if (user.age > 0 && user.age < 20) throw new AgeRestrictionException();
        return this.userModel.findOneAndUpdate(filter, user, { new: true }).exec();
    }

}
