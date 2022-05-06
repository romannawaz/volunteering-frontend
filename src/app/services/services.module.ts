import { NgModule } from '@angular/core';
import { WindowService } from './window/window.service';

@NgModule({
  declarations: [],
  providers: [
    { provide: 'WindowServiceInterface', useClass: WindowService }
  ],
})
export class ServicesModule { }
