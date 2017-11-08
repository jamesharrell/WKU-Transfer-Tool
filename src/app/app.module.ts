import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SchoolSearchComponent } from './school-search/school-search.component';
import { Routes, RouterModule } from '@angular/router';
import { SelectionPageComponent } from './selection-page/selection-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ClassViewPageComponent } from './class-view-page/class-view-page.component';

import { SchoolSearchService} from './school-search/school-search.service';
import { HttpModule } from '@angular/http';
const appRoutes: Routes = [
    { path: '', redirectTo: '#/search', pathMatch: 'full'},
    {
        path: '#/search',
        component: SelectionPageComponent,
        data: { title: 'Home Page' }
    },
    {
        path: '#/classes',
        component: ClassViewPageComponent,
        data: { title: 'Classes View' }
    },
    { path: '#/**', component: PageNotFoundComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    SchoolSearchComponent,
    SelectionPageComponent,
    PageNotFoundComponent,
    ClassViewPageComponent
  ],
  imports: [
    BrowserModule,
      HttpModule,
      RouterModule.forRoot(appRoutes, {useHash: true})
  ],
  providers: [SchoolSearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
