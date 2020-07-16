import { Component, OnInit, NgZone } from '@angular/core';
import { ClassesService } from '../shared/classes.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-class',
  templateUrl: './edit-class.component.html',
  styleUrls: ['./edit-class.component.css']
})
export class EditClassComponent implements OnInit {

  ClassesList: any = [];
  updateClassForm: FormGroup;
  constructor(
    private actRoute: ActivatedRoute,
    public classService: ClassesService,
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router
  ) {
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.classService.GetClass(id).subscribe((data) => {
      this.updateClassForm = this.fb.group({
        CNAME: [data.CNAME],
        CABR: [data.CABR],
        TRNNO: [data.TRNNO]
      })
    })
   }

  ngOnInit() {
this.updateForm();
  }
  updateForm() {
    this.updateClassForm = this.fb.group({
      CNAME: [''],
      CABR: [''],
      TRNNO: ['']
    })
  }
  showMsg: boolean = false;
  submitForm() {
      const id = this.actRoute.snapshot.paramMap.get('id');
      this.classService.UpdateClass(id, this.updateClassForm.value).subscribe(res => {
      this.ngZone.run(() => this.router.navigateByUrl('/classes/id'))
      this.showMsg = true;
    })
  }

  CloseAlert(){
    this.showMsg = false;
    this.ngZone.run(() => this.router.navigateByUrl('/classes'))
  }

}