import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';//this is used to redirect after creating a new friend
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  friend ={firstName:'',lastName:'',bday:''};
  errors =null;


  constructor(private _httpService: HttpService,private _router:Router) { }

  ngOnInit() {
  
  }
  
  onSubmit(){
     this._httpService.createFriend(this.friend)
     .then((data) =>{
       if(data.message == "success"){
         this.errors =null //to reset the value from previous error
          this._router.navigate(['/dashboard'])
        }
         else {
           this.errors = "There is an error in fetching data from api";
         } 
       
     })
      .catch( err => { console.log(err); })
      
  
  }
  
  

}
