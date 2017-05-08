import { Component, ViewChild, OnInit } from '@angular/core';
import { ParentOrganismComponent } from "../parent-organism/parent-organism.component";
import { PossibleParentsComponent } from "../possible-parents/possible-parents.component";
import { ChildOrganismComponent } from "../child-organism/child-organism.component";
import { OffspringComponent } from "../offspring/offspring.component";
import { ITrait, ILinkedGenes } from '../../shared/types';
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
    @ViewChild('child') private child: ChildOrganismComponent;
    startingFromParents: boolean;
    organisms: string[];
    organism: string;
    characteristic: string;
    characteristics: string[];
    inheritanceTypes: string[];
    inheritanceTypesList : string[]; // list of all possible inheritance types
    inheritanceType: string = '';
    crossTypes: string[] = ['monohibridno', 'dihibridno'];
    numberOfCharact: number = 1;
    data: {};
    traits1: ITrait[];
    traits2: ITrait[];

    constructor(private geneticDataService: GeneticDataService) {}

    ngOnInit(): void {
        this.startingFromParents = true;
        this.data = this.geneticDataService.getData();
        this.organisms = this.geneticDataService.getOrganisms();
        this.inheritanceTypesList = this.geneticDataService.getInheritanceTypes();
        this.inheritanceTypes = this.changeInheritanceTypes(this.inheritanceTypesList); 

        this.organism = this.organisms[0] || '';
        this.characteristics = this.getCharacteristics();
    }

    ngAfterViewInit() : void {
        let organismData = this.data[this.organism];
        this.characteristic = this.characteristics[0] || '';
        this.inheritanceType = organismData[0].inheritanceType || '';
        this.changeTraits();
    }

    onNumberOfCharacteristicsChange(entry) {
        this.numberOfCharact = this.crossTypes.indexOf(entry) + 1;
        this.characteristics = this.getCharacteristics();
        this.characteristic = this.characteristics[0];
        this.inheritanceTypes = this.changeInheritanceTypes(this.inheritanceTypesList);
        this.inheritanceType = this.changeInheritanceType();
        this.changeTraits();
    }

    onStartingOrganismChange(startingFromParents: boolean) : void {
        this.startingFromParents = startingFromParents;
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
        const organismData = this.data[this.organism];
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


    private changeInheritanceTypes(inheritanceTypesList) {
        let inheritanceTypes = [];
        if (this.numberOfCharact === 1) {
            for (let i = 0; i < inheritanceTypesList.length; i++) {
                if (inheritanceTypesList[i] !== "vezani geni") {
                    inheritanceTypes.push(inheritanceTypesList[i]);
                }
            } 
        }
        else if (this.numberOfCharact === 2) {
            let inh = inheritanceTypesList;
            let hasLinkedGenes = false;
            for (let i = 0; i < inh.length; i++) {
                for (let j = 0; j < inh.length; j++) {
                    if (inh[i] !== "vezani geni" && inh[j] !== "vezani geni") {
                        inheritanceTypes.push(`${inh[i]} + ${inh[j]}`);
                    } else {
                        hasLinkedGenes = true;
                    }
                }
            }
            //TODO
            if (hasLinkedGenes) {
                inheritanceTypes.push("vezani geni");
            }
        }
        return inheritanceTypes;
    }

    private changeTraits(isCharacteristicSet: boolean = false) : void {
        if (isCharacteristicSet) {
            if (this.numberOfCharact === 1) {
                this.traits1 = this.getTraitsByCharacteristic(this.characteristic);
                this.traits2 = [];
            }
            else if (this.numberOfCharact === 2) {
                this.traits1 = this.getTraitsByCharacteristic(this.characteristic.split(' + ')[0]);
                this.traits2 = this.getTraitsByCharacteristic(this.characteristic.split(' + ')[1]);
            }
        } else {
            const organismData = this.data[this.organism];
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
            const inh1 = this.getInheritanceTypeByCharacteristic(char1);
            const inh2 = this.getInheritanceTypeByCharacteristic(char2);
            let inheritanceType;
            if (inh1 === "vezani geni" || inh2 === "vezani geni") {
                inheritanceType = "vezani geni";
            } else {
                inheritanceType = `${inh1} + ${inh2}`;
            }
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

    /**
     * Get list of avaliable characteristics for monohybrid cross and selected organism.
     */
    private getMonohybridCharacteristics() {
        const organismData = this.data[this.organism];
        let characteristics = [];
        for (let i = 0; i < organismData.length; i++) {
            if (organismData[i].inheritanceType !== "vezani geni") {
                characteristics.push(organismData[i].characteristic);
            }
        }
        return characteristics;
    }

    /**
     * Get list of avaliable characteristics for dihybrid cross and selected organism.
     */
    private getDihybridCharacteristics() {
        const organismData = this.data[this.organism];
        let characteristics = [];
        for (let i = 0; i < organismData.length; i++) {
            for (let j = i + 1; j < organismData.length; j++) {
                const char1 = organismData[i].characteristic;
                const char2 = organismData[j].characteristic;
                const inh1 = organismData[i].inheritanceType;
                const inh2 = organismData[j].inheritanceType;
                if (inh1 !== "vezani geni" && inh2 !== "vezani geni") {
                    characteristics.push(`${char1} + ${char2}`);
                }
            }
        }
        //TODO: vezani geni
        let linkedGenes: ILinkedGenes[] = this.geneticDataService.getLinkedGenes(this.organism);
        for (let i = 0; i < linkedGenes.length; i++) {
            characteristics.push(`${linkedGenes[i].gene1Name} + ${linkedGenes[i].gene2Name}`);
        }

        return characteristics;
    }
}



