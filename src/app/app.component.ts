import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'course-project';
  feature='recipe';
  // onNavigate(selectedFeature:string){
  //   console.log("Got Event",selectedFeature);
  //   this.feature=selectedFeature;
  // }


  constructor(private authService:AuthService){
  
  }
  ngOnInit(): void {
    this.authService.autoLogin();
  }

}
