import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateTaskDto {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  dueDate: string;
}
