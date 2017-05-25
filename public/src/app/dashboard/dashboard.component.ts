import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  myFriends = [];
  errors =null;
  constructor(private _httpService: HttpService) { }

  ngOnInit() {

      this._httpService.retrieveData()
      .then( data => { 
        if(data.message == "success"){
          this.myFriends = data.friends;
        }
         else {
           this.errors = "There is an error in fetching data from api";
         } 
        })
      .catch( err => { console.log(err); })

  }

  delete(id){
    this._httpService.delete(id)
    .then((data)=>{
      if(data.message == "success"){
          this._httpService.retrieveData()
        }
         else {
           this.errors = "There is an error in fetching data from api";
         } 
      

    })
    .catch( err => { console.log(err); })


  }

}
