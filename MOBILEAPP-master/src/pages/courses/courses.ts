import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController, ToastController, LoadingController } from 'ionic-angular';
import { QuizPage } from '../quiz/quiz';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { DoubtsPage } from '../doubts/doubts';
import { Storage } from '@ionic/storage';
import { ResultsPage } from '../results/results';
import { MeetingPage } from '../meeting/meeting';

/**
 * Generated class for the CoursesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-courses',
  templateUrl: 'courses.html',
})
export class CoursesPage {
  tab:String;
  select_courses_for:String;
  courses : any = [];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public alertCtrl: AlertController, 
    public authService: AuthServiceProvider,
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public storage: Storage) {
  }

  ionViewDidLoad() {
  	this.tab = this.navParams.get('active_tab')
  	if(this.tab == "quiz"){
  		this.select_courses_for = "Quiz"
    }
    else if(this.tab == "doubts"){
  		this.select_courses_for = "Doubts"
    }
    else if(this.tab == "results"){
  		this.select_courses_for = "Results"
    }
    this.storage.get('user').then((val) => {
      this.authService.allCourses(val['user']).subscribe((jsonResponse) => {
        console.log('jsonResponse', jsonResponse)
        this.courses = jsonResponse
      });
    });
  }

  Action(course_id: any, course_name : String){
  	if(this.tab == "quiz"){
  		this.quizId(course_id)
    }
    else if(this.tab == "doubts"){
      this.navCtrl.push(DoubtsPage, {'course_id':course_id, "course_name":course_name});
    }
    else if(this.tab == "results"){
      this.navCtrl.push(ResultsPage, {'course_id':course_id, "course_name":course_name})
    }
    else if(this.tab == "meetings"){
      this.navCtrl.push(MeetingPage, {'course_id':course_id, "course_name":course_name})
    }
  }

  quizId(course_id) {
    const prompt = this.alertCtrl.create({
      title: 'Quiz ID Required',
      message: "Please enter Quiz ID as specified by your professor",
      inputs: [
        {
          name: 'quiz_id',
          placeholder: 'Enter Quiz Id'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Start Quiz',
          handler: data => {
            if (data.quiz_id==""){
              console.log("not sending")
              let toast = this.toastCtrl.create({
                message: 'Quiz ID cannot be blank',
                duration: 3000,
                position: 'top'
              });
              toast.present();
            }
            else{
              let loading = this.loadingCtrl.create({
                content: 'Please wait...'
              });
              loading.present()
              this.storage.get('user').then((val) => {
                this.authService.checkQuiz(data.quiz_id, course_id, val['user']).subscribe((jsonResponse) => {
                  console.log('jsonResponse', jsonResponse)
                  if(jsonResponse['check']=="Success"){
                    this.navCtrl.push(QuizPage, {"quiz_id":data.quiz_id});
                    loading.dismiss();
                  }
                  else if(jsonResponse['check']=="Fail"){
                    let toast = this.toastCtrl.create({
                      message: 'No active quiz with this Quiz ID for this course',
                      duration: 3000,
                      position: 'bottom'
                    });
                    toast.present();
                    loading.dismiss();
                  }
                  else if(jsonResponse['check']=="Completed"){
                    loading.dismiss();
                    let toast = this.toastCtrl.create({
                      message: 'You Have Already Completed This Quiz',
                      duration: 3000,
                      position: 'bottom'
                    });
                    toast.present();
                  }	
                },
                err => {
                  let toast = this.toastCtrl.create({
                    message: 'No active quiz with this Quiz ID for this course',
                    duration: 3000,
                    position: 'bottom'
                  });
                  toast.present();
                  loading.dismiss();

                });
              });  
            }
          }
        }
      ]
    });
    prompt.present();
  }

}
