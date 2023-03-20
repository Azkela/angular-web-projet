import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksListComponent } from './components/task-list/tasks-list.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'task', pathMatch: 'full' },
  { path: 'task', component: TasksListComponent },
  { path: 'task/:id', component: TaskDetailsComponent },
  { path: 'add', component: AddTaskComponent },
  { path: '**', component: NotFoundPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
