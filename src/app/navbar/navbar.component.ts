import { Component, OnInit } from '@angular/core';
import { QuizService } from "../quiz.service";
import { Router } from "@angular/router";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private quizService: QuizService) { }

  ngOnInit(): void {
  }
  signOut() {
    localStorage.clear();
    clearInterval(this.quizService.timer);
    this.router.navigate(['/register'])
  }
}
