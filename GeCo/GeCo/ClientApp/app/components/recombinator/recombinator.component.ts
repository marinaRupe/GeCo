import { Component, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { ParentOrganismComponent } from "../parent-organism/parent-organism.component";
import { ITrait } from '../../shared/types';
import { GeneticDataService } from '../../genetic-data.service';

@Component({
    selector: 'recombinator',
    template: require('./recombinator.component.html'),
    styles: [require('./recombinator.component.css')],
    providers: [GeneticDataService]
})
export class RecombinatorComponent {
    @ViewChild('parent1') private parent1: ParentOrganismComponent;
    @ViewChild('parent2') private parent2: ParentOrganismComponent;
    organisms: string[];
    organism: string;
    characteristic: string;
    inheritanceTypes: string[];
    inheritanceType: string = '';
    crossType: string[] = ['monohibridno', 'dihibridno'];
    numberOfCharact: number = 1;
    data: {};
    traits: ITrait[];

    constructor(private geneticDataService: GeneticDataService) {
        this.data = this.geneticDataService.getData();
        this.organisms = this.geneticDataService.getOrganisms();
        this.inheritanceTypes = this.geneticDataService.getInheritanceTypes(); 
    }

    ngAfterViewInit() {
        // After the view is initialized
        this.organism = this.organisms[0] || '';
        let organismData = this.data[this.organism];
        this.characteristic = organismData[0].characteristic;
        this.inheritanceType = organismData[0].inheritanceType;
        this.traits = organismData[0].traits;
    }

    onInputRadioChange(entry) {
        this.numberOfCharact = Object.assign({}, this.numberOfCharact, entry);
    }

    onSelectOrganismChange(event) {
        let organismData = this.data[this.organism];
        this.characteristic = organismData[0].characteristic;
        this.inheritanceType = organismData[0].inheritanceType;
        this.traits = organismData[0].traits;
    }

    onSelectCharacteristicChange(event) {
        let organismData = this.data[this.organism];
        for (let i = 0; i < organismData.length; i++) {
            if (organismData[i].characteristic === this.characteristic) {
                this.inheritanceType = organismData[i].inheritanceType;
                this.traits = organismData[i].traits;
            }
        }
    }

    onSelectInheritanceTypeChange(event) {
        let organismData = this.data[this.organism];
        let found = false;
        for (let i = 0; i < organismData.length; i++) {
            if (organismData[i].inheritanceType === this.inheritanceType) {
                this.characteristic = organismData[i].characteristic;
                found = true;
            }
        }
        if (!found) this.characteristic = '';
    }
}



