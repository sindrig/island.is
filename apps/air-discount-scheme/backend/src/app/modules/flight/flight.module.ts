import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'

import { Flight, FlightLeg } from './flight.model'
import {
  PublicFlightController,
  PrivateFlightController,
} from './flight.controller'
import { FlightService } from './flight.service'
import { DiscountModule } from '../discount'

@Module({
  imports: [SequelizeModule.forFeature([Flight, FlightLeg]), DiscountModule],
  controllers: [PublicFlightController, PrivateFlightController],
  providers: [FlightService],
  exports: [FlightService],
})
export class FlightModule {}
