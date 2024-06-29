import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class UpdateTaskDto {
  @Field(type => ID)
  id: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  dueDate?: string;

  @Field({ nullable: true })
  isCompleted?: boolean;
}
