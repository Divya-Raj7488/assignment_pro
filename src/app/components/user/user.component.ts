import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { userData } from '../../../Task';
import { user } from '../../../typeDef';
import { SearchService } from '../../services/search.service';

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
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  userdata: user[] | [] = [];
  searchTerm: string = '';

  constructor(private searchService: SearchService) {}
  ngOnInit() {
    if (typeof window !== undefined && window.localStorage) {
      const storedUsers = localStorage.getItem('users');
      if (storedUsers) {
        this.userdata = JSON.parse(storedUsers);
      }
    } else {
      this.userdata = userData;
    }
    this.searchService.currentSearchTerm.subscribe(term => {
      this.searchTerm = term;
    });
  }
  getTotalWorkoutMinutes(member: user): number {
    return member.workouts.reduce((sum, workout) => sum + workout.minutes, 0);
  }
  get filteredUsers() {
    const cleanedSearchTerm = this.searchTerm.replace(/\s/g, '').toLowerCase();
    console.log('serach');
    return this.userdata.filter(user =>
      user.name
        .replace(/\s/g, '')
        .toLowerCase()
        .includes(cleanedSearchTerm)
    );
  }
}
