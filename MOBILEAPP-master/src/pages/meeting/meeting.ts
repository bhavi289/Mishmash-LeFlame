import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { NgForm } from '@angular/forms';

/**
 * Generated class for the MeetingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-meeting',
  templateUrl: 'meeting.html',
})
export class MeetingPage {

  formData: {meeting_title?: string, meeting_description?:string} = {};
  course_name : String;
  course_id : any;
  meetings: any = []
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
    console.log('ionViewDidLoad MeetingPage');
    this.storage.get('user').then((val) => {
      this.authService.getMeetings(this.course_id, val['user']).subscribe((jsonResponse) => {
        loading.dismiss()
        console.log('jsonResponse', jsonResponse)
        this.meetings = jsonResponse
        console.log(this.meetings, "this.meetings")
      },err=>{
        loading.dismiss()
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
      this.authService.createMeeting(this.course_id, val['user'], this.formData).subscribe((jsonResponse) => {
        console.log(jsonResponse)
        loading.dismiss()
        if(jsonResponse){
          this.ionViewDidLoad()
        }
      })
    }, err=>{
      loading.dismiss()
    });
  }

}
