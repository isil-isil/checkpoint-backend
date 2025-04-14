import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Country, CountryCreateInput } from "../entities/Country";
import { validate } from "class-validator";

@Resolver()
export class CountriesResolver {

    // Get all the countries
    @Query(() => [Country])
    async countries(): Promise<Country[]> {
        const countries = await Country.find();
        return countries;
    }

    // Get one country by its code
    @Query(() => Country)
    async country(@Arg("code") code: string): Promise<Country> {
        const country = await Country.findOne({ where: { code: code.toUpperCase() } });
        if (!country) {
            throw new Error("Country not found");
        }
        return country;
    }

    // Get all countries in a continent
    @Query(() => [Country])
    async countriesByContinent(@Arg("continent") continent: string): Promise<Country[]> {
        const countriesByContinent = await Country.find({
            where: { continent },
            order: { name: "ASC" },
        });
        return countriesByContinent;
    }

    // Add a country
    @Mutation(() => Country)
    async createCountry(
        @Arg("data", () => CountryCreateInput) data: CountryCreateInput
    ): Promise<Country> {
        const newCountry = new Country();
        Object.assign(newCountry, data);

        const errors = await validate(newCountry);
        if (errors.length > 0) {
            throw new Error(`Validation error: ${JSON.stringify(errors)}`);
        }

        await newCountry.save();
        return newCountry;
    }
}
