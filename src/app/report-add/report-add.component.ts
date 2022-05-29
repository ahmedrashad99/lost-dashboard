import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Report } from '../Models/report';
import { User } from '../Models/user';
import { AlertifyService } from '../Services/alertify.service';
import { ReportService } from '../Services/report.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-report-add',
  templateUrl: './report-add.component.html',
  styleUrls: ['./report-add.component.scss']
})
export class ReportAddComponent implements OnInit {
  @Output() cancelAddReport = new EventEmitter();
  report: Report;
  reportForAdd: any;
  reportAddForm: FormGroup;
  users: User[];
  types: any[];
  brands: any[] = [{ id:"Select Brand", items: [{id: ""}] }];
  models: any[] = [{ id:"Select Model", items: [{id: ""}] }];
  Color = [
    { name: 'Black', icon: 'Black' },
    { name: 'White', icon: 'White' },
    { name: 'Silver', icon: 'Silver' },
    { name: 'Red', icon: 'Red' },
    { name: 'Blue', icon: 'Blue' },
    { name: 'Mint Green', icon: '#A2E4B8' },
    { name: 'Purple', icon: 'Purple' },
  ];
  RAM = [
    { name: '4GB', value: 4 },
    { name: '6GB', value: 6 },
    { name: '8GB', value: 8 },
    { name: '16GB', value: 16 },
  ];
  ROM = [
    { name: '16GB', value: 16 },
    { name: '32GB', value: 32 },
    { name: '64GB', value: 64 },
    { name: '128GB', value: 128 },
    { name: '256GB', value: 256 },
  ];

  constructor(private reportService: ReportService, private router: Router, private fb: FormBuilder, private alertify: AlertifyService, 
              private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe((data:any) => { 
      this.users = data.Data; 
    }, error => { "Error retrieving users data!" });
    this.createAddReportForm();
    this.Type();
  }

  createAddReportForm() {
    this.reportAddForm = this.fb.group({
      userID: ['', Validators.required],
      serialNumber: ['', Validators.required],
      type: ['', Validators.required],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      color: ['', Validators.required],
      RAM: ['', Validators.required],
      ROM: ['', Validators.required],
      frontCrach_top: [false, Validators.required],
      frontCrach_center: [false, Validators.required],
      frontCrach_bottom: [false, Validators.required],
      backCrach_top: [false, Validators.required],
      backCrach_center: [false, Validators.required],
      backCrach_bottom: [false, Validators.required],
      additional_info: ['', Validators.required],
      devicePicture: ['', Validators.required]
    });
  }
  onChange(event:any){
    const selectedFile = event.target.files[0];
    this.reportAddForm.get('devicePicture')?.setValue(selectedFile);
  }

  addReport() {
      const uploadData = new FormData();
      uploadData.append('userID', this.reportAddForm.get('userID')?.value);
      uploadData.append('serialNumber', this.reportAddForm.get('serialNumber')?.value);
      uploadData.append('type', this.reportAddForm.get('type')?.value);
      uploadData.append('brand', this.reportAddForm.get('brand')?.value);
      uploadData.append('model', this.reportAddForm.get('model')?.value);
      uploadData.append('color', this.reportAddForm.get('color')?.value);
      uploadData.append('RAM', this.reportAddForm.get('RAM')?.value);
      uploadData.append('ROM', this.reportAddForm.get('ROM')?.value);
      uploadData.append('frontCrach_top', this.statusWrite(this.reportAddForm.get('frontCrach_top')?.value));
      uploadData.append('frontCrach_center', this.statusWrite(this.reportAddForm.get('frontCrach_center')?.value));
      uploadData.append('frontCrach_bottom', this.statusWrite(this.reportAddForm.get('frontCrach_bottom')?.value));
      uploadData.append('backCrach_top', this.statusWrite(this.reportAddForm.get('backCrach_top')?.value));
      uploadData.append('backCrach_center', this.statusWrite(this.reportAddForm.get('backCrach_center')?.value));
      uploadData.append('backCrach_bottom', this.statusWrite(this.reportAddForm.get('backCrach_bottom')?.value));
      uploadData.append('additional_info', this.reportAddForm.get('additional_info')?.value);
      uploadData.append('devicePicture', this.reportAddForm.get('devicePicture')?.value);

      this.reportService.createReport(uploadData).subscribe((data:any) => {
        if(data.status){
          this.alertify.success(data.msg);
        }
        else {
          this.alertify.error(data.msg);
          console.log(this.reportAddForm.value);
        }
       }, error => { this.alertify.error("There has been an error!") },
       () => { 
        //  window.location.reload();
        }) 
  };

  cancel() {
    this.cancelAddReport.emit(false);
  }

  statusWrite(status: boolean) {
    if (status) {
      return '1';
    }
    else {
      return '0';
    }
  }


  Type() {
    this.types = [
      { id: 'Laptop' },
      { id: 'Mobile' },
    ];
  }

  onSelectType(brand: any){
    this.brands = this.Brand()
    .filter(e=> 
     e.id == brand.target.value);
     console.log(this.brands);
  }
  onSelectBrand(model: any){
    this.models = this.Model()
    .filter(e=> 
     e.id == model.target.value);
     console.log(this.models);
  }
  onSelectModel(){

  }


  Brand() {
    return [
      {
        id: 'Laptop',
        label: 'Laptop',
        img: '../../assets/img/laptop.png',
        items: [
          {
            id: 'Msi',
            label: 'Msi',
            img: '../../assets/brandIcons/msi.png',
          },
          { id: 'HP', label: 'HP', img: '../../assets/brandIcons/hp.png' },
          {
            id: 'Lenovo',
            label: 'Lenovo',
            img: '../../assets/brandIcons/lenovo.png',
          },
          {
            id: 'Dell',
            label: 'Dell',
            img: '../../assets/brandIcons/dell.png',
          },
          {
            id: 'Acer',
            label: 'Acer',
            img: '../../assets/brandIcons/acer.png',
          },
          {
            id: 'Asus',
            label: 'Asus',
            img: '../../assets/brandIcons/asus.png',
          },
        ],
      },
      {
        id: 'Mobile',
        label: 'Mobile',
        img: '../../assets/img/smartphone.png',
        items: [
          {
            id: 'SAMSUNG',
            label: 'SAMSUNG',
            img: '../../assets/brandIcons/samsung.png',
          },
          {
            id: 'REALME',
            label: 'REALME',
            img: '../../assets/brandIcons/realme.png',
          },
          {
            id: 'HONOR',
            label: 'HONOR',
            img: '../../assets/brandIcons/honor.png',
          },
          {
            id: 'HUAWEI',
            label: 'HUAWEI',
            img: '../../assets/brandIcons/huawei.png',
          },
          {
            id: 'XIAOMI',
            label: 'XIAOMI',
            img: '../../assets/brandIcons/xiaomi.png',
          },
          {
            id: 'OPPO',
            label: 'OPPO',
            img: '../../assets/brandIcons/oppo.png',
          },
        ],
      },
    ];
  }
    

  Model() {
    return [
      {
        type: 'laptop',
        id: 'Acer',
        label: 'Acer',
        img: '../../assets/brandIcons/acer.png',
        items: [
          { label: ' Aspire 3  A315 ', img: 'aspire3-a315-notebook.jpg' },
          { label: ' Aspire 5  Notebook ', img: 'aspire5-notebook.jpg' },
          { label: ' Nitro 5   An515', img: 'nitro5-an515.jpg' },
          { label: ' Predator Helios ', img: 'predator-helios.jpg' },
          { label: ' Swift 5 ', img: 'swift5.jpg' },
        ],
      },

      {
        type: 'laptop',
        id: 'Asus',
        label: 'Asus',
        img: '../../assets/brandIcons/asus.png',
        items: [
          { label: ' Expertbook ', img: 'expertbook.jpg' },
          { label: ' TufDash F15 ', img: 'tuf-dash-f15.jpg' },
          { label: ' Vivobook 15 ', img: 'vivobook15.jpg' },
          { label: ' Zenbook 13 ', img: 'zenbook13.jpg' },
        ],
      },

      {
        type: 'laptop',
        id: 'Dell',
        label: 'Dell',
        img: '../../assets/brandIcons/dell.png',
        items: [
          { label: ' G3 ', img: 'g3.jpg' },
          { label: ' G15 ', img: 'g15.jpg' },
          { label: ' Inspiron 7405 ', img: 'inspiron7405.jpg' },
          { label: ' Latitude 3520 ', img: 'latitude3520.jpg' },
          { label: ' Vostro 3500 ', img: 'vostro3500.jpg' },
        ],
      },

      {
        type: 'laptop',
        id: 'HP',
        label: 'HP',
        img: '../../assets/brandIcons/hp.png',
        items: [
          { label: ' Envy x360 ', img: 'envy-x360.jpg' },
          { label: ' G7 ', img: 'g7.jpg' },
          { label: ' Pavilion 15 ', img: 'pavilion15.jpg' },
          { label: ' Victus 16 ', img: 'victus16.jpg' },
        ],
      },

      {
        type: 'laptop',
        id: 'Lenovo',
        label: 'Lenovo',
        img: '../../assets/brandIcons/lenovo.png',
        items: [
          { label: ' Ideapad 5 ', img: 'ideapad5.jpg' },
          { label: ' Ideapad Flex 5 ', img: 'ideapad-flex5.jpg' },
          { label: ' Legion 5 ', img: 'legion5.jpg' },
          { label: ' V15 ', img: 'v15.jpg' },
          { label: ' YOGA 7 ', img: 'yoga7.jpg' },
        ],
      },

      {
        type: 'laptop',
        id: 'Msi',
        label: 'Msi',
        img: '../../assets/brandIcons/msi.png',
        items: [
          { label: ' Gaming GS76 ', img: 'gaming-gs76.jpg' },
          { label: ' GF63 ', img: 'gf63.jpg' },
          { label: ' GF65 ', img: 'gf65.jpg' },
          { label: ' Modern 14 ', img: 'modern14.jpg' },
          { label: ' sword15" ', img: 'sword15.jpg' },
        ],
      },

      {
        type: 'mobile',
        id: 'SAMSUNG',
        label: 'SAMSUNG',
        img: '../../assets/brandIcons/samsung.png',
        items: [
          { label: 'A12', img: 'a12.png' },
          { label: 'A33', img: 'a33.png' },
          { label: 'A52', img: 'a52.png' },
          { label: 'A72 ', img: 'a72.png' },
          { label: 'Galaxy NOTE 7', img: 'galaxy-note7.png' },
          { label: 'Galaxy NOTE 8', img: 'galaxy-note8.png' },
          { label: 'Galaxy NOTE 9', img: 'galaxy-note9.png' },
          { label: 'M31', img: 'm31.png' },
          { label: 'S20', img: 's20.png' },
          { label: 'S21', img: 's21.png' },
        ],
      },
      {
        type: 'mobile',
        id: 'REALME',
        label: 'REALME',
        img: '../../assets/brandIcons/oppo.png',
        items: [
          { label: '6', img: '6.png' },
          { label: '6I', img: '6i.png' },
          { label: '7', img: '7.png' },
          { label: '7 PRO', img: '7pro.png' },
          { label: '8 PRO', img: '8pro.png' },
          { label: 'C11', img: 'c11.png' },
          { label: 'C15', img: 'c15.png' },
          { label: 'C25', img: 'c15.png' },
        ],
      },
      {
        type: 'mobile',
        id: 'HONOR',
        label: 'HONOR',
        items: [
          { label: '8A', img: '8a.png' },
          { label: '8X', img: '8x.png' },
          { label: '9x PRO', img: '9x-pro.png' },
        ],
      },
      {
        type: 'mobile',
        id: 'HUAWEI',
        label: 'HUAWEI',
        img: '../../assets/img/huawei.png',
        items: [
          { label: 'NOVA 8', img: 'nova8.png' },
          { label: 'P30 PRO', img: 'p30-pro.png' },
          { label: 'P40 PRO', img: 'p40-pro.png' },
          { label: 'Y7 PRIME', img: 'y7-prime2019.png' },
        ],
      },
      {
        type: 'mobile',
        id: 'XIAOMI',
        label: 'XIAOMI',
        img: '../../assets/img/xiaomi.png',
        items: [
          { label: '9A', img: '9a.png' },
          { label: '9C', img: '9c.png' },
          { label: 'Mi 9T', img: '9t.png' },
          { label: 'NOTE 7', img: 'note7.png' },
          { label: 'NOTE 8', img: 'note8.png' },
          { label: 'NOTE 9S', img: 'note9s.png' },
          { label: 'NOTE 10', img: 'note10.png' },
          { label: 'NOTE 10 PRO', img: 'note10-pro.png' },
          { label: 'NOTE 11', img: 'note11.png' },
          { label: 'NOTE 11 PRO', img: 'note11-pro.png' },
          { label: 'POCO F1', img: 'poco-f1.png' },
          { label: 'POCO X3', img: 'poco-x3.png' },
        ],
      },
      {
        type: 'mobile',
        id: 'OPPO',
        label: 'OPPO',
        img: '../../assets/img/oppo.png',
        items: [
          { label: 'A12', img: 'a12.png' },
          { label: 'A54', img: 'a54.png' },
          { label: 'A74', img: 'a74.png' },
          { label: 'RENO 2Z', img: 'reno2-z.png' },
          { label: 'RENO 4', img: 'reno4.png' },
        ],
      },
    ];
  }
  


  

}
