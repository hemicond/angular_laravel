import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { TitleComponent } from '@shared/title/title.component';

@Component({
  standalone: true,
  imports: [CommonModule, TitleComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,

  template: ` <app-title [title]="currentFramework()" />

    <pre>{{ frameworkassignal() | json }}</pre>
    <pre>{{ frameworkasproperty | json }}</pre>`,
  styles: ``,
})
export default class ChangeDetectionComponent {
  public currentFramework = computed(
    () => `Change Detection - ${this.frameworkassignal().name}`
  );
  public frameworkassignal = signal({
    name: 'Angular',
    releaseDate: 2016,
  });

  public frameworkasproperty = {
    name: 'Angular',
    releaseDate: 2016,
  };

  constructor() {
    setTimeout(() => {
      /*       this.frameworkasproperty.name = 'Vuejs';
       */
      this.frameworkassignal.update((value) => ({
        ...value,
        name: 'React',
      }));
      console.log('toque');
    }, 3000);
  }
}
