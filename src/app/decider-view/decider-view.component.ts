import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-decider-view',
  templateUrl: './decider-view.component.html',
  styleUrls: ['./decider-view.component.scss']
})
export class DeciderViewComponent implements OnInit {

  addrPanelOpenState: boolean = false;
  eduPanelOpenState: boolean = false;

  addrUploadAll: boolean = false;
  addrDocList: any[] = [];
  addrSubmitEnable: boolean = false;
  addrRadioValue: string = '';
  addrSelectValue: string = '';
  addrDocValue: any = {
    isEdited: false,
    file: ''
  };

  eduUploadAll: boolean = false;
  eduDocList: any[] = [];
  eduSubmitEnable: boolean = false;
  eduRadioValue: string = '';
  eduSelectValue: string = '';
  eduDocValue: any = {
    isEdited: false,
    file: ''
  };

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

  handleFileInputAddr(event: any, index: any, type?:any) {
    console.log('Address tab Event and Index on file upload', event.target.files[0], index);
    if (type == 'one') {
      this.addrDocValue.file = event.target.files[0];
      this.addrDocValue.isEdited = true;
      this.addrSubmitEnable = true;
    } else {
      this.addrDocList[index].file = event.target.files[0];
      this.addrDocList[index].isEdited = true;
      console.log('Address List after upload', this.addrDocList)
      this.addrSubmitEnable = this.checkSubmitEnable(this.addrDocList);
    }
  }

  deleteFileAddr(index: any, type?:any) {
    console.log('Address List on delete', index);
    if (type == 'one') {
      this.addrDocValue.file = '';
      this.addrDocValue.isEdited = false;
      this.addrSubmitEnable = false;
      this.dataService.documentList.forEach(element => {
        if (element.name == this.addrSelectValue && element.file) {
          element['file'] = '';
          element['isEdited'] = false;
        }
      });
    } else {
      this.addrDocList[index].file = '';
      this.addrDocList[index].isEdited = false;
      this.addrSubmitEnable = this.checkSubmitEnable(this.addrDocList);
    }
  }

  addrUploadSubmit(type?:any) {
    this.openSnackBar('Address Documents upload Successfull');
    if (type == 'one') {
      this.addrDocValue.isEdited = false;
      this.addrSubmitEnable = false;
      this.dataService.documentList.forEach(element => {
        if (element.name == this.addrSelectValue) {
          element['file'] = this.addrDocValue.file;
          element['isEdited'] = this.addrDocValue.isEdited;
        }
      });
    } else {
      this.addrDocList.map(x => x.isEdited = false);
      this.addrSubmitEnable = this.checkSubmitEnable(this.addrDocList);
      this.updateDocumentList(this.addrDocList, 'address');
    }
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

  handleFileInputEdu(event: any, index: any, type?:any) {
    console.log('Education tab Event and Index on file upload', event.target.files[0], index);
    if (type == 'one') {
      this.eduDocValue.file = event.target.files[0];
      this.eduDocValue.isEdited = true;
      this.eduSubmitEnable = true;
    } else {
      this.eduDocList[index].file = event.target.files[0];
      this.eduDocList[index].isEdited = true;
      console.log('Education List after upload', this.eduDocList)
      this.eduSubmitEnable = this.checkSubmitEnable(this.eduDocList);
    }
  }

  deleteFileEdu(index: any, type?:any) {
    console.log('Education List on delete', index);
    if (type == 'one') {
      this.eduDocValue.file = '';
      this.eduDocValue.isEdited = false;
      this.eduSubmitEnable = false;
      this.dataService.documentList.forEach(element => {
        if (element.name == this.eduSelectValue && element.file) {
          element['file'] = '';
          element['isEdited'] = false;
        }
      });
    } else {
      this.eduDocList[index].file = '';
      this.eduDocList[index].isEdited = false;
      this.eduSubmitEnable = this.checkSubmitEnable(this.eduDocList);
    }
  }

  eduUploadSubmit(type?:any) {
    this.openSnackBar('Education Documents upload Successfull');
    if (type == 'one') {
      this.eduDocValue.isEdited = false;
      this.eduSubmitEnable = false;
      this.dataService.documentList.forEach(element => {
        if (element.name == this.eduSelectValue) {
          element['file'] = this.eduDocValue.file;
          element['isEdited'] = this.eduDocValue.isEdited;
        }
      });
    } else {
      this.eduDocList.map(x => x.isEdited = false);
      this.eduSubmitEnable = this.checkSubmitEnable(this.eduDocList);
      this.updateDocumentList(this.eduDocList, 'education');
    }
  }

  checkSubmitEnable(data: any[]) {
    const uploadedFile = data.filter(x => x.isEdited == true || x.file);
    if (uploadedFile.length == data.length) {
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
    } else {
      addrList = this.dataService.documentList.filter(x => x.docType == 'address');
      eduList = data;
    }
    console.log('Updated Array', [...addrList, ...eduList]);
    this.dataService.documentList = [...addrList, ...eduList];
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'OK', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 5000
    });
  }

}
