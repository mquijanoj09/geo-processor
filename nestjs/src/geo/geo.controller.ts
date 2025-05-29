import {
  Body,
  Controller,
  Post,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { ProcessRequestDto } from './dto/process-request.dto';
import { GeoService } from './geo.service';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller()
export class GeoController {
  constructor(private readonly geoService: GeoService) {}

  @Post('process')
  @UseInterceptors(CacheInterceptor)
  async process(@Body() body: ProcessRequestDto) {
    // Body is already validated by NestJS pipes via DTO
    if (
      !body.points ||
      !Array.isArray(body.points) ||
      body.points.length === 0
    ) {
      throw new BadRequestException(
        "The 'points' field must be a non-empty array.",
      );
    }
    for (const point of body.points) {
      if (typeof point.lat !== 'number' || typeof point.lng !== 'number') {
        throw new BadRequestException(
          'Each point must have numeric lat and lng.',
        );
      }
    }

    return this.geoService.processPoints(body.points);
  }
}
