import { Component } from '@angular/core';
import { lorem } from 'faker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public value: string;
  public elapsed: string;
  public sentence: any[];
  public showInfo: boolean;
  public allMatch: boolean;
  private interval: number;

  constructor() {
    this.onResetClick();
  }

  public onTextInput(inputEvent: any) {
    this.value = inputEvent.target.value;
    this.compareText();
    this.startTimer();
  }

  public onRetryClick() {
    this.value = '';
    this.showInfo = true;
    this.allMatch = false;
    this.clearTimer();
    this.sentence.forEach(v => v.match = null);
  }

  public onResetClick() {
    this.value = '';
    this.showInfo = true;
    this.allMatch = false;
    this.setSentence();
    this.clearTimer();
  }

  private setSentence() {
    let newSentence = lorem.sentence();
    this.sentence = Array.from(newSentence.replace('.', '')).map(v => ({ value: v, match: null }));
  }

  private compareText() {
    this.sentence.forEach(v => v.match = null);
    if (!this.allMatch && this.value.length > 0) {
      Array.from(this.value).forEach((v, i) => {
        if (this.sentence.length > i) {
          this.sentence[i].match = this.sentence[i].value === v;
        }
      });
      this.allMatch = this.sentence.every(v => v.match);
    }
  }

  private startTimer() {
    if (this.interval === -1) {
      let seconds = 0;
      let milliseconds = 0;
      this.interval = window.setInterval(() => {
        if (this.allMatch) {
          this.clearTimer(false);
        } else {
          if (milliseconds === 900) {
            seconds += 1;
            milliseconds = 0;
          } else {
            milliseconds += 100;
          }
          this.elapsed = `${seconds}` + '.' + `${milliseconds}`.padEnd(3, '0');
        }
      }, 100);
      this.showInfo = false;
    }
  }

  private clearTimer(resetTimer: boolean = true) {
    window.clearInterval(this.interval);
    this.interval = -1;
    if (resetTimer) {
      this.elapsed = '0.000';
    }
  }
}
