import {Component, OnInit} from '@angular/core';
import {AuthService} from 'src/app/core/services/auth/auth.service';
import {UserModel} from 'src/app/core/models/user.model';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {

  }

}
