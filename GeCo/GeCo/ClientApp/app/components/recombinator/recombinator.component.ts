import { Component, ViewChild, OnInit } from '@angular/core';
import { ParentOrganismComponent } from "../parent-organism/parent-organism.component";
import { PossibleParentsComponent } from "../possible-parents/possible-parents.component";
import { ChildOrganismComponent } from "../child-organism/child-organism.component";
import { OffspringComponent } from "../offspring/offspring.component";
import { ITrait, ILinkedGenes, IInheritance, ICharacteristic } from '../../shared/types';
import { GeneticDataService } from '../../genetic-data.service';
import { LINKED_GENES_INHERITANCE, MONOHYBRID_CROSS_TYPE, DIHYBRID_CROSS_TYPE } from '../../shared/constants';

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
    private isLoading: boolean;
    startingFromParents: boolean;
    organismsList: string[];
    organisms;
    organismSelected: string;
    characteristic : ICharacteristic;
    characteristicSelected: string;
    characteristicsOptions: string[];
    inheritanceType : IInheritance;
    inheritanceTypesOptions: string[];
    inheritanceTypesAll : string[]; // list of all possible inheritance types
    inheritanceTypeSelected: string = '';
    crossTypes: string[] = [MONOHYBRID_CROSS_TYPE, DIHYBRID_CROSS_TYPE];
    numberOfCharact: number;
    organismData;
    traits1: ITrait[];
    traits2: ITrait[];
    linkedGenes;
    cM: number;

    constructor(private geneticDataService: GeneticDataService) {}

    ngOnInit(): void {
        this.isLoading = true;
        this.startingFromParents = true;
        this.numberOfCharact = 1;

        this.organismData = [];
        this.traits1 = [];
        this.traits2 = [];

        this.organismsList = [];
        this.organismSelected = "";

        this.characteristicsOptions = [];
        this.characteristicSelected = '';

        this.inheritanceTypesAll = [];
        this.inheritanceTypesOptions = [];
        this.inheritanceTypeSelected = '';

        this.linkedGenes = [];

        // Load data
        this.geneticDataService.getOrganisms().then((result) => {
            this.organismsList = (<any>result).map(o => o.name);
            this.organisms = <any>result;
            this.organismSelected = this.organismsList[0] || '';

            let id = this.getOrganismId(this.organismSelected);

            this.geneticDataService.getDataForOrganism(id).then((result) => {
                this.organismData = (<any>result).characteristics;
                
                this.geneticDataService.getInheritanceTypes().then((result) => {
                    this.inheritanceTypesAll = <string[]>result;

                    this.geneticDataService.getLinkedGenes(id).then((result) => {
                        this.linkedGenes = result;

                        this.getCharacteristicsOptions();
                        this.characteristicSelected = this.characteristicsOptions[0] || '';
                        this.changeCharacteristic();

                        this.inheritanceTypesOptions = this.changeInheritanceTypes();
                        this.inheritanceTypeSelected = this.changeInheritanceType(true);
                        this.changeTraits(true);
                        this.changeCm();

                        this.isLoading = false;
                    });
                });
            });
        });
    }

    onNumberOfCharacteristicsChange(entry) {
        this.getCharacteristicsOptions();

        this.characteristicSelected = this.characteristicsOptions[0] || '';
        this.changeCharacteristic();

        this.inheritanceTypesOptions = this.changeInheritanceTypes();
        this.inheritanceTypeSelected = this.changeInheritanceType(true);

        this.changeTraits(true);
        this.changeCm();
    }

    onSelectOrganismChange(event) {
        let id = this.getOrganismId(this.organismSelected);
        this.isLoading = true;
        this.geneticDataService.getDataForOrganism(id)
            .then((result) => {
                this.organismData = (<any>result).characteristics;
                
                this.geneticDataService.getLinkedGenes(id).then((result) => {
                    this.linkedGenes = result;

                    this.getCharacteristicsOptions();
                    this.characteristicSelected = this.characteristicsOptions[0] || '';
                    this.changeCharacteristic();

                    this.inheritanceTypesOptions = this.changeInheritanceTypes();
                    this.inheritanceTypeSelected = this.changeInheritanceType(true);
                    this.changeTraits(true);
                    this.changeCm();

                    this.isLoading = false;
                });
                
            }); 
    }

    onSelectCharacteristicChange(event) {
        this.changeCharacteristic();
        this.inheritanceTypeSelected = this.changeInheritanceType(true);
        this.changeTraits(true);
        this.changeCm();
    }

    onSelectInheritanceTypeChange(event) {
        const organismData = this.organismData;
        
        let found = false;
        if (this.numberOfCharact === 1) {
            this.inheritanceType.type1 = this.inheritanceTypeSelected;
            this.inheritanceType.type2 = "";
            for (let i = 0; i < organismData.length; i++) {
                if (organismData[i].inheritanceType === this.inheritanceTypeSelected) {
                    this.characteristicSelected = organismData[i].characteristic;
                    this.changeCharacteristic();
                    this.traits1 = organismData[i].traits;
                    found = true;
                    break;
                }
            }
        } else {
            if (this.inheritanceTypeSelected === LINKED_GENES_INHERITANCE) {
                let char1 = this.linkedGenes[0].trait1;
                let char2 = this.linkedGenes[0].trait2;
                this.inheritanceType.type1 = LINKED_GENES_INHERITANCE;
                this.inheritanceType.type2 = LINKED_GENES_INHERITANCE;
                this.characteristicSelected = char1 + " + " + char2;
                this.changeCharacteristic();
                this.traits1 = char1.traits;
                this.traits2 = char2.traits;
                found = true;

            } else {
                let inh1 = this.inheritanceTypeSelected.split("+")[0].trim();
                let inh2 = this.inheritanceTypeSelected.split("+")[1].trim();
                this.inheritanceType.type1 = inh1;
                this.inheritanceType.type2 = inh2;
                let char1, char2;
                let found1 = false;
                let found2 = false;

                for (let i = 0; i < this.organismData.length; i++) {
                    for (let j = i + 1; j < this.organismData.length; j++) {
                        if (organismData[i].inheritanceType === inh1) {
                            char1 = organismData[i];
                            found1 = true;
                        }
                        if (organismData[j].inheritanceType === inh2) {
                            char2 = organismData[j];
                            found2 = true;
                        }
                        if (found1 && found2) {
                            let characteristic = char1.characteristic + " + " + char2.characteristic;

                            if (this.characteristicsOptions.indexOf(characteristic) > 0) {
                                this.characteristicSelected = characteristic;
                                this.changeCharacteristic();
                                this.changeTraits(true);
                                found = true;
                                break;
                            } 
                        }
                    }
                }
            }
        }
        if (!found) {
            this.characteristicSelected = '';
            this.changeCharacteristic();
            this.traits1 = [];
            this.traits2 = [];
        }
        this.changeCm();
    }

    private changeCharacteristic() {
        if (this.characteristicSelected !== '') {
            if (this.numberOfCharact === 1) {
                this.characteristic = {
                    first: this.characteristicSelected,
                    second: ""
                }
            } else {
                this.characteristic = {
                    first: this.characteristicSelected.split("+")[0].trim(),
                    second: this.characteristicSelected.split("+")[1].trim()
                };
            }
        } else {
            this.characteristic = {
                first: '',
                second: ''
            }
        }
    }

    private getCharacteristicsOptions() {
        if (this.numberOfCharact === 1) {
            this.getMonohybridCharacteristics();
        }
        else if (this.numberOfCharact === 2) {
            this.getDihybridCharacteristics();
        }
    }

    /**
     * Get list of avaliable characteristics for monohybrid cross and selected organism.
     */
    private getMonohybridCharacteristics() {
        const organismData = this.organismData;
        this.characteristicsOptions = [];
        for (let i = 0; i < organismData.length; i++) {
            if (organismData[i].inheritanceType !== LINKED_GENES_INHERITANCE) {
                this.characteristicsOptions.push(organismData[i].characteristic);
            }
        }
    }

    /**
     * Get list of avaliable characteristics for dihybrid cross and selected organism.
     */
    private getDihybridCharacteristics() {
        const organismData = this.organismData;
        this.characteristicsOptions = [];
        for (let i = 0; i < organismData.length; i++) {
            for (let j = i + 1; j < organismData.length; j++) {
                const char1 = organismData[i].characteristic;
                const char2 = organismData[j].characteristic;
                const inh1 = organismData[i].inheritanceType;
                const inh2 = organismData[j].inheritanceType;
                if (inh1 !== LINKED_GENES_INHERITANCE && inh2 !== LINKED_GENES_INHERITANCE) {
                    this.characteristicsOptions.push(`${char1} + ${char2}`);
                }
            }
        }
        let linkedGenes: ILinkedGenes[] = this.linkedGenes;
        for (let i = 0; i < linkedGenes.length; i++) {
            this.characteristicsOptions.push(`${linkedGenes[i].trait1} + ${linkedGenes[i].trait2}`);
        }
    }

    private changeTraits(isCharacteristicSet: boolean = false) : void {
        if (isCharacteristicSet) {
            if (this.numberOfCharact === 1) {
                this.traits1 = this.getTraitsByCharacteristic(this.characteristicSelected);
                this.traits2 = [];
            }
            else if (this.numberOfCharact === 2) {
                if (this.characteristicSelected !== '') {
                    this.traits1 = this.getTraitsByCharacteristic(this.characteristicSelected.split(' + ')[0]);
                    this.traits2 = this.getTraitsByCharacteristic(this.characteristicSelected.split(' + ')[1]);
                } else {
                    this.traits1 = [];
                    this.traits2 = [];
                }
            }
        } else {
            const organismData = this.organismData; //this.data[this.organismSelected];
            if (this.numberOfCharact === 1) {
                this.traits1 = organismData[0].traits || [];
                this.traits2 = [];
            }
            else if (this.numberOfCharact === 2) {
                if (this.characteristicSelected !== '') {
                    this.traits1 = this.getTraitsByCharacteristic(this.characteristicsOptions[0].split(' + ')[0]);
                    this.traits2 = this.getTraitsByCharacteristic(this.characteristicsOptions[0].split(' + ')[1]);
                } else {
                    this.traits1 = [];
                    this.traits2 = [];
                }
            }
        }
    }

    private changeInheritanceTypes() {
        let inheritanceTypes = [];
        if (this.numberOfCharact === 1) {
            for (let i = 0; i < this.organismData.length; i++) {
                let inh = this.organismData[i].inheritanceType;
                if (inh !== LINKED_GENES_INHERITANCE && inheritanceTypes.indexOf(inh) < 0) {
                    inheritanceTypes.push(inh);
                }
            }
        }
        else if (this.numberOfCharact === 2) {
            let linkedGenesFound = false;
            for (let i = 0; i < this.organismData.length; i++) {
                for (let j = i + 1; j < this.organismData.length; j++) {
                    const inh1 = this.organismData[i].inheritanceType;
                    const inh2 = this.organismData[j].inheritanceType;
                    if (inh1 !== LINKED_GENES_INHERITANCE && inh2 !== LINKED_GENES_INHERITANCE) {
                        let inh = `${inh1} + ${inh2}`;
                        if (inheritanceTypes.indexOf(inh) < 0) {
                            inheritanceTypes.push(`${inh1} + ${inh2}`);
                        }
                    } else {
                        linkedGenesFound = true;
                    }
                }
            }
            if (linkedGenesFound) {
                inheritanceTypes.push(LINKED_GENES_INHERITANCE);
            }
        }
        return inheritanceTypes;
    }

    private changeInheritanceType(isCharacteristicSet: boolean = false) {
        let inheritanceType: string;
        if (this.numberOfCharact === 1) {
            if (isCharacteristicSet) {
                inheritanceType = this.getInheritanceTypeByCharacteristic(this.characteristicSelected);
            }
            else {
                inheritanceType = this.organismData[0].inheritanceType || '';
            }
            this.inheritanceType = { type1: inheritanceType, type2: "" };
            return inheritanceType;
        }
        else if (this.numberOfCharact === 2) {
            let char1 = '';
            let char2 = '';
            if (this.characteristicSelected !== '') {
                if (isCharacteristicSet) {
                    char1 = this.characteristicSelected.split(' + ')[0];
                    char2 = this.characteristicSelected.split(' + ')[1];
                }
                else {
                    char1 = this.characteristicsOptions[0].split(' + ')[0];
                    char2 = this.characteristicsOptions[0].split(' + ')[1];
                }
            }
            const inh1 = this.getInheritanceTypeByCharacteristic(char1);
            const inh2 = this.getInheritanceTypeByCharacteristic(char2);
            this.inheritanceType = { type1: inh1, type2: inh2 };

            let inheritanceType;
            if (inh1 === LINKED_GENES_INHERITANCE || inh2 === LINKED_GENES_INHERITANCE) {
                inheritanceType = LINKED_GENES_INHERITANCE;
            } else {
                inheritanceType = `${inh1} + ${inh2}`;
            }
            return inheritanceType;
        }
    }

    private getInheritanceTypeByCharacteristic(characteristic: string) {
        let organismData = this.organismData;
        for (let i = 0; i < organismData.length; i++) {
            if (organismData[i].characteristic === characteristic) {
                return organismData[i].inheritanceType;
            }
        }
        return '';
    }

    private getTraitsByCharacteristic(characteristic: string) {
        let organismData = this.organismData;
        for (let i = 0; i < organismData.length; i++) {
            if (organismData[i].characteristic === characteristic) {
                return organismData[i].traits;
            }
        }
        return [];
    }

    private getOrganismId(name: string) {
        let id: string = '';
        for (let i = 0; i < this.organisms.length; i++) {
            if (this.organisms[i].name === this.organismSelected) {
                id = this.organisms[i].id;
                break;
            }
        }
        return id;
    }

    private changeCm() {
        this.cM = 0;
        if (this.inheritanceType.type1 === LINKED_GENES_INHERITANCE && this.inheritanceType.type2 === LINKED_GENES_INHERITANCE) {
            for (let i = 0; i < this.linkedGenes.length; i++) {
                if (this.characteristic.first === this.linkedGenes[i].trait1 &&
                    this.characteristic.second === this.linkedGenes[i].trait2) {
                    this.cM = this.linkedGenes[i].cm;
                    break;
                }
            }
        }
    }
}



