import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  @Input() message: string;
  @Input() title: string = 'Error !!';
  @ViewChild('alert') alertElement: ElementRef;
  constructor() {}

  ngOnInit(): void {}
  onCloseAlert() {
    this.alertElement.nativeElement.classList.add('hide');
  }
}
