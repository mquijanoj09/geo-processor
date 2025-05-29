import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import axios from 'axios';
import { Cache } from 'cache-manager';

interface Point {
  lat: number;
  lng: number;
}

@Injectable()
export class GeoService {
  private readonly pythonUrl = 'http://localhost:8000/process';

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  private generateCacheKey(points: Point[]): string {
    const sorted = points
      .map((p) => ({ lat: p.lat, lng: p.lng }))
      .sort((a, b) => a.lat - b.lat || a.lng - b.lng);
    return JSON.stringify(sorted);
  }

  async processPoints(points: Point[]): Promise<any> {
    const cacheKey = this.generateCacheKey(points);
    const cached = await this.cacheManager.get(cacheKey);
    if (cached) {
      return cached;
    }

    try {
      const response = await axios.post(this.pythonUrl, { points });
      const data = response.data;

      // Cache result for 5 minutes (300 seconds)
      await this.cacheManager.set(cacheKey, data, 300);

      return data;
    } catch (err) {
      throw new HttpException(
        'Failed to contact Python geo-processor service',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
