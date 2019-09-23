import {Injectable, NgZone} from '@angular/core';

@Injectable()
export class TimerService {

  private _period=0;
  private intervalId;

  constructor(private zone: NgZone) {
  }

  get period(): number {
    return this._period;
  }

  set period(periodInMilliSec: number) {
    this._period = periodInMilliSec;
  }

  start() {
    this.zone.run((() => this.intervalId = setInterval(() => {
      this.increment();
    }, 10)));
    // this.intervalId = setInterval(x => {this.increment(); });
  }

  stop() {
    clearInterval(this.intervalId);
  }

  increment() {
    this.period++;
  }

  decrement() {
  }
}
