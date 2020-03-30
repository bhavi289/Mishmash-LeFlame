import { Component, ViewChild, ElementRef,  } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Data } from '../../providers/data';
import { Pipe, PipeTransform } from '@angular/core';
// import { Observable } from 'rxjs/Observable'
import { Observable } from 'rxjs/Rx';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage';
import { DashboardPage } from '../dashboard/dashboard';

/**
 * Generated class for the QuizPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-quiz',
  templateUrl: 'quiz.html',
})
export class QuizPage {

  @ViewChild('slides') slides: any;
	public source;
	quiz_id: String = "";
	hasAnswered: boolean = false;
	last_question_answered: boolean = false;
	score: number = 0;
	maxTime: any=10;
	question_number: number=0;
	total_questions: number;
	public timer;
	public hidevalue;
	question_response: any = [];

	slideOptions: any;
	questions: any;

	constructor(
		public navCtrl: NavController, 
		public dataService: Data,
		private elementRef: ElementRef,
		public authService: AuthServiceProvider,
		public navParams: NavParams,
		public storage: Storage,
		public loadingCtrl: LoadingController,
		private toastCtrl: ToastController,
		) {
		
			this.quiz_id = this.navParams.get('quiz_id');
	}

	ionViewDidLoad() {

		let loading = this.loadingCtrl.create({
		content: 'Please wait...'
		});
		loading.present()
		this.slides.lockSwipes(true);
		this.authService.quizDetails(this.quiz_id).subscribe((jsonResponse) => {
			loading.dismiss();
			console.log('jsonResponse', jsonResponse);
			jsonResponse['questions'].map((question) => {
				return question;
			})		

		  this.questions = jsonResponse['questions'];
		  this.total_questions = this.questions.length
		  console.log(this.total_questions, "total questions", this.questions[0]['questionTime'])
		}, err => {
			loading.dismiss()
		});   

	}

	StartTimer(){
		this.timer = setTimeout(x => {
			if(this.maxTime <= 0) { 
				console.log("less than zero")
				this.unansweredQuestion()
			}
			this.maxTime -= 1;

			if(this.maxTime>=0){
				var callDuration = this.elementRef.nativeElement.querySelector('#time');
				callDuration.textContent = this.maxTime;

				console.log(this.maxTime);
				this.hidevalue = false;
				this.StartTimer();
			}
			else{
				this.hidevalue = true;
			}

		}, 1000);
	}

	showToast(response_message:any){
		let toast = this.toastCtrl.create({
			message: response_message,
			duration: 2200
		});
		toast.present();
	}
	
	startQuiz(){
		this.slides.lockSwipes(false);
		this.slides.slideNext();
		this.slides.lockSwipes(true);
		this.maxTime = this.questions[this.question_number]['questionTime']
		this.StartTimer()
	}

	unansweredQuestion(){
		setTimeout(() => {
			this.question_response[this.question_number] = ["left",this.questions[this.question_number]['question_id'], 0]
			this.question_number += 1;
			this.hasAnswered = false;
			this.slides.lockSwipes(false);
			this.slides.slideNext();
			this.slides.lockSwipes(true);
			if(this.question_number < this.total_questions){
				this.maxTime = this.questions[this.question_number]['questionTime']
				this.StartTimer()
			}
			// answer.selected = false;
			// question.flashCardFlipped = false;
		}, 100);
	}

	quizComplete(){
		let loading = this.loadingCtrl.create({
			content: 'Please wait...'
			});
			loading.present()
		this.storage.get('user').then((val) => {
			console.log(this.quiz_id, "is jndskn")
			this.authService.quizComplete(this.question_response, this.quiz_id, val['user'], this.score).subscribe((jsonResponse) => {
				console.log(jsonResponse)
				loading.dismiss()
				if (jsonResponse){
					this.navCtrl.setRoot(DashboardPage);
					this.showToast("Quiz Over! Responses Have Been Recorded")
				}
				else{
					this.navCtrl.setRoot(DashboardPage);
					this.showToast("Responses Not Recorded. Please contact Professor.")
				}
			},err=>{
				loading.dismiss()
			});
		})
	}

	nextSlide(){
		console.log("this.question_no = ", this.question_number, ", this.total_question = ", this.total_questions)
		if(this.question_number >= this.total_questions){
			this.quizComplete()
			console.log("question responses ",this.question_response)
			clearTimeout(this.timer);
		}
		this.slides.lockSwipes(false);
		this.slides.slideNext();
		this.slides.lockSwipes(true);
	}

	selectAnswer(answer, question){
		if(answer.correct){
			this.score += this.questions[this.question_number]['questionMarks'];
			this.question_response[this.question_number] = ["correct", this.questions[this.question_number]['question_id'], answer.option_id]
		}
		else{
			this.question_response[this.question_number] = ["wrong", this.questions[this.question_number]['question_id'], answer.option_id]
		}
		this.question_number += 1;
		this.hasAnswered = true;
		answer.selected = true;
		question.flashCardFlipped = true;

		clearTimeout(this.timer);

		setTimeout(() => {
			this.hasAnswered = false;
			if(this.question_number < this.total_questions){
				this.maxTime = this.questions[this.question_number]['questionTime']
				this.StartTimer()
			}
			this.nextSlide();
			answer.selected = false;
			question.flashCardFlipped = false;
		}, 100);
	}

	randomizeAnswers(rawAnswers: any[]): any[] {

		for (let i = rawAnswers.length - 1; i > 0; i--) {
		    let j = Math.floor(Math.random() * (i + 1));
		    let temp = rawAnswers[i];
		    rawAnswers[i] = rawAnswers[j];
		    rawAnswers[j] = temp;
		}

		return rawAnswers;

	}

	restartQuiz() {
		this.score = 0;
		this.slides.lockSwipes(false);
		this.slides.slideTo(1, 1000);
		this.slides.lockSwipes(true);
	}

}
