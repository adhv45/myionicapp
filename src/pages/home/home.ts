import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {SecondPage} from "../second/second";
import {DatafetchProvider} from "../../providers/datafetch/datafetch";
import {Http, RequestOptions, Headers} from "@angular/http";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  username: string;
  password: string;
  addcomments: string;
  pass:string;
  comment: any = ["anil", "arpan", "jayash"];
  student_name: string;
  student_batch: number;
  student_year: string;
  students: any;
  all: any;
  update: any;

  constructor(public navCtrl: NavController, public datafetch: DatafetchProvider, public http: Http) {

    this.getdata();
  }


  getdata() {
    this.datafetch.load().then((data) => {

      this.students = (data);
      console.log(JSON.stringify(data));
      this.all = this.students.students;
    })
  }

  addcomment() {
    this.comment.push(this.addcomments);
    this.addcomments = "";
  }

  removeItem() {
    this.comment.pop(this.addcomments);
  }

  //addstudent(){
  //this.students.push({"name":this.student_name,"batch":this.student_batch,"year":this.student_year});
  //}

  gotosecondpage() {
    //if (this.username == "anil" && this.password == "234598")
      this.navCtrl.push(SecondPage, {"username": this.username});
  }

  setdata() {
    this.update = {
      name: this.username,
      password: this.password,
    };
    console.log("data sending");
    var headers = new Headers();

    headers.append('content-type','application/json;charset=UTF-8');
    headers.append('Access-Control-Allow-Origin','*');
    let options = new RequestOptions({headers:headers});

    this.http.post("https://vehiclevaioti.herokuapp.com/insert",JSON.stringify(this.update),options)
      .map(res => res.json()).subscribe(data=>{
      console.log(data)
    }, err =>{
      console.log("Error!:",err.json());
    });
    this.gotosecondpage();
  }
}
