import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { workouts } from '../../../Task';

interface Workout {
  type: string;
  minutes: number;
}

interface User {
  id: number;
  name: string;
  workouts: Workout[];
}

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css'
})
export class FormsComponent {
  @Output() formVisibilityChanged = new EventEmitter<boolean>();
  username: string = '';
  workoutType: string = '';
  workoutMins: number = 0;
  users: User[] = [];
  selectedWorkouts: Workout[] = [];
  workouts: Workout[] = workouts;
  ngOnInit() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedUsers = localStorage.getItem('users');
      if (storedUsers) {
        this.users = JSON.parse(storedUsers);
      }
    }
  }
  onFormSubmit() {
    if (!this.username || !this.workoutType || this.workoutMins <= 0) {
      alert('Please fill in all fields');
      return;
    }
    let storedUsers: any[] = JSON.parse(localStorage.getItem('users') || '[]');
    // if user exist
    if (storedUsers.length > 0) {
      const idx = storedUsers.findIndex(({ username }) => {
        return username === this.username;
      });
      if (idx != -1) {
        const existingUser = storedUsers[idx];
        const workoutIdx = existingUser.workouts.findIndex(
          (workout: Workout) => {
            workout.type === this.workoutType;
          }
        );
        if (workoutIdx !== -1) {
          storedUsers[idx][workoutIdx].minutes = this.workoutMins;
          alert('workout Minutes updated');
        } else {
          storedUsers[idx].push({
            type: this.workoutType,
            minutes: this.workoutMins
          });
        }
        localStorage.setItem('users', JSON.stringify(storedUsers));
      }
    }

    const user = {
      name: this.username,
      workouts: [
        {
          type: this.workoutType,
          minutes: this.workoutMins
        }
      ]
    };
    storedUsers.push(user);
    localStorage.setItem('users', JSON.stringify(storedUsers));
    this.username = '';
    this.workoutType = '';
    this.workoutMins = 0;
    console.log('User added:', user);
    this.formVisibilityChanged.emit(false);
  }
  onCancel() {
    this.formVisibilityChanged.emit(false); // ✅ Emit false to hide the form
  }
}
