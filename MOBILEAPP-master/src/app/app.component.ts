import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { QuizPage } from '../pages/quiz/quiz';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { LoginPage } from '../pages/login/login';
import { ResultsPage } from '../pages/results/results';
import { DoubtsPage } from '../pages/doubts/doubts';
import { MeetingPage } from '../pages/meeting/meeting';
import { CoursesPage } from '../pages/courses/courses';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public storage: Storage
    ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      // { title: 'Home', component: HomePage },
      // { title: 'List', component: ListPage },
      { title: 'Dashboard', component: DashboardPage, icon:"ios-american-football" },
      { title: 'Quiz', component: QuizPage, icon:"ios-paper-outline" },
      { title: 'Results', component: ResultsPage, icon:"ios-book" },
      { title: 'Doubts', component: DoubtsPage, icon:"ios-hand-outline" },
      { title: 'Meetings', component: MeetingPage, icon:"md-contacts" },

    ];

    this.storage.get('isLoggedIn').then((isLoggedIn) => {
      if (isLoggedIn){
          this.rootPage = DashboardPage;
      }
      else{
          this.rootPage = LoginPage;
      }
    })

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    page = page.component
    if(page == DashboardPage){
      this.nav.setRoot(DashboardPage);
    }
    else if(page == QuizPage){
      this.nav.setRoot(CoursesPage, {"active_tab":"quiz"});
    }
    else if(page == ResultsPage){
      this.nav.setRoot(CoursesPage, {"active_tab":"results"});
    }
    else if(page == DoubtsPage){
      this.nav.setRoot(CoursesPage, {"active_tab":"doubts"});
    }
    else if(page == MeetingPage){
      this.nav.setRoot(CoursesPage, {"active_tab":"meetings"});
    }
  }

  logout(){
  	this.storage.remove('user');
    this.storage.set('isLoggedIn',false);
    this.storage.remove('user');
    this.rootPage = LoginPage;
    this.nav.setRoot(LoginPage);
  }
}
