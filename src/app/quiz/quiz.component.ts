import { Component, OnInit } from '@angular/core';
import { QuizService } from "../quiz.service";
import { Router } from "@angular/router";
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  seconds;
  qnProgress;
  timer;
  ques;
  submit: boolean = false;
  selected: any;
  default: boolean;
  disable: boolean = false;
  nextDisable: boolean = true;
  constructor(private router: Router, private quizService: QuizService) { }

  ngOnInit(): void {
    this.seconds = this.quizService.seconds;
    //this.quizService.seconds = 0;
    this.qnProgress = this.quizService.qnProgress;
    this.timer = this.quizService.timer;
    this.ques = this.quizService.quizQues
    this.seconds = 0;
    this.qnProgress = 0;
    this.startTimer();
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.seconds++;
    }, 1000)
  }

  displayTime() {
    var time = Math.floor(this.seconds / 3600) + ':' + Math.floor(this.seconds / 60) + ':' + Math.floor(this.seconds % 60)
    this.quizService.totalTime = time;
    return time;
  }
  checkAnswer(i) {
    this.nextDisable = false;
    this.disable = true;
    this.submit = true;
    console.log(this.ques[this.qnProgress].options[i])
    if (this.ques[this.qnProgress].options[i] == this.ques[this.qnProgress].answer) {
      this.submit = true;
      this.selected = i;
      this.default = false;
      this.quizService.updateScore(this.quizService.userData._id)
        .subscribe((score) => {
          if (score == null) {
            console.log("score has not updated")
          }
        })
    }
    else {
      this.selected = i;
      this.submit = false;
      this.default = false;
    }

    // setTimeout(() => {
    //   if (this.qnProgress < 9) {
    //     this.qnProgress++;
    //     this.default = true;
    //     this.submit = false;
    //   }
    //   else {
    //     this.router.navigate(['/result'])
    //   }
    // }, 1000);

  }
  next() {
    if (this.qnProgress < 9) {
      this.nextDisable = true;
      this.disable = false;
      this.qnProgress++;
      this.default = true;
      this.submit = false;
    }
    else {
      //this.quizService.totalTime.next(this.displayTime());
      this.router.navigate(['/result'])
    }
  }
}
