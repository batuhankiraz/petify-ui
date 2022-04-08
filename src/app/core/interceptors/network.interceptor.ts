import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {finalize, Observable} from "rxjs";
import {LoadingService} from "../services/loading/loading.service";
import {Injectable} from "@angular/core";

@Injectable()
export class NetworkInterceptor implements HttpInterceptor {
  constructor(private loader: LoadingService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loader.show();

    return next.handle(request)
      .pipe(
        finalize(() => {
          this.loader.hide();
        })
      );
  }
}
