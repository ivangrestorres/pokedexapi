import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {
  constructor() {}

  async exectuteSeed() {
    const fetchResponse = await fetch(
      'https://pokeapi.co/api/v2/pokemon?limit=15',
    );
    const { results } = (await fetchResponse.json()) as PokeResponse;

    results.map(({ name, url }) => {
      const segments = url.split('/');
      const no: number = +segments[segments.length - 2];

      console.log({ name, no });
    });

    return { message: 'Seed executed' };
  }
}
