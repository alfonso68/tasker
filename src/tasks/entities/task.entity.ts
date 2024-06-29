// src/tasks/entities/task.entity.ts
import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class Task {
  @Field(() => ID)
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
