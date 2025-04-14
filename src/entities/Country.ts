import { IsUppercase } from "class-validator";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Country extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column({ unique: true })
    code: string;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    emoji: string;

    @Field()
    @Column()
    continent: string;
}

@InputType()
export class CountryCreateInput {
    @Field()
    @IsUppercase()
    code: string;

    @Field()
    name: string;

    @Field()
    emoji: string;

    @Field()
    @IsUppercase()
    continent: string;
}