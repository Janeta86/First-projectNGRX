import { Component,
  Input,
  Output,
  EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {
  @Input() users!: any;
  @Output() delete: EventEmitter<any> = new EventEmitter<any>();
  @Output() edit: EventEmitter<any> = new EventEmitter<any>();

  onDelete() {
    this.delete.emit(this.users);
  }

}
