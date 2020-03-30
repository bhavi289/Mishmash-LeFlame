import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QuizPage } from '../quiz/quiz';
import { CoursesPage } from '../courses/courses';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage';
import { ResultsPage } from '../results/results';

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  name : string;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public authService: AuthServiceProvider,
    public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
    this.storage.get('user').then((val) => {
      this.name = val['name']
    });
  }

  quiz(){
  	this.navCtrl.setRoot(CoursesPage, {"active_tab":"quiz"});
  }

  doubts(){
  	this.navCtrl.setRoot(CoursesPage, {"active_tab":"doubts"});    
  }

  results(){
    this.navCtrl.setRoot(CoursesPage, {"active_tab":"results"})
  }

  meetings(){
    this.navCtrl.setRoot(CoursesPage, {"active_tab":"meetings"})
  }

}
