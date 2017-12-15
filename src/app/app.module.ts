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
const appRoutes: Routes = [
    { path: '', redirectTo: '#/search', pathMatch: 'full'},
    {
        path: '#/search',
        component: SchoolSearchComponent,
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
