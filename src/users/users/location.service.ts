
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Location, LocationDocument } from './schemas/location.schema';
import { Model } from 'mongoose';
import { LocationDto } from './dto/create-user.dto';

@Injectable()
export class LocationService {
    constructor(@InjectModel(Location.name) private readonly locatioModel:Model<LocationDocument>){}

    async createLocation(locationData: any){
        const location = new this.locatioModel(locationData)
        return location.save()
    }
}
