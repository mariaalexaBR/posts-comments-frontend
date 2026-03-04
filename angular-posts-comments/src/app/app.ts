import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginModalComponent } from './shared/components/login-modal.component/login-modal.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginModalComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-posts-comments');
}
