import { Component, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { StudentService } from 'src/services/student.service';
import {​​​​​​Router}​​​​​​ from '@angular/router';



@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss']
})
export class ModalContentComponent implements OnInit {

  @Input() public student: any;
  updateStudents: any;
  familyMembers: any;
  familyMember: any;
  studentForm: FormGroup;
  familyMemberForm: FormGroup;
  isStudentSubmitted: boolean = false;

  constructor(
    public activeModal: NgbActiveModal,
    private studentService: StudentService,
    private router: Router) {
    this.studentForm = new FormGroup({
      id: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      dateOfBirth: new FormControl(formatDate(new Date(), 'yyyy-MM-dd', 'en')),
    });
    this.familyMemberForm = new FormGroup({
      id: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      dateOfBirth: new FormControl(formatDate(new Date(), 'yyyy-MM-dd', 'en')),
      relationship: new FormControl(''),
    });
   }

  ngOnInit() {
    if(this.student === null)
    {
      this.studentForm = new FormGroup({
        id: new FormControl(''),
        firstName: new FormControl(''),
        lastName: new FormControl(''),
        dateOfBirth: new FormControl(formatDate(new Date(), 'yyyy-MM-dd', 'en')),
      });
    }
    else
    {
      this.studentForm = new FormGroup({
        id: new FormControl(this.student.ID),
        firstName: new FormControl(this.student.firstName),
        lastName: new FormControl(this.student.lastName),
        dateOfBirth: new FormControl(formatDate(this.student.dateOfBirth, 'yyyy-MM-dd', 'en')),
      });

      this.studentService.getFamilyMembers(this.student.ID)
        .subscribe(
          (data) => { 
            this.familyMembers = data;
          } 
        );

        this.isStudentSubmitted = true;

        if(!this.studentService.isRegistrarSelected)
        {
          this.studentForm.disable();
          //this.familyMemberForm.disable();
        }
    }
    
    console.log(this.student);
  }

  submit(){
    if(this.student !== null)
    {
      this.studentService.updateStudent(this.studentForm.value);  
    }
    else
    {
      this.studentService.addStudent(this.studentForm.value);
    }
    this.activeModal.close();
    window.location.reload();
  }

  clear()
  {
    this.studentForm = new FormGroup({
      id: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      dateOfBirth: new FormControl(formatDate(new Date(), 'yyyy-MM-dd', 'en'))
    });
  }

  submitFamilyMember(isUpdate: boolean = false)
  {
    if(isUpdate)
    {
      this.studentService.updateFamilyMember(this.familyMemberForm.value);  
    }
    else
    {
      this.studentService.addFamilyMember(this.student.ID, this.familyMemberForm.value);
    }
    this.ngOnInit();
  }

  fillEditFamilyMember(familyMemberIndex: number)
  {
    this.familyMember = this.familyMembers[familyMemberIndex];
    this.familyMemberForm = new FormGroup({
      id: new FormControl(this.familyMember.ID),
      firstName: new FormControl(this.familyMember.firstName),
      lastName: new FormControl(this.familyMember.lastName),
      dateOfBirth: new FormControl(formatDate(this.familyMember.dateOfBirth, 'yyyy-MM-dd', 'en')),
      relationship: new FormControl(this.familyMember.relationship),
    });
  }

  deleteFamilyMember(familyMemberId:number)
  {
    this.studentService.deleteFamilyMember(familyMemberId)
    this.ngOnInit();
  }

}
