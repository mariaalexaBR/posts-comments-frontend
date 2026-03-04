import { Component, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-comment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './comment-form.component.html'
})
export class CommentFormComponent {

  private fb = inject(FormBuilder);

  @Output() submitComment = new EventEmitter<any>();

  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    body: ['', [Validators.required, Validators.minLength(5)]],
  });

  submit() {
    if (this.form.invalid) return;

    this.submitComment.emit(this.form.value);
    this.form.reset();
  }
}