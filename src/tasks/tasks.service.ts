import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.model';

@Injectable()
export class TasksService {
  private db = admin.database().ref('tasks');

  async getTasks(isCompleted?: boolean): Promise<Task[]> {
    const snapshot = await this.db.once('value');
    const tasks = snapshot.val();
    const allTasks = tasks ? Object.keys(tasks).map(key => ({ id: key, ...tasks[key] })) : [];

    if (isCompleted === undefined) {
      return allTasks;
    }

    return allTasks.filter(task => task.isCompleted === isCompleted);
  }

  async createTask(input: CreateTaskDto): Promise<Task> {
    const id = admin.database().ref().push().key;
    const newTask = { ...input, isCompleted: false };
    await this.db.child(id).set(newTask);
    return { id, ...newTask };
  }

  async updateTask(input: UpdateTaskDto): Promise<Task> {
    const { id, ...updates } = input;
    await this.db.child(id).update(updates);
    const updatedTask = (await this.db.child(id).once('value')).val();
    return { id, ...updatedTask };
  }

  async deleteTask(id: string): Promise<boolean> {
    await this.db.child(id).remove();
    return true;
  }
}
