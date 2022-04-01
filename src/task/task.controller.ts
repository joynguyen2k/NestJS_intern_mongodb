import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { getTaskByFilterDto } from './dto/get-task-filter.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './schemas/task.schema';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
    constructor(
        private taskService: TaskService
    ){}
    @Get()
    async getTasks(@Query() filterDto: getTaskByFilterDto):Promise<Task[]>{
        return this.taskService.getTasks(filterDto);
    }
    @Get('/:id')
    async getTaskById(@Param('id') id:string):Promise<Task>{
        return this.taskService.getTaskById(id);
    }
    @Delete('/:id')
    async deleteTask(@Param('id') id:string):Promise<void>{
        return this.taskService.deleteTask(id);
    }
    @Patch('/:id/status')
    async updateTaskStatus(@Param('id') id:string, @Body() updateTaskDto: UpdateTaskDto): Promise<void>{
        return await this.taskService.updateTaskStatus(id, updateTaskDto);
    }
    @Post()
    async createTask(@Body() createTaskDto:CreateTaskDto): Promise<Task>{
        return this.taskService.createTask(createTaskDto)
    }
}
