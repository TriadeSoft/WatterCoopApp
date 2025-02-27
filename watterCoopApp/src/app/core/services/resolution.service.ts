import { Injectable, inject, DestroyRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable()
export class ResolutionService {
  private currentResolution: string = 'desktop';
  private currentOrientation: string = 'landscape';

  private resolutionSubject = new BehaviorSubject<{ resolution: string; orientation: string }>({
    resolution: this.currentResolution,
    orientation: this.currentOrientation,
  });

  public readonly resolution$ = this.resolutionSubject.asObservable();
  private destroyRef = inject(DestroyRef);

  constructor() {
    this.initializeListener();
  }

  public detectResolution(): string {
    const width = window.innerWidth;
    return width <= 767 ? 'mobile' : width <= 991 ? 'tablet' : 'desktop';
}


  private detectOrientation(): string {
    return window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
  }

  public checkResponsive(view: string): boolean {
    return this.detectResolution() === view;
  }

  private emitChanges(): void {
    const newResolution = this.detectResolution();
    const newOrientation = this.detectOrientation();

    if (newResolution !== this.currentResolution || newOrientation !== this.currentOrientation) {
      this.currentResolution = newResolution;
      this.currentOrientation = newOrientation;
      this.resolutionSubject.next({
        resolution: this.currentResolution,
        orientation: this.currentOrientation,
      });
    }
  }

  private initializeListener(): void {
    window.addEventListener('resize', this.emitChanges.bind(this));
    this.emitChanges();

    this.destroyRef.onDestroy(() => {
      window.removeEventListener('resize', this.emitChanges.bind(this));
    });
  }
}
