import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

@Injectable()
export class StudentService {

  url = "http://localhost:8088"
  errorMessage: any;
  isRegistrarSelected: boolean = false;

  constructor(private http: HttpClient) { }

  getStudents() {
    return this.http.get(this.url + "/api/Students").
        pipe(
           map((data: any) => {
             return data;
           }), catchError( error => {
             return error( 'Something went wrong!' );
           })
        )
  }

  addStudent(student: any) {
    debugger;
    return this.http.post(this.url + "/api/Students", student).subscribe({
      next: data => {
        debugger;
          console.info("Data has been added", data)
      },
      error: error => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
      }
    })
  }

  updateStudent(student: any) {
    return this.http.put(this.url + "/api/Students/" + student.id,student).subscribe({
      next: data => {
          console.info("Data has been updated", data)
      },
      error: error => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
      }
    })
  }

  getFamilyMembers(studentId: number) {
    return this.http.get(this.url + "/api/Students/" + studentId + "/FamilyMembers").
        pipe(
           map((data: any) => {
             return data;
           }), catchError( error => {
             return error( 'Something went wrong!' );
           })
        )
  }

  addFamilyMember(studentId: number, familyMember: any) {
    return this.http.post(this.url + "/api/Students/" + studentId + "/FamilyMembers", familyMember).subscribe({
      next: data => {
          console.info("Data has been added", data)
      },
      error: error => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
      }
    })
  }

  updateFamilyMember(familyMember: any) {
    return this.http.put(this.url + "/api/FamilyMembers/" + familyMember.id,familyMember).subscribe({
      next: data => {
          console.info("Data has been updated", data)
      },
      error: error => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
      }
    })
  }

  deleteFamilyMember(familyMemberId: number) {
    return this.http.delete(this.url + "/api/FamilyMembers/" + familyMemberId).subscribe({
      next: data => {
          console.info("Data has been deleted", data)
      },
      error: error => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
      }
    })
  }
}
