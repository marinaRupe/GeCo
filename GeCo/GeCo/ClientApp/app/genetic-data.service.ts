import { Injectable } from '@angular/core';

@Injectable()
export class GeneticDataService {
    getData() {
        //hardcoded - get with GET request
        let data = {
            čovjek: [
                {
                    characteristic: 'oblik kose',
                    traits: [
                        { fenotype: "ravna", genotype: "AA", type: "Homozigot" },
                        { fenotype: "valovita", genotype: "Aa", type: "Heterozigot" },
                        { fenotype: "kovrčava", genotype: "aa", type: "Homozigot" }
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