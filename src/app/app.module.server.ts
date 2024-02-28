import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { SplitParagraphPipe } from './pipes/split-paragraph.pipe';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    
  ],
  bootstrap: [AppComponent],
  declarations:[SplitParagraphPipe],
  providers:[SplitParagraphPipe]
})
export class AppServerModule {}
