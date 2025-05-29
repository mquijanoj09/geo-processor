import { Module } from '@nestjs/common';
import { GeoController } from './geo.controller';
import { GeoService } from './geo.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [CacheModule.register({ ttl: 300 /* 5 minutes */ })],
  controllers: [GeoController],
  providers: [GeoService],
})
export class GeoModule {}
