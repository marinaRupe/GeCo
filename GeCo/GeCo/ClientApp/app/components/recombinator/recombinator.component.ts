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
    organisms: string[] = ['čovjek', 'mahuna'];
    organism: string = this.organisms[0] || '';
    characteristics: string[] = [];
    characteristic: string = this.characteristics[0] || '';
    inheritanceTypes: string[] = [
        'dominantno/recesivno',
        'nepotpuno dominantno/recesivno',
        'kodominantno'
    ];
    inheritanceType: string = '';
    crossType: string[] = ['monohibridno', 'dihibridno'];
    numberOfCharact: number = 1;
    //hard coded
    DATA = {
        čovjek: {
            characteristics: ['oblik kose', 'ušne resice', 'jamice na obrazima', 'krvna grupa']
        },
        mahuna: {
            characteristics: ['boja cvjeta', 'oblik sjemenke', 'boja sjemenke']
        }
    };

    ngAfterViewInit() {
        // After the view is initialized, this.userProfile will be available
    }

    onInputRadioChange(entry) {
        this.numberOfCharact = Object.assign({}, this.numberOfCharact, entry);
    }

    onSelectChange(event) {
        let selectElem = event.target.id;
        if (selectElem === 'selectOrganism') {
        }
        else if (selectElem === 'selectCharacteristic') {
        }
        else if (selectElem === 'selectInheritanceType') { 
        }
    }
}