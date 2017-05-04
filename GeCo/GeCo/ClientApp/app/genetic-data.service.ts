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
                        { phenotype: "ravna", genotype: "AA", type: "homozigot" },
                        { phenotype: "valovita", genotype: "Aa", type: "heterozigot" },
                        { phenotype: "kovrčava", genotype: "aa", type: "homozigot" }
                    ],
                    inheritanceType: 'nepotpuno dominantno/recesivno'
                },
                {
                    characteristic: 'ušna resica',
                    traits: [
                        { phenotype: "slobodna", genotype: "AA", type: "homozigot" },
                        { phenotype: "slobodna", genotype: "Aa", type: "heterozigot" },
                        { phenotype: "srasla", genotype: "aa", type: "homozigot" }
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
                        { phenotype: "okrugli", genotype: "AA", type: "homozigot" },
                        { phenotype: "okrugli", genotype: "Aa", type: "heterozigot" },
                        { phenotype: "smežurani", genotype: "aa", type: "homozigot" }
                    ],
                    inheritanceType: 'dominantno/recesivno'
                },
                {
                    characteristic: 'boja cvjeta',
                    traits: [
                        { phenotype: "ljubičasta", genotype: "AA", type: "homozigot" },
                        { phenotype: "ljubičasta", genotype: "Aa", type: "heterozigot" },
                        { phenotype: "bijela", genotype: "aa", type: "homozigot" }
                    ],
                    inheritanceType: 'dominantno/recesivno'
                },
                {
                    characteristic: 'boja sjemenke',
                    traits: [
                        { phenotype: "žuta", genotype: "AA", type: "homozigot" },
                        { phenotype: "žuta", genotype: "Aa", type: "heterozigot" },
                        { phenotype: "zelena", genotype: "aa", type: "homozigot" }
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