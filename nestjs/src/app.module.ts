import { Module } from '@nestjs/common';
import { GeoModule } from './geo/geo.module';

@Module({
  imports: [GeoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
