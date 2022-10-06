import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  documentList: any[] = [
    {name:'aadhaar', displayValue: 'Aadhaar (UID)', docType: 'address'},
    {name:'passport', displayValue: 'Passport', docType: 'address'},
    {name:'drivingLicense', displayValue: 'Driving License', docType: 'address'},
    {name:'voterId', displayValue: 'Election Commission Voter ID Card', docType: 'address'},
    {name:'rationCard', displayValue: 'Ration Card', docType: 'address'},
    {name:'panCard', displayValue: 'Income Tax PAN Card', docType: 'address'},
    {name:'sslcMarksheet', displayValue: '10th Marksheet', docType: 'education'},
    {name:'hscMarksheet', displayValue: '12th Marksheet', docType: 'education'},
    {name:'consolidatedMarksheet', displayValue: 'Consolidated Marksheet', docType: 'education'},
    {name:'Provisional', displayValue: 'Provisional Certificate', docType: 'education'},
    {name:'degreeCertificate', displayValue: 'Degree Certificate', docType: 'education'}
  ];

  constructor() { }
}
