import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild, viewChild, viewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  studentsList:Student[]=[];
  ngOnInit(): void {
    const data=localStorage.getItem('Allstudents');
    if (data != null) {
      this.studentsList= JSON.parse(data);

    }
  }

  title = 'Crud_LocalStorage_Ang17';
  
  @ViewChild("myModal") AddModal!:ElementRef
  // @ViewChild("myModal") AddModaql:ElementRef |undefined
  
  StudentObj :Student=new Student()
  OldObj! :Student;
  
  
  
  OpenModel(){
    const model= document.getElementById("myModal");
    if (model != null) {
      model.style.display='block'
    }
    
  }
  closeModel(){
    
    if (this.AddModal != null) {
      this.AddModal.nativeElement.style.display='none'
    }
    this.StudentObj = new Student();
  }
  
  SaveStudent(obj:Student){
    debugger
    const IsLocalEmpty = localStorage.getItem('Allstudents');
    if(IsLocalEmpty!= null ){
      const OldStudentsArr= JSON.parse(IsLocalEmpty);
      OldStudentsArr.push(this.StudentObj);
      obj.id=OldStudentsArr.length +1;
      this.studentsList=OldStudentsArr;
      
      localStorage.setItem('Allstudents',JSON.stringify(OldStudentsArr))
    }else
    {
      const StudentsArr=[];
      this.StudentObj.id=0;
      StudentsArr.push(this.StudentObj);
      
      this.studentsList=StudentsArr;
      localStorage.setItem('Allstudents',JSON.stringify(StudentsArr))
    }
    this.closeModel();
  }
  
  DeleteStudent(obj:Student){
    let issure=confirm("are you sure ")
    if(issure){
      let deletedindex=this.studentsList.findIndex(x=>x===obj);
      this.studentsList.splice(deletedindex,1);
      localStorage.setItem('Allstudents',JSON.stringify(this.studentsList))
    }
  }
  EditeSt(obj:Student){
    this.OldObj=obj;
    this.StudentObj=obj
    this.OpenModel();
  }
  UpdateStudent(obj:Student){
    let old = this.studentsList.find(m=>m===this.OldObj);
    old=this.StudentObj;
    localStorage.setItem("Allstudents",JSON.stringify(this.studentsList))
    this.closeModel();
  }
}

export class Student{
  constructor(){
   
    this.MobileNo=""
    this.Email=""
    this.city=""
    this.state=""
    this.pincode=""
    this.address=""
    
  }
  id!:number;
  Name!:string;
  MobileNo:string;
  Email:string;
  city :string;
  state :string;
  pincode :string;
  address :string;
}
