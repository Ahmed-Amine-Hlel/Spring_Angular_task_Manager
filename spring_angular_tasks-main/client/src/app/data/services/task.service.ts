import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { JsonApiService, BASE_URL } from './json-api.service';
import { Task } from '../schema/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private jsonApiService: JsonApiService) {}

  getAll(userId: number = -1): Observable<Array<Task>> {
    return this.jsonApiService
      .getHttpClient()
      .get<Task[]>(`${BASE_URL}/tasks`, {
        headers: this.jsonApiService.getHttpHeaders(),
        params: { userId: userId === -1 ? '' : String(userId) },
      });
  }

  getSingle(id: number): Observable<Task> {
    return this.jsonApiService
      .getHttpClient()
      .get<Task>(`${BASE_URL}/tasks/${id}`, {
        headers: this.jsonApiService.getHttpHeaders(),
      });
  }

  toggleCompleted(task: Task): Observable<Task> {
    return this.jsonApiService
      .getHttpClient()
      .put<Task>(`${BASE_URL}/tasks`, task, {
        headers: this.jsonApiService.getHttpHeaders(),
      });
  }

  deleteTask(id: number): Observable<void> {
    return this.jsonApiService
      .getHttpClient()
      .delete<void>(`${BASE_URL}/tasks/${id}`, {
        headers: this.jsonApiService.getHttpHeaders(),
      });
  }

  addTask(task: Task): Observable<Task> {
    return this.jsonApiService
      .getHttpClient()
      .post<Task>(`${BASE_URL}/tasks`, task, {
        headers: this.jsonApiService.getHttpHeaders(),
      });
  }
}
