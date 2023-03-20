import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit {

  tasks?: Task[];
  currentTask: Task = {};
  currentIndex = -1;
  name = '';

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.retrieveTasks();
  }

  retrieveTasks(): void {
    this.taskService.getAll()
      .subscribe({
        next: (data) => {
          this.tasks = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveTasks();
    this.currentTask = {};
    this.currentIndex = -1;
  }

  setActiveTask(Task: Task, index: number): void {
    this.currentTask = Task;
    this.currentIndex = index;
  }

  removeAllTasks(): void {
    this.taskService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  searchname(): void {
    this.currentTask = {};
    this.currentIndex = -1;

    this.taskService.findByname(this.name)
      .subscribe({
        next: (data) => {
          this.tasks = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

}
