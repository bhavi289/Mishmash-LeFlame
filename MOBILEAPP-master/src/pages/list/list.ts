import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable'
import { Pipe, PipeTransform } from '@angular/core';
import { HomePage } from '../home/home';
import 'rxjs/add/operator/map'
import 'rxjs/add/observable/timer'
import 'rxjs/add/operator/take'

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})

export class ListPage {

  countDown;
  counter = 10;
  tick = 1000;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {

    this.countDown = Observable.timer(0, this.tick)
      .take(this.counter)
      .map(() => --this.counter)

  }

}

@Pipe({
  name: 'formatTime'
})

export class FormatTimePipe implements PipeTransform {

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  transform(value: number): string {
    // console.log("frakd", value)
    if (value == 0) {
      // this.navCtrl.push(HomePage)
      // this.navCtrl.push(HomePage)
    }
    // if (value == 0) {
    //   // this.navCtrl.push(HomePage)
    //   // this.navCtrl.push(HomePage)
    // }
    const minutes: number = Math.floor(value / 60);
    return ('00' + minutes).slice(-2) + ':' + ('00' + Math.floor(value - minutes * 60)).slice(-2);

  }

}
