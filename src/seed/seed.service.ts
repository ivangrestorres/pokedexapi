import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async exectuteSeed() {
    const fetchResponse = await fetch(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );
    const { results } = (await fetchResponse.json()) as PokeResponse;

    const pokemonsToInsert: { name: string; no: number }[] = [];

    await this.pokemonModel.deleteMany({});

    results.map(({ name, url }) => {
      const segments = url.split('/');
      const no: number = +segments[segments.length - 2];

      pokemonsToInsert.push({ no, name });
    });

    await this.pokemonModel.insertMany(pokemonsToInsert);
    return { message: 'Seed executed' };
  }
}
