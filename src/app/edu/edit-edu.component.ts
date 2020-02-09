import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EduService } from '../shared/edu.service';

@Component({
  selector: 'app-edit-edu',
  templateUrl: './edit-edu.component.html',
  styleUrls: ['./edit-edu.component.css']
})
export class EditEduComponent implements OnInit {

  EdusList: any = [];
  updateEduForm: FormGroup;
  constructor(
    private actRoute: ActivatedRoute,
    public eduService: EduService,
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router
  ) {
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.eduService.GetEdu(id).subscribe((data) => {
      this.updateEduForm = this.fb.group({
        BPNAME: [data.DNAME],
        DABRV: [data.DABRV],
        STATUS: [data.STATUS],
        TRNNO:[data.TRNNO]
      })
    })
   }

  ngOnInit() {
this.updateForm();
  }
  updateForm(){
    this.updateEduForm = this.fb.group({
      DNAME: [''],
      DABRV: [''],
      STATUS: [''],
      TRNNO: ['']
    })
  }

  submitForm() {
      const id = this.actRoute.snapshot.paramMap.get('id');
      this.eduService.UpdateEdu(id, this.updateEduForm.value).subscribe(res => {
      this.ngZone.run(() => this.router.navigateByUrl('/edu-list'))
    })
  }

}