import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TableColumn {
  header: string;
  field: string;
}

export interface TableAction {
  label: string;
  type: string; // view | edit | delete
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-table.component.html',
})
export class DataTableComponent {

  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Input() actions: TableAction[] = [];

  @Output() actionClicked = new EventEmitter<{
    action: string;
    row: any;
  }>();

  onAction(action: string, row: any) {
    this.actionClicked.emit({ action, row });
  }

}