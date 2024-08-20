import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
  standalone: true,
  imports: []
})
export class AlertComponent {

  @Input() warnTitle: string = '';

  @Input() warnMessage: string = '';

  @Output() closeEvent : EventEmitter<void> = new EventEmitter<void>();

  close(){
    this.closeEvent.emit();
  }
}
