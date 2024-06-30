import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';

@Resolver(of => Task)
export class TasksResolver {
  constructor(private readonly taskService: TasksService) {}

  @Query(returns => [Task])
  async getTasks(@Args('isCompleted', { type: () => Boolean, nullable: true }) isCompleted?: boolean): Promise<Task[]> {
    return this.taskService.getTasks(isCompleted);
  }

  @Mutation(returns => Task)
  async createTask(@Args('input') input: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(input);
  }

  @Mutation(returns => Task)
  async updateTask(@Args('input') input: UpdateTaskDto): Promise<Task> {
    return this.taskService.updateTask(input);
  }

  @Mutation(returns => Boolean)
  async deleteTask(@Args('id') id: string): Promise<boolean> {
    return this.taskService.deleteTask(id);
  }
}
