import { Component, EventEmitter, Output } from '@angular/core';
import Tasks from '../../../Task';
import taskDef from '../../../typeDef';
import { CommonModule } from '@angular/common';
import { SearchService } from '../../services/search.service';
import { FormsModule } from '@angular/forms';
import { workouts } from '../../../Task';
import { workout } from '../../../typeDef';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  filterbByWorkoutTerm: string = '';
  workouts: workout[] = workouts;
  searchTerm: string = '';
  @Output() formVisibilityChanged = new EventEmitter<boolean>();
  tasks: taskDef[] = Tasks;
  constructor(private searchService: SearchService) {}
  ngOnInit(): void {}
  showForm() {
    this.formVisibilityChanged.emit(true);
  }
  onSearchChange() {
    this.searchService.updateSearchTerm(this.searchTerm);
  }
}
