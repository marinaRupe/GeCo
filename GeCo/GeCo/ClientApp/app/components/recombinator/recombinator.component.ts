import { Component, ViewChild } from '@angular/core';
import { ParentOrganismComponent } from "../parent-organism/parent-organism.component";

@Component(({
    selector: 'recombinator',
    template: require('./recombinator.component.html'),
    styles: [require('./recombinator.component.css')]
}))
export class RecombinatorComponent {
    @ViewChild('parent1') private parent1: ParentOrganismComponent;
    @ViewChild('parent2') private parent2: ParentOrganismComponent;
    organisms: string[] = ['čovjek', 'mahuna', 'vinska mušica'];
    organism: string = '';
    characteristics: string[] = ['boja cvjeta', 'boja sjemenke'];
    characteristic: string = '';
    inheritanceTypes: string[] = [
        'dominantno/recesivno',
        'nepotpuno dominantno/recesivno',
        'kodominantno'
    ];
    inheritanceType: string = '';
    crossType: string[] = ['monohibridno', 'dihibridno'];
    numberOfCharact: number = 1;

    ngAfterViewInit() {
        // After the view is initialized, this.userProfile will be available
    }

    onSelectionChange(entry) {
        this.numberOfCharact = Object.assign({}, this.numberOfCharact, entry);
    }
}