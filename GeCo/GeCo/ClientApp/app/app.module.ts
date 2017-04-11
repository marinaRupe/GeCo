import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UniversalModule } from 'angular2-universal';
import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { RecombinatorComponent } from "./components/recombinator/recombinator.component";
import { LecturesComponent } from './components/lectures/lectures.component';
import { ExamComponent } from './components/exam/exam.component';
import { HelpComponent } from './components/help/help.component';
import { ParentOrganismComponent } from "./components/parent-organism/parent-organism.component";
import { OffspringComponent } from "./components/offspring/offspring.component";
import { ChildOrganismComponent } from "./components/child-organism/child-organism.component"

@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        RecombinatorComponent,
        LecturesComponent,
        ExamComponent,
        HelpComponent,
        ParentOrganismComponent,
        OffspringComponent,
        ChildOrganismComponent
    ],
    imports: [
        UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'recombinator', component: RecombinatorComponent },
            { path: 'lectures', component: LecturesComponent },
            { path: 'exam', component: ExamComponent },
            { path: 'help', component: HelpComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ]
})
export class AppModule {
}
