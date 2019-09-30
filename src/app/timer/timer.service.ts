import {ChangeDetectorRef, Injectable, NgZone, Optional} from '@angular/core';

@Injectable()
export class TimerService {

  private _counter = 0;
  private _setPoint = 0;
  private intervalId = undefined;

  constructor(private zone: NgZone, @Optional() private changeDetectorRef: ChangeDetectorRef) {
  }

  init(period: number) {
    this._counter = period;
    this._setPoint = period;
  }

  initTime(minute: number, second: number) {
    const period = minute * 6000 + second * 100;
    this.init(period);
  }

  resetTime() {
    this.init(this._setPoint);
  }

  get counter(): number {
    return this._counter;
  }

  set counter(periodInMilliSec: number) {
    this._counter = periodInMilliSec;
  }

  start() {
    if (this.intervalId !== undefined) { return; }
    this.zone.runOutsideAngular((() => this.intervalId = setInterval(() => {
      this.increment();
      if (this.changeDetectorRef) {
        this.changeDetectorRef.detectChanges();
        }
    }, 10)));
    // this.intervalId = setInterval(x => {this.increment(); });
  }

  startDecrement() {
    if (this.intervalId !== undefined) { return; }
    if (this.counter === 0) {
      return;
    }
    this.zone.runOutsideAngular((() => this.intervalId = setInterval(() => {
      this.decrement();
      if (this.changeDetectorRef) {
        this.changeDetectorRef.detectChanges();
      }
    }, 10)));
  }

  stop() {
    clearInterval(this.intervalId);
    this.intervalId = undefined;
  }

  increment() {
    this.counter++;
  }

  decrement() {
    this.counter--;
    if (this.counter === 0) {
      this.stop();
    }
  }
}
