import { Injectable } from '@angular/core';
import { of, Subject, throwError } from "rxjs";
import { switchMap, catchError } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  seconds: number;
  timer;
  question;
  quizQues;
  qnProgress: number;
  userData;
  userScore;
  totalTime;

  private apiUrl = "/api/"
  constructor(private httpClient: HttpClient) { }

  insertParticipant(name: string, email: string) {
    const registerCredentials = { name, email };

    return this.httpClient
      .post(`${this.apiUrl}register`, registerCredentials)
      .pipe(
        switchMap(data => {
          this.userData = data["data"];
          return of(data);
        }),
        catchError(e => {
          console.log(`login failed`, e);
          return throwError("Already exists email,please use different one");
        })
      );
  }

  insertQuestions(ques) {

    return this.httpClient
      .post(`${this.apiUrl}questions`, ques)
      .pipe(
        switchMap(ques => {
          return of(ques);
        }),
        catchError(e => {
          console.log(`login failed`, e);
          return throwError("faided to save questions");
        })
      );
  }

  questions() {
    return this.httpClient.get(`https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple`).pipe(
      switchMap(questions => {
        return of(questions);
      }),
      catchError(e => {
        console.log(`server error occured`, e);
        return throwError("Error occured while retriveing questions try again");
      })
    );
  }

  updateScore(id) {
    console.log("service", id)
    return this.httpClient
      .get(`${this.apiUrl}updatescore/${id}`)
      .pipe(
        switchMap(userDetails => {
          // this.userScore = score;
          // console.log(this.userScore)
          return of(userDetails);
        }),
        catchError(e => {
          console.log(`login failed`, e);
          return throwError("can't update score");
        })
      );
  }

  getScore(id) {
    console.log("service", id)
    return this.httpClient
      .get(`${this.apiUrl}getscore/${id}`)
      .pipe(
        switchMap(score => {
          this.userScore = score;
          console.log(this.userScore)
          return of(score);
        }),
        catchError(e => {
          console.log(`login failed`, e);
          return throwError("error while getting score");
        })
      );
  }


}
