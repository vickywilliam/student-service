import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseUrl = 'http://localhost:8080/students';

  constructor(private http: HttpClient) {}

  getAllStudents(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  addStudent(student: any) {
    return this.http.post<any>(this.baseUrl, student);
  }
  deleteStudent(id: number) {
  return this.http.delete(`${this.baseUrl}/${id}`);
}
updateStudent(id: number, student: any) {
  return this.http.put(`${this.baseUrl}/${id}`, student);
}
}
