import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { StudentService } from 'src/services/student.service';
import { Observable } from 'rxjs';
import { Student } from 'src/model/student';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ModalContentComponent } from 'src/app/modal-content/modal-content/modal-content.component';

@Component({
  selector: 'student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

students: any;
@ViewChild(ModalContentComponent) modalContent: any;

  constructor(
    private studentService: StudentService,
    private modalService: NgbModal
    ) { }

  ngOnInit(): void {
  this.studentService.getStudents()
      .subscribe(
        (data) => { 
          this.students = data;
        } 
      );
  }

  openModal(index:any) {
    const modalRef = this.modalService.open(ModalContentComponent, { size: 'lg', backdrop: 'static' });
    if(index !== null)
    {
      modalRef.componentInstance.student = this.students[index];
    }
    else
    {
      modalRef.componentInstance.student = null
    }
    modalRef.result.then((result) => {
      if (result) {
        console.log(result);
      }
    });
  }

   onChange(event: any){
     debugger;
     if(event.target.value == 'Registrar')
     {
       this.studentService.isRegistrarSelected = true;
     }
   }
}
