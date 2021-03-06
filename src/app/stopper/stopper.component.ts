import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {TimerService} from '../timer/timer.service';

@Component({
  selector: 'app-stopper',
  templateUrl: './stopper.component.html',
  styleUrls: ['./stopper.component.css'],
  providers: [TimerService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StopperComponent implements OnInit {

  math = Math;

  constructor(public timer: TimerService) {
  }

  ngOnInit() {
  }

  millisec = () => this.timer.counter % 100;
  sec = () => this.math.floor(this.timer.counter / 100) % 60;
  minute = () => this.math.floor(this.timer.counter / 6000);

  start() {
    this.timer.start();
  }

  stop() {
    this.timer.stop();
  }

  reset() {
    this.timer.resetTime();
  }

}
