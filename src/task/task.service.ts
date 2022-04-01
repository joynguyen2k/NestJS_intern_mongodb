import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { getTaskByFilterDto } from './dto/get-task-filter.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, TaskDocument } from './schemas/task.schema';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TaskService  {
    constructor(
        @InjectModel(Task.name)
        private model: Model<TaskDocument>
    ){}
    async getTasks(filterDto: getTaskByFilterDto): Promise<Task[]>{
        const {status, search}= filterDto;
        console.log('status',status);
        console.log('search',search);
        if(status){
            return await this.model.find({
                where: {status:  `%${status}%`}
            })
        }
        if(search){
            return await this.model.find({
                where:{
                    $or:[
                        {title: `%${search}%`},
                        {description: `%${search}%`},

                    ]
                }
            })
        }
        // return result;
    }
    async getTaskById(id: string): Promise<Task>{
        const task = await this.model.findOne({ id});
        if(!task){
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
        return task;
    }
    async createTask(createTaskDto:CreateTaskDto): Promise<Task> {
        const {title,description} = createTaskDto;
        return await new this.model({
            title,
            description,
            status: TaskStatus.OPEN
        }).save();
    }

    async deleteTask(id:string): Promise<void> {
        const result = await this.model.findByIdAndDelete(id);
        // if(result.affected === 0) {
        //     throw new NotFoundException(`Task with ID ${id} not found`);
        // }

    }
    async updateTaskStatus(id:string, updateTaskDto:UpdateTaskDto): Promise<void> {
        await this.model.findByIdAndUpdate(id, updateTaskDto);
    }
    

}
