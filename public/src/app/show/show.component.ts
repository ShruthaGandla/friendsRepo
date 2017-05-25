import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpService } from '../http.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit, OnDestroy {
  id = null;
  oneFriend = null;
  sub =null;
  error =null;

  constructor(private _httpService: HttpService,private _route: ActivatedRoute){}
    
  


  ngOnInit() {
    this.sub = this._route.params.subscribe((param)=>{
      this.id = param.id;})
  
    this._httpService.getFriend(this.id)
    .then( data => { 
      if(data.message =="success"){
        this.oneFriend = data.friend;
      }
      else{
        this.error = "Hey error is receiving data from api";//when incorrect id is given
      }
      })
    .catch( err => { console.log(err); })

  }
  

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
