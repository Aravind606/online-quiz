import { Component, OnInit } from '@angular/core';
import { QuizService } from "../quiz.service";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  score;
  result;
  timeTaken
  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    this.timeTaken = this.quizService.totalTime
    console.log(this.timeTaken)
    // this.quizService.totalTime.subscribe(result => {
    //   console.log(result)
    //   this.timeTaken = result;
    // });

    // console.log("result comp", this.quizService.userData._id)
    this.quizService.getScore(this.quizService.userData._id)
      .subscribe(result => {
        if (result == null) {
          console.log("error in result")
        }
        else {
          // console.log(result[0].score);
          this.score = result[0].score;
          console.log(this.score)
          if (this.score >= 5) {
            this.result = "PASS";
          }
          else {
            this.result = "FAIL"
          }
        }
      })
  }

}
