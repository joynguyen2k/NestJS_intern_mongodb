import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { Task } from './schemas/task.schema';
import { TaskStatus } from './task-status.enum';
import { MongooseModule } from '@nestjs/mongoose';
import {TaskSchema } from './schemas/task.schema'

@Module({
  providers: [TaskService],
  controllers: [TaskController],
  imports: [
    MongooseModule.forFeature([{name:Task?.name, schema: TaskSchema }]),
  ],
})
export class TaskModule {}
