var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Pipe } from '@angular/core';
import { HomePage } from '../home/home';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/take';

var ListPage = /** @class */ (function () {

    function ListPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.counter = 10;
        this.tick = 1000;
    }

    ListPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.countDown = Observable.timer(0, this.tick)
            .take(this.counter)
            .map(function () { return --_this.counter; });
    };

    ListPage = __decorate([
        Component({
            selector: 'page-list',
            templateUrl: 'list.html'
        }),
        __metadata("design:paramtypes", [NavController, NavParams])
    ], ListPage);

    return ListPage;
}());


export { ListPage };

var FormatTimePipe = /** @class */ (function () {

    function FormatTimePipe(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }

    FormatTimePipe.prototype.transform = function (value) {
        console.log("frakd", value);
        if (value == 0) {
            this.navCtrl.push(HomePage);
        }
        var minutes = Math.floor(value / 60);
        return ('00' + minutes).slice(-2) + ':' + ('00' + Math.floor(value - minutes * 60)).slice(-2);
    };

    FormatTimePipe = __decorate([
        Pipe({
            name: 'formatTime'
        }),
        __metadata("design:paramtypes", [NavController, NavParams])
    ], FormatTimePipe);

    return FormatTimePipe;

}());

export { FormatTimePipe };

//# sourceMappingURL=list.js.map