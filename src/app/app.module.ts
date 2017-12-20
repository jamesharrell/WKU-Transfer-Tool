import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SchoolSearchComponent } from './school-search/school-search.component';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ClassViewPageComponent } from './class-view-page/class-view-page.component';

import { SchoolSearchService} from './services/school-search.service';
import { HttpModule } from '@angular/http';
import { ListCoursesComponent } from './list-courses/list-courses.component';
import { ListCoursesService } from './services/list-courses.service';
import { Component } from '@angular/core/src/metadata/directives';
const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    {
        path: 'home',
        component: SchoolSearchComponent,
        data: { title: 'Home Page' }
    },
    {
        path: 'college/:id',
        component: SchoolSearchComponent,
        data: { title: 'College Search' }
    },
    { path: '#/**', component: PageNotFoundComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    SchoolSearchComponent,
    PageNotFoundComponent,
    ClassViewPageComponent,
    ListCoursesComponent
  ],
  imports: [
    BrowserModule,
      HttpModule,
      RouterModule.forRoot(appRoutes, {useHash: true})
  ],
  providers: [SchoolSearchService, ListCoursesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
