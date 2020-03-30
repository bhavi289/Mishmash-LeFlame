import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ResultsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-results',
  templateUrl: 'results.html',
})
export class ResultsPage {
  course_id: any;
  course_name: any;
  results: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthServiceProvider,
    public loadingCtrl: LoadingController,
    public storage: Storage
    ) {
      this.course_id = this.navParams.get('course_id')
      this.course_name = this.navParams.get('course_name')
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present()
    console.log('ionViewDidLoad ResultsPage');
    this.storage.get('user').then((val) => {
      this.authService.allQuizes(this.course_id, val['user']).subscribe((jsonResponse) => {
        loading.dismiss()
        this.results = jsonResponse;
        console.log(this.results)
      });
    });
  }

}
