import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController, Events, LoadingController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { DashboardPage } from '../dashboard/dashboard';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  login: {ph_number?: string, password?: string} = {};
  submitted = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public authService: AuthServiceProvider, public storage: Storage, public events: Events,public loadingCtrl: LoadingController, ) {
  }
 /* gotohome(){
    this.navCtrl.push(HomePage);
  }*/

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  onLogin(form: NgForm)
  {
  	
    this.submitted = true;

        if (form.valid)
        {
            let loading = this.loadingCtrl.create({
                content: "<div>Login wait...</div>",
                duration: 100,
                dismissOnPageChange: true
            });
            loading.present();
            console.log(this.login);
              this.authService.login(this.login).subscribe((jsonResponse) => {
                  if(loading){
                    loading.dismiss();
                    loading = null;
                  }
                  console.log("JSONRESPONSE",jsonResponse);
                  if(jsonResponse.pass=="Success"){
                    this.storage.set('isLoggedIn', true);
                    this.storage.set('user',jsonResponse);
                    this.navCtrl.setRoot(DashboardPage);
                    // this.navCtrl.popToRoot();
                    this.showToast("Successfull Login");
                  }
                  else{
                    this.showToast("Wrong username or Password");
                    this.storage.set('isLoggedIn', false);
                  }

              });
            

        
  	console.log(this.login);
    }
    
  }

  showToast(response_message:any)
  {
      let toast = this.toastCtrl.create({
          message: response_message,
          duration: 2200
      });
      toast.present();
  }
  refresh() {
    console.log("refresh called");
    this.ionViewDidLoad();  
  }
}


