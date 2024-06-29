import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import * as admin from 'firebase-admin';
import { v4 as uuidv4 } from 'uuid';

@Resolver(of => Task)
export class TasksResolver {

  @Query(returns => [Task])
  async getTasks(@Args('isCompleted', { type: () => Boolean, nullable: true }) isCompleted?: boolean): Promise<Task[]> {
    const snapshot = await admin.database().ref('tasks').once('value');
    const tasks = snapshot.val();
    const allTasks = tasks ? Object.keys(tasks).map(key => ({ id: key, ...tasks[key] })) : [];

    if (isCompleted === undefined) {
      return allTasks;
    }

    return allTasks.filter(task => task.isCompleted === isCompleted);
  }

  @Mutation(returns => Task)
  async createTask(@Args('input') input: CreateTaskDto): Promise<Task> {
    const id = uuidv4();
    const newTask = { ...input, isCompleted: false };
    await admin.database().ref(`tasks/${id}`).set(newTask);
    return { id, ...newTask };
  }

  @Mutation(returns => Task)
    async updateTask(@Args('input') input: UpdateTaskDto): Promise<Task> {
      const { id, ...updates } = input;
      await admin.database().ref(`tasks/${id}`).update(updates);
      const updatedTask = (await admin.database().ref(`tasks/${id}`).once('value')).val();
      return { id, ...updatedTask };
    }

    @Mutation(returns => Boolean)
    async deleteTask(@Args('id') id: string): Promise<boolean> {
      await admin.database().ref(`tasks/${id}`).remove();
      return true;
    }
}
