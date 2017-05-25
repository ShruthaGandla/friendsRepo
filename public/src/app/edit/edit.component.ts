import { Component, OnInit , OnDestroy} from '@angular/core';
import { HttpService } from '../http.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy {
  id = null;
  friend = null;
  sub =null;
  error =null;
  
  
  constructor(private _httpService: HttpService,private _route: ActivatedRoute,private _router:Router) {}
    
  

  ngOnInit() {

     this.sub = this._route.params.subscribe((param)=>{
      this.id = param.id; })
      
   
    this._httpService.getFriend(this.id)
    .then( data => { 
      if(data.message =="success"){
        this.friend = data.friend
        this.friend.bday = new Date(this.friend.bday).toDateString();
      }
      else{
        this.error = "Error in receiving data from api" //due to incorrect id
      }
     })
    .catch( err => { console.log(err); })
  }
  
  
  onUpdate(){
    console.log(this.friend);
    this._httpService.updateFriend(this.friend, this.id);
     this._router.navigate(['/dashboard'])

  }

  ngOnDestroy(){
    this.sub.unsubscribe();

  }

}
