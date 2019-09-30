import {ChangeDetectorRef, Injectable, NgZone, Optional} from '@angular/core';

@Injectable()
export class TimerService {

  private _period = 0;
  private intervalId = undefined;

  constructor(private zone: NgZone, @Optional() private changeDetectorRef: ChangeDetectorRef) {
  }

  init(period: number) {
    this.period = period;
  }

  initTime(minute: number, second: number) {
    const period = minute * 6000 + second * 100;
    this.init(period);
  }

  get period(): number {
    return this._period;
  }

  set period(periodInMilliSec: number) {
    this._period = periodInMilliSec;
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
    if (this.period === 0) {
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
    this.period++;
  }

  decrement() {
    this.period--;
    if (this.period === 0) {
      this.stop();
    }
  }
}
