import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {

  addrPanelOpenState: boolean = false;
  eduPanelOpenState: boolean = false;

  addrUploadAll: boolean = false;
  addrDocList: any[] = [];
  addrSubmitEnable: boolean = false;

  eduUploadAll: boolean = false;
  eduDocList: any[] = [];
  eduSubmitEnable: boolean = false;

  constructor(private dataService: DataService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.dataService.documentList.forEach(x => {
      x['isEdited'] = false;
      x['file'] = ''
    });
  }

  addrPanelOpened() {
    this.addrPanelOpenState = !this.addrPanelOpenState;
    this.addrDocList = this.dataService.documentList.filter(x => x.docType == 'address');
    this.addrDocList.map( (x) => {
      x['isEdited'] = false;
      !x['file'] ? x['file'] = '' : x['file'] = x['file'];
    });
    console.log('Address List once expansion opened', this.addrDocList);
  }

  handleFileInputAddr(event: any, index: any) {
    console.log('Address tab Event and Index on file upload', event.target.files[0], index);
    this.addrDocList[index].file = event.target.files[0];
    this.addrDocList[index].isEdited = true;
    console.log('Address List after upload', this.addrDocList)
    this.addrSubmitEnable = this.checkSubmitEnable(this.addrDocList);
  }

  deleteFileAddr(index: any) {
    console.log('Address List on delete', index)
    this.addrDocList[index].file = '';
    this.addrDocList[index].isEdited = false;
    this.addrSubmitEnable = this.checkSubmitEnable(this.addrDocList);
  }

  addrUploadSubmit() {
    this.openSnackBar('Address Documents upload Successfull');
    this.addrDocList.map(x => x.isEdited = false);
    this.addrSubmitEnable = this.checkSubmitEnable(this.addrDocList);
    this.updateDocumentList(this.addrDocList, 'address');
  }

  eduPanelOpened() {
    this.eduPanelOpenState = !this.eduPanelOpenState;
    this.eduDocList = this.dataService.documentList.filter(x => x.docType == 'education');
    this.eduDocList.map( (x) => {
      x['isEdited'] = false;
      !x['file'] ? x['file'] = '' : x['file'] = x['file'];
    });
    console.log('Education List once expansion opened', this.eduDocList);
  }

  handleFileInputEdu(event: any, index: any) {
    console.log('Education tab Event and Index on file upload', event.target.files[0], index);
    this.eduDocList[index].file = event.target.files[0];
    this.eduDocList[index].isEdited = true;
    console.log('Education List after upload', this.eduDocList)
    this.eduSubmitEnable = this.checkSubmitEnable(this.eduDocList);
  }

  deleteFileEdu(index: any) {
    console.log('Education List on delete', index)
    this.eduDocList[index].file = '';
    this.eduDocList[index].isEdited = false;
    this.eduSubmitEnable = this.checkSubmitEnable(this.eduDocList);
  }

  eduUploadSubmit() {
    this.openSnackBar('Education Documents upload Successfull');
    this.eduDocList.map(x => x.isEdited = false);
    this.eduSubmitEnable = this.checkSubmitEnable(this.eduDocList);
    this.updateDocumentList(this.eduDocList, 'education');
  }

  checkSubmitEnable(data: any[]) {
    const uploadedFile = data.filter(x => x.isEdited == true || x.file);
    if (uploadedFile.length == 1 || uploadedFile.length == data.length) {
      return true;
    } else {
      return false;
    }
  }

  updateDocumentList(data: any[], type: any) {
    let addrList;
    let eduList;
    if (type == 'address') {
      addrList = data;
      eduList = this.dataService.documentList.filter(x => x.docType == 'education');
      this.addrSubmitEnable = false;
    } else {
      addrList = this.dataService.documentList.filter(x => x.docType == 'address');
      eduList = data;
      this.eduSubmitEnable = false;
    }
    console.log('Updated Array', [...addrList, ...eduList]);
    this.dataService.documentList = [...addrList, ...eduList];
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 5000
    });
  }

}
