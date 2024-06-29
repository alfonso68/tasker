import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class Task {
  @Field(type => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  dueDate: string;

  @Field()
  isCompleted: boolean;
}
