import { Component, ViewChild, OnInit } from '@angular/core';
import { ParentOrganismComponent } from "../parent-organism/parent-organism.component";
import { ITrait } from '../../shared/types';
import { GeneticDataService } from '../../genetic-data.service';

@Component({
    selector: 'recombinator',
    template: require('./recombinator.component.html'),
    styles: [require('./recombinator.component.css')],
    providers: [GeneticDataService]
})
export class RecombinatorComponent implements OnInit {
    @ViewChild('parent1') private parent1: ParentOrganismComponent;
    @ViewChild('parent2') private parent2: ParentOrganismComponent;
    organisms: string[];
    organism: string;
    characteristic: string;
    characteristics: string[];
    inheritanceTypes: string[];
    inheritanceTypesList : string[];
    inheritanceType: string = '';
    crossTypes: string[] = ['monohibridno', 'dihibridno'];
    numberOfCharact: number = 1;
    data: {};
    traits1: ITrait[];
    traits2: ITrait[];

    constructor(private geneticDataService: GeneticDataService) {}

    ngOnInit(): void {
        this.data = this.geneticDataService.getData();
        this.organisms = this.geneticDataService.getOrganisms();
        this.inheritanceTypes = this.geneticDataService.getInheritanceTypes();
        this.inheritanceTypesList = this.geneticDataService.getInheritanceTypes();

        this.organism = this.organisms[0] || '';
        this.characteristics = this.getCharacteristics();
    }

    ngAfterViewInit() : void {
        // After the view is initialized
        let organismData = this.data[this.organism];
        this.characteristic = this.characteristics[0] || '';
        this.inheritanceType = organismData[0].inheritanceType || '';
        this.changeTraits();
    }

    onInputRadioChange(entry) {
        this.numberOfCharact = this.crossTypes.indexOf(entry) + 1;
        this.characteristics = this.getCharacteristics();
        this.characteristic = this.characteristics[0];
        this.inheritanceTypes = this.changeInheritanceTypes();
        this.inheritanceType = this.changeInheritanceType();
        this.changeTraits();
    }

    onSelectOrganismChange(event) {
        this.characteristics = this.getCharacteristics();
        this.characteristic = this.characteristics[0];
        this.inheritanceType = this.changeInheritanceType();
        this.changeTraits();
    }

    onSelectCharacteristicChange(event) {
        this.inheritanceType = this.changeInheritanceType(true);
        this.changeTraits(true);
    }

    // TODO: change this
    onSelectInheritanceTypeChange(event) {
        let organismData = this.data[this.organism];
        let found = false;
        for (let i = 0; i < organismData.length; i++) {
            if (organismData[i].inheritanceType === this.inheritanceType) {
                this.characteristic = organismData[i].characteristic;
                this.traits1 = organismData[i].traits;
                found = true;
            }
        }
        if (!found) {
            this.characteristic = '';
            this.traits1 = [];
        }
    }

    private changeInheritanceTypes() {
        if (this.numberOfCharact === 1) {
            return this.inheritanceTypesList;
        }
        else if (this.numberOfCharact === 2) {
            let inheritanceTypes = [];
            let inh = this.inheritanceTypesList;
            for (let i = 0; i < inh.length; i++) {
                for (let j = 0; j < inh.length; j++) {
                    inheritanceTypes.push(`${inh[i]} + ${inh[j]}`);
                }
            }
            return inheritanceTypes;
        }
    }

    private changeTraits(isCharacteristicSet: boolean = false) {
        if (isCharacteristicSet) {
            if (this.numberOfCharact === 1) {
                this.traits1 = this.getTraitsByCharacteristic(this.characteristic);
                this.traits2 = [];
            }
            else if (this.numberOfCharact === 2) {
                this.traits1 = this.getTraitsByCharacteristic(this.characteristic.split(' + ')[0]);
                this.traits2 = this.getTraitsByCharacteristic(this.characteristic.split(' + ')[1]);
            }
        }else {
            let organismData = this.data[this.organism];
            if (this.numberOfCharact === 1) {
                this.traits1 = organismData[0].traits || [];
                this.traits2 = [];
            }
            else if (this.numberOfCharact === 2) {
                this.traits1 = this.getTraitsByCharacteristic(this.characteristics[0].split(' + ')[0]);
                this.traits2 = this.getTraitsByCharacteristic(this.characteristics[0].split(' + ')[1]);
            }
        }
    }

    private changeInheritanceType(isCharacteristicSet : boolean = false) {
        if (this.numberOfCharact === 1) {
            if (isCharacteristicSet) {
                return this.getInheritanceTypeByCharacteristic(this.characteristic);
            }
            else {
                return this.data[this.organism][0].inheritanceType || '';
            }
        }
        else if (this.numberOfCharact === 2) {
            let char1, char2;
            if (isCharacteristicSet) {
                char1 = this.characteristic.split(' + ')[0];
                char2 = this.characteristic.split(' + ')[1];
            }
            else {
                char1 = this.characteristics[0].split(' + ')[0];
                char2 = this.characteristics[0].split(' + ')[1];
            }
            let inh1 = this.getInheritanceTypeByCharacteristic(char1);
            let inh2 = this.getInheritanceTypeByCharacteristic(char2);
            let inheritanceType = `${inh1} + ${inh2}`;

            console.log(inheritanceType);

            return inheritanceType;
        }
    }

    private getInheritanceTypeByCharacteristic(characteristic: string) {
        let organismData = this.data[this.organism];
        for (let i = 0; i < organismData.length; i++) {
            if (organismData[i].characteristic === characteristic) {
                return organismData[i].inheritanceType;
            }
        }
        return '';
    }

    private getTraitsByCharacteristic(characteristic: string) {
        let organismData = this.data[this.organism];
        for (let i = 0; i < organismData.length; i++) {
            if (organismData[i].characteristic === characteristic) {
                return organismData[i].traits;
            }
        }
        return [];
    }

    private getCharacteristics() {
        if (this.numberOfCharact === 1) {
            return this.getMonohybridCharacteristics();
        }
        else if (this.numberOfCharact === 2) {
            return this.getDihybridCharacteristics();
        }
    }

    private getMonohybridCharacteristics() {
        let organismData = this.data[this.organism];
        let characteristics = [];
        for (let i = 0; i < organismData.length; i++) {
            characteristics.push(organismData[i].characteristic);
        }
        return characteristics;
    }

    private getDihybridCharacteristics() {
        let organismData = this.data[this.organism];
        let characteristics = [];
        for (let i = 0; i < organismData.length; i++) {
            for (let j = i + 1; j < organismData.length; j++) {
                let char1 = organismData[i].characteristic;
                let char2 = organismData[j].characteristic;
                characteristics.push(`${char1} + ${char2}`);
            }
        }
        return characteristics;
    }
}



