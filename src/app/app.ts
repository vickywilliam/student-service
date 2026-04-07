import { Component } from '@angular/core';

import { StudentService } from './services/student.service'; // ✅ ye add karo
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html'
})
export class AppComponent {

  students: any[] = [];

  student: any = {
    id: null,
    name: '',
    email: '',
    course: ''
  };

  loading = false;

  constructor(private service: StudentService) {
    this.loadStudents();
  }

  loadStudents() {
    this.loading = true;
    this.service.getAllStudents().subscribe(data => {
      this.students = data;
      this.loading = false;
    });
  }

  addStudent() {
    this.service.addStudent(this.student).subscribe(() => {
      this.loadStudents();
      this.student = { name: '', email: '', course: '' };
    });
  }

  deleteStudent(id: number) {
    this.service.deleteStudent(id).subscribe(() => {
      this.loadStudents();
    });
  }

  editStudent(s: any) {
    this.student = { ...s };
  }

  updateStudent() {
    this.service.updateStudent(this.student?.id, this.student).subscribe(() => {
      this.loadStudents();
      this.student = { name: '', email: '', course: '' };
    });
  }

  confirmDelete(id: number) {
    if (confirm("Are you sure you want to delete?")) {
      this.deleteStudent(id);
    }
  }
}