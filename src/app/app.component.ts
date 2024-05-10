import { Component, ElementRef, ViewChild, viewChild, viewChildren } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Crud_LocalStorage_Ang17';
  
  @ViewChild("myModal") AddModal!:ElementRef
  // @ViewChild("myModal") AddModaql:ElementRef |undefined
  
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
  }
}
