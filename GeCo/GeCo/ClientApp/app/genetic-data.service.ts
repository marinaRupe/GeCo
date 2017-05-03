import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class GeneticDataService {
    getData() {
        //hardcoded - get with GET request
        let data = {
            čovjek: [
                {
                    characteristic: 'oblik kose',
                    traits: [
                        { phenotype: "ravna", genotype: "AA", type: "Homozigot" },
                        { phenotype: "valovita", genotype: "Aa", type: "Heterozigot" },
                        { phenotype: "kovrčava", genotype: "aa", type: "Homozigot" }
                    ],
                    inheritanceType: 'nepotpuno dominantno/recesivno'
                },
                {
                    characteristic: 'ušne resice',
                    traits: [
                        { phenotype: "slobodna", genotype: "AA", type: "Homozigot" },
                        { phenotype: "slobodna", genotype: "Aa", type: "Heterozigot" },
                        { phenotype: "srasla", genotype: "aa", type: "Homozigot" }
                    ],
                    inheritanceType: 'dominantno/recesivno'
                },
                {
                    characteristic: 'krvna grupa',
                    traits: [
                        { phenotype: "crvena", genotype: "AA", type: "Homozigot" },
                        { phenotype: "roza", genotype: "Aa", type: "Heterozigot" },
                        { phenotype: "bijela", genotype: "aa", type: "Homozigot" }
                    ],
                    inheritanceType: 'kodominantno'
                }
            ],
            mahuna: [
                {
                    characteristic: 'oblik sjemenke',
                    traits: [
                        { phenotype: "okrugli", genotype: "AA", type: "Homozigot" },
                        { phenotype: "okrugli", genotype: "Aa", type: "Heterozigot" },
                        { phenotype: "smežurani", genotype: "aa", type: "Homozigot" }
                    ],
                    inheritanceType: 'dominantno/recesivno'
                },
                {
                    characteristic: 'boja cvjeta',
                    traits: [
                        { phenotype: "ljubičasta", genotype: "AA", type: "Homozigot" },
                        { phenotype: "ljubičasta", genotype: "Aa", type: "Heterozigot" },
                        { phenotype: "bijela", genotype: "aa", type: "Homozigot" }
                    ],
                    inheritanceType: 'dominantno/recesivno'
                },
                {
                    characteristic: 'boja sjemenke',
                    traits: [
                        { phenotype: "žuta", genotype: "AA", type: "Homozigot" },
                        { phenotype: "žuta", genotype: "Aa", type: "Heterozigot" },
                        { phenotype: "zelena", genotype: "aa", type: "Homozigot" }
                    ],
                    inheritanceType: 'dominantno/recesivno'
                }
            ]
        }
        return data;
    }

    getOrganisms() {
        //hardcoded - get with GET request
        return ['čovjek', 'mahuna'];
    }

    getInheritanceTypes() {
    //hardcoded - get with GET request
        return [
            'dominantno/recesivno',
            'nepotpuno dominantno/recesivno',
            'kodominantno',
            'vezani geni'
        ];
    }
}