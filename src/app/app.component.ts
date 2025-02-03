import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FormsComponent } from './components/forms/forms.component';
import { CommonModule } from '@angular/common';
import { UserComponent } from './components/user/user.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FormsComponent,
    CommonModule,
    UserComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
  isFormVisible = false;
  myName = signal('Diva');
  setMyName() {
    this.myName.set('Divya');
  }
  toggleFormVisibility(status: boolean) {
    this.isFormVisible = status;
  }
}
