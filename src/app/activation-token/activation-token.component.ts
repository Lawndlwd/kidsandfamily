import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-activation-token',
  templateUrl: './activation-token.component.html',
  styleUrls: ['./activation-token.component.css']
})
export class ActivationTokenComponent implements OnInit {
  token: string;
  id: number;

  constructor(private router: Router, private authService: AuthService , private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.params.token;
    this.id = this.route.snapshot.params.id;


    this.authService.checkToken(this.token, this.id).subscribe(resData => {
      if (resData){
          this.router.navigate(['/auth']);
      }
    });
  }
}
