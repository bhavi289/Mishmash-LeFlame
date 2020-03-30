var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Data } from '../../providers/data';

/**
 * Generated class for the QuizPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 * Author: Anurag Gupta
 */
// @IonicPage()

var QuizPage = /** @class */ (function () {

    function QuizPage(navCtrl, dataService) {
        this.navCtrl = navCtrl;
        this.dataService = dataService;
        this.hasAnswered = false;
        this.score = 0;
    }

    QuizPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.slides.lockSwipes(true);
        this.dataService.load().then(function (data) {
            data.map(function (question) {
                var originalOrder = question.answers;
                question.answers = _this.randomizeAnswers(originalOrder);
                return question;
            });
            _this.questions = data;
        });
    };

    QuizPage.prototype.nextSlide = function () {
        this.slides.lockSwipes(false);
        this.slides.slideNext();
        this.slides.lockSwipes(true);
    };

    QuizPage.prototype.selectAnswer = function (answer, question) {
        var _this = this;
        this.hasAnswered = true;
        answer.selected = true;
        question.flashCardFlipped = true;
        if (answer.correct) {
            this.score++;
        }
        setTimeout(function () {
            _this.hasAnswered = false;
            _this.nextSlide();
            answer.selected = false;
            question.flashCardFlipped = false;
        }, 500);
    };

    QuizPage.prototype.randomizeAnswers = function (rawAnswers) {
        for (var i = rawAnswers.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = rawAnswers[i];
            rawAnswers[i] = rawAnswers[j];
            rawAnswers[j] = temp;
        }
        return rawAnswers;
    };

    QuizPage.prototype.restartQuiz = function () {
        this.score = 0;
        this.slides.lockSwipes(false);
        this.slides.slideTo(1, 1000);
        this.slides.lockSwipes(true);
    };

    __decorate([
        ViewChild('slides'),
        __metadata("design:type", Object)
    ], QuizPage.prototype, "slides", void 0);
    QuizPage = __decorate([
        Component({
            selector: 'page-quiz',
            templateUrl: 'quiz.html',
        }),
        __metadata("design:paramtypes", [NavController, Data])
    ], QuizPage);

    return QuizPage;

}());

export { QuizPage };


//# sourceMappingURL=quiz.js.map