import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { GroupService } from '../shared/group.service';
import { ClassesService } from '../shared/classes.service';
import { SectionsService } from '../shared/section.service';
import { PromotionService } from '../shared/promotion.service';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent implements OnInit {
  GroupsList: any=[];
  PromotionsList: any=[];
  PromotionsDtlList: any=[];
  SelectedPromotionsList: any=[];
  ClassesList: any=[];
  SectionsList: any=[];
  SectionsDetailList: any=[];
  SelectedDetailList: any=[];
  SelectedDetailList2: any=[];
  gp_id: number=0;
  cl_id: number=0;
  message: string;
  _dateSelected: any;
  _promtrnno: any;
  selectedPromotionsDtlList: any=[];
  constructor(
    public promotionService: PromotionService,
    public groupService: GroupService,
    public clsService: ClassesService,
    public sectionService: SectionsService,
    private ngZone: NgZone,
    private router: Router,
    private fb: FormBuilder,
  ) { }
  public promotionForm = this.fb.group({
    TRNNO:[''],
    PDT: ['', [Validators.required]],
    GRPMST_TRNNO: ['', [Validators.required]],
    CLASS_TRNNO: ['', [Validators.required]],    
    FCLASS_TRNNO: ['', [Validators.required]],
    SECDTL_TRNNO: [''],
    SECDTL_SR: [''],
   
  });
  ngOnInit(): void {
    this.loadGroups();
    this.loadClasses();
    this.loadSections();
    this.loadSectionsDetail();
    this.loadPromotions();
    this.loadPromotiondtl();
  }
  dateSelectionChange($event){
    this._dateSelected=$event.value;
    //console.log(this.PromotionsDtlList);
    const data=this.SelectedPromotionsList.filter(x=>x.PDT==this._dateSelected);
    console.log(data);
    if(data.length>0){
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        console.log(element);
      }
    }else{
      this._promtrnno=data[0].TRNNO;
    }
    
    //console.log(this._promtrnno);    
    this.message='';
  }
  groupSelectionChange($event){
    this.gp_id= $event.value;
    this.findDate();
  }
  classSelectionChange($event){    
    this.cl_id = $event.value;
    console.log(this.cl_id);
    this.findSectionIdByCl_Id(this.cl_id);
    this.findDate();
  }
  findDate() {
    if (this.cl_id > 0 && this.gp_id > 0) {

      var data = this.PromotionsList.filter(x => x.FCLASS_TRNNO == this.cl_id && x.GRPMST_TRNNO == this.gp_id);
      if (data.length > 0) {
        console.log(data);
        this.SelectedPromotionsList = data;
        this.message = "Please select the date Now"
      } else {
        this.message = "There is no such Group. Please change the group OR Create a new group"
        //this.loadTotalMarks();
      }
    }
    else {
        this.message = "Please select the fields"
      }
    
  }
  findSectionIdByCl_Id(cl_id: number) {
    const _trnno = this.SectionsList.find(x => x.CLASS_TRNNO == cl_id).TRNNO;
    this.SelectedDetailList = this.SectionsDetailList.filter(x => x.TRNNO == _trnno);
    console.log(this.SelectedDetailList);
  }
  toclassSelectionChange($event){
    const cl_id = $event.value;
    console.log(cl_id);
    this.tofindSectionIdByCl_Id(cl_id);
  }
  tofindSectionIdByCl_Id(cl_id: number) {
    const _trnno = this.SectionsList.find(x => x.CLASS_TRNNO == cl_id).TRNNO;
    this.SelectedDetailList2 = this.SectionsDetailList.filter(x => x.TRNNO == _trnno);
    console.log(this.SelectedDetailList2);
  }
  loadPromotions(){
    this.promotionService.GetPromotions().subscribe((data: {}) => {
      this.PromotionsList = data;
    })
  }
  loadPromotiondtl(){
    this.promotionService.GetPromotionsDtl().subscribe((data: {}) => {
      this.PromotionsDtlList = data;
    })
  }
  loadGroups() {
    this.groupService.GetGroups().subscribe((data: {}) => {
      this.GroupsList = data;
    })
  }
  loadClasses() {
    return this.clsService.GetClasses().subscribe((data: {}) => {
      this.ClassesList = data;
    })
  }
  loadSections() {
    return this.sectionService.GetSections().subscribe((data: {}) => {
      this.SectionsList = data;
    })
  }
  loadSectionsDetail() {
    return this.sectionService.GetSectionsDetail().subscribe((data: {}) => {
      this.SectionsDetailList = data;
    })
  }
  onClick(){
    console.log(this.PromotionsDtlList);
    this.selectedPromotionsDtlList=this.PromotionsDtlList.filter(x=>x.TRNNO==this._promtrnno);
    console.log(this.selectedPromotionsDtlList);
  }
  onSubmitPromotion(){

  }
}
