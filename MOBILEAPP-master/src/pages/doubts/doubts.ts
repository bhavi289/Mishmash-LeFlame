import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { NgForm } from '@angular/forms';
import { Storage } from '@ionic/storage';

import { CommentsPage } from '../comments/comments';
/**
 * Generated class for the DoubtsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-doubts',
  templateUrl: 'doubts.html',
})
export class DoubtsPage {
  course_name : String;
  course_id : any;
  doubts : any = [];
  formData: {doubt_title?: string, doubt_description?:string} = {};

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public authService: AuthServiceProvider,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    ) {
    this.course_name = this.navParams.get('course_name');
    this.course_id = this.navParams.get('course_id');


  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present()
    this.storage.get('user').then((val) => {
      this.authService.loadDoubts(this.course_id, val['user']).subscribe((jsonResponse) => {
        loading.dismiss()
        console.log('jsonResponse', jsonResponse)
        this.doubts = jsonResponse
        console.log(this.doubts, "this.doubts")
      });
    });
  }

  submit(form: NgForm){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present()
    console.log(this.formData);
    this.storage.get('user').then((val) => {
      console.log(val,val['user'])
      this.authService.createDoubt(this.course_id, val['user'], this.formData).subscribe((jsonResponse) => {
        loading.dismiss()
        console.log(jsonResponse)
        this.ionViewDidLoad()
      })
    });
  }

  comment(doubt, doubt_title, doubt_description){
    console.log(doubt)
    this.navCtrl.push(CommentsPage, {'doubt_id':doubt, 'doubt_title':doubt_title, 'doubt_description':doubt_description});
  }

}
