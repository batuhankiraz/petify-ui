import {ChangeDetectionStrategy, Component} from '@angular/core';
import {LoadingService} from "./core/services/loading/loading.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'petify';
  loading$ = this.loader.loading$;

  constructor(public loader: LoadingService) {
  }
}
