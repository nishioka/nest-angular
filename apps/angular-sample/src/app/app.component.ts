import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AnnouncementDto } from '@sample/shared-dto';

@Component({
  selector: 'sample-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  hello$ = this.http.get<AnnouncementDto>('/api/hello');
  constructor(private http: HttpClient) {}
}
