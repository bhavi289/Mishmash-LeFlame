import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the CommentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comments',
  templateUrl: 'comments.html',
})
export class CommentsPage {
  comment: String;
  doubt_id: any;
  doubt_title: any;
  doubt_description: any;
  comments: any = [];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public authService: AuthServiceProvider,
    public storage: Storage,
    public loadingCtrl: LoadingController,

  ) {
    this.doubt_id = this.navParams.get('doubt_id')
    this.doubt_title = this.navParams.get('doubt_title')
    this.doubt_description = this.navParams.get('doubt_description')

  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present()
    console.log('ionViewDidLoad CommentsPage');
    this.authService.allComments(this.doubt_id).subscribe((jsonResponse) => {
      loading.dismiss()
      console.log(jsonResponse)
      this.comments = jsonResponse;
    });
  }

  submit(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present()
    this.storage.get('user').then((val) => {
      this.authService.commentOnDoubt(this.doubt_id, val['user'], this.comment).subscribe((jsonResponse) => {
        loading.dismiss()
        this.ionViewDidLoad()
      });
    })
  }

}
