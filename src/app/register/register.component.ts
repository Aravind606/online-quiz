import { Component, OnInit } from '@angular/core';
import { QuizService } from "../quiz.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: string;
  email: string;
  quesData;
  options;
  errorMsg;

  constructor(private router: Router, private quizService: QuizService) { }

  ngOnInit(): void {
    this.quizService.questions().subscribe(ques => {
      // console.log(ques["results"])
      this.quesData = ques["results"];
      //console.log(this.quesData);

      this.quizService.insertQuestions(this.quesData)
        .subscribe(ques => {
          //console.log(ques["question"]["questions"]);
          this.quizService.question = ques["question"]["questions"];
          console.log(this.quizService.question)
          this.options = [];
          this.quizService.quizQues = this.quizService.question.map(ele => {

            this.options = ele.incorrect_answers
            this.options.push(ele.correct_answer)
            for (var i = this.options.length - 1; i > 1; i--) {
              var j = Math.floor(Math.random() * (i + 1));
              var temp = this.options[i];
              this.options[i] = this.options[j];
              this.options[j] = temp;
            }
            //console.log(this.options, this.options[1])
            return {
              question: ele.question,
              options: this.options,
              answer: ele.correct_answer,
            }
          })

          console.log(this.quizService.quizQues);
        })
    })
  }

  register() {
    //console.log(this.name, this.email)
    this.quizService.insertParticipant(this.name, this.email)
      .subscribe(s => {
        if (s == null) {
          this.errorMsg = "Already exists email,please use different one"
        }
        else {
          this.router.navigate(["/start"]);
        }

      })

  }
}
