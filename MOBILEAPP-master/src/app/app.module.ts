import { FormsModule } from '@angular/forms';
import { MbscModule } from '@mobiscroll/angular';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { QuizPage } from '../pages/quiz/quiz';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { CoursesPage } from '../pages/courses/courses';
import { DoubtsPage } from '../pages/doubts/doubts';
import { FormatTimePipe } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { CommentsPage } from '../pages/comments/comments';
import { ResultsPage } from '../pages/results/results';
import { MeetingPage } from '../pages/meeting/meeting';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { FlashCardComponent } from '../components/flash-card/flash-card';
import { Data } from '../providers/data';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    FlashCardComponent,
    FormatTimePipe,
    QuizPage,
    DashboardPage,
    CoursesPage,
    DoubtsPage,
    LoginPage,
    CommentsPage,
    ResultsPage,
    MeetingPage
  ],
  imports: [ 
    FormsModule, 
    MbscModule,
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    QuizPage,
    DashboardPage,
    CoursesPage,
    DoubtsPage,
    LoginPage,
    CommentsPage,
    ResultsPage,
    MeetingPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}, Data,
    AuthServiceProvider,
  ]
})
export class AppModule {}
