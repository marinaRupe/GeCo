import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UniversalModule } from 'angular2-universal';
import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { RecombinatorComponent } from './components/recombinator/recombinator.component';
import { LecturesComponent } from './components/lectures/lectures.component';
import { ExamComponent } from './components/exam/exam.component';
import { HelpComponent } from './components/help/help.component';
import { ParentOrganismComponent } from './components/parent-organism/parent-organism.component';
import { OffspringComponent } from './components/offspring/offspring.component';
import { ChildOrganismComponent } from './components/child-organism/child-organism.component';
import { GeneticDataService } from './genetic-data.service'
import { InheritanceService } from './inheritance.service'

@NgModule({
    bootstrap: [AppComponent],
    providers: [GeneticDataService, InheritanceService],
    declarations: [
        AppComponent,
        NavMenuComponent,
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
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'recombinator', component: RecombinatorComponent },
            { path: 'lectures', component: LecturesComponent },
            { path: 'exam', component: ExamComponent },
            { path: 'help', component: HelpComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ]
})
export class AppModule {
}
