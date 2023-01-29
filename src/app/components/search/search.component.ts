import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  template: `<input placeholder="Filter products" type="search" class="mb-2 border  py-2 px-4 w-full" [(ngModel)]="name" (input)="nameChanging()">`
})
export class SearchComponent {
  private _name: string;

  @Input()
  get name() {
    return this._name
  }

  set name(value: string) {
    this._name = value;
  }

  @Output() nameChange = new EventEmitter();

  nameChanging() {
    this.nameChange.emit(this.name);
  }
}
