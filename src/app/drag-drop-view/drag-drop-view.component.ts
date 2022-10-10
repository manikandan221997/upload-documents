import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-drag-drop-view',
  templateUrl: './drag-drop-view.component.html',
  styleUrls: ['./drag-drop-view.component.scss']
})
export class DragDropViewComponent implements OnInit {

  addrPanelOpenState: boolean = false;
  eduPanelOpenState: boolean = false;

  addrDocList: any[] = [];
  addrSubmitEnable: boolean = false;
  addrSelectValue: string = '';

  constructor(public dataService: DataService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  addrPanelOpened() {
    this.addrPanelOpenState = !this.addrPanelOpenState;
    this.addrDocList = this.dataService.documentList.filter(x => x.docType == 'address');
    console.log('Address List once expansion opened', this.addrDocList);
  }

  deleteFileAddr(index: any, type?:any) {
    console.log('Address List on delete', index, this.dataService.uploadedAddrList);
    if (type == 'all') {
      this.dataService.uploadedAddrList = [];
    } else {
      this.dataService.uploadedAddrList.splice(index, 1);
    }
    console.log(this.dataService.uploadedAddrList);
  }

  addrUploadSubmit(type?:any) {
    this.openSnackBar('Address Documents upload Successfull');
    this.dataService.uploadedAddrList = [];
    this.dataService.isUploadEnable = false;
    this.addrSelectValue = '';
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'OK', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 5000
    });
  }

  fileHandler(event: any) {
    console.log('Browse Files',event);
    this.updateList(event.target.files);
  }

  updateList(files: any) {
    console.log('Browse Files',files);
    if (this.dataService.isUploadEnable && this.addrSelectValue == 'all') {
      this.dataService.uploadedAddrList = [...files];
    } else if (this.dataService.isUploadEnable && this.addrSelectValue != '' && this.addrSelectValue != 'all') {
      this.dataService.uploadedAddrList.push(files[0]);
    }
    console.log(this.dataService.uploadedAddrList);
  }

  onSelectChange() {
    this.addrSelectValue != '' ? this.dataService.isUploadEnable = true : this.dataService.isUploadEnable = false;
  }

}
