import { Component, ViewChild } from '@angular/core';
import { ParentOrganismComponent } from "../parent-organism/parent-organism.component";
import { Http } from '@angular/http';

@Component(({
    selector: 'recombinator',
    template: require('./recombinator.component.html'),
    styles: [require('./recombinator.component.css')]
}))
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

    constructor(http: Http) {
        let newData = {
            čovjek: [
                {
                    characteristic: 'oblik kose',
                    traits: [
                        { fenotype: "crvena", genotype: "AA", type: "Homozigot" },
                        { fenotype: "roza", genotype: "Aa", type: "Heterozigot" },
                        { fenotype: "bijela", genotype: "aa", type: "Homozigot" }
                    ],
                    inheritanceType: 'nepotpuno dominantno/recesivno'
                },
                {
                    characteristic: 'ušne resice',
                    traits: [
                        { fenotype: "slobodna", genotype: "AA", type: "Homozigot" },
                        { fenotype: "slobodna", genotype: "Aa", type: "Heterozigot" },
                        { fenotype: "srasla", genotype: "aa", type: "Homozigot" }
                    ],
                    inheritanceType: 'dominantno/recesivno'
                },
                {
                    characteristic: 'krvna grupa',
                    traits: [
                        { fenotype: "crvena", genotype: "AA", type: "Homozigot" },
                        { fenotype: "roza", genotype: "Aa", type: "Heterozigot" },
                        { fenotype: "bijela", genotype: "aa", type: "Homozigot" }
                    ],
                    inheritanceType: 'kodominantno'
                }
            ],
            mahuna: [
                {
                    characteristic: 'oblik sjemenke',
                    traits: [
                        { fenotype: "okrugli", genotype: "AA", type: "Homozigot" },
                        { fenotype: "okrugli", genotype: "Aa", type: "Heterozigot" },
                        { fenotype: "smežurani", genotype: "aa", type: "Homozigot" }
                    ],
                    inheritanceType: 'dominantno/recesivno'
                },
                {
                    characteristic: 'boja cvjeta',
                    traits: [
                        { fenotype: "ljubičasta", genotype: "AA", type: "Homozigot" },
                        { fenotype: "ljubičasta", genotype: "Aa", type: "Heterozigot" },
                        { fenotype: "bijela", genotype: "aa", type: "Homozigot" }
                    ],
                    inheritanceType: 'dominantno/recesivno'
                },
                {
                    characteristic: 'boja sjemenke',
                    traits: [
                        { fenotype: "žuta", genotype: "AA", type: "Homozigot" },
                        { fenotype: "žuta", genotype: "Aa", type: "Heterozigot" },
                        { fenotype: "zelena", genotype: "aa", type: "Homozigot" }
                    ],
                    inheritanceType: 'dominantno/recesivno'
                }
            ]
        }
        this.data = newData;
        this.organisms = ['čovjek', 'mahuna'];
        this.organism = this.organisms[0] || '';

        this.inheritanceTypes = [
            'dominantno/recesivno',
            'nepotpuno dominantno/recesivno',
            'kodominantno',
            'vezani geni'
        ];
    }

    ngAfterViewInit() {
        // After the view is initialized
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

interface IData {
    
}

export interface ITrait {
    fenotype: string;
    genotype: string;
    type: string;
}