import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {TimerService} from '../timer/timer.service';

@Component({
  selector: 'app-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.css'],
  providers: [TimerService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountdownTimerComponent implements OnInit {

  @Input()
  minute: number;
  @Input()
  second: number;


  math = Math;

  constructor(public timer: TimerService) {
  }

  ngOnInit() {
    this.timer.initTime(this.minute, this.second);
  }

  sec = () => this.math.floor(this.timer.counter / 100) % 60;
  min = () => this.math.floor(this.timer.counter / 6000);

  start() {
    this.timer.startDecrement();
  }

  stop() {
    this.timer.stop();
  }

  reset() {
    this.timer.resetTime();
  }
}
