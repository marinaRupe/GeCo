import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ILinkedGenes } from "./shared/types"

@Injectable()
export class GeneticDataService {
    getData() {
        //hardcoded - get with GET request
        let data = {
            čovjek: [
                {
                    characteristic: 'oblik kose',
                    traits: [
                        { phenotype: "ravna", genotype: {allele1: "A", allele2: "A"}, type: "homozigot" },
                        { phenotype: "valovita", genotype: { allele1: "A", allele2: "a" }, type: "heterozigot" },
                        { phenotype: "kovrčava", genotype: { allele1: "a", allele2: "a" }, type: "homozigot" }
                    ],
                    inheritanceType: 'nepotpuno dominantno/recesivno'
                },
                {
                    characteristic: 'ušna resica',
                    traits: [
                        { phenotype: "slobodna", genotype: { allele1: "A", allele2: "A" }, type: "homozigot" },
                        { phenotype: "slobodna", genotype: { allele1: "A", allele2: "a" }, type: "heterozigot" },
                        { phenotype: "srasla", genotype: { allele1: "a", allele2: "a" }, type: "homozigot" }
                    ],
                    inheritanceType: 'dominantno/recesivno'
                },
                {
                    characteristic: 'krvna grupa',
                    traits: [
                        { phenotype: "crvena", genotype: { allele1: "A", allele2: "A" }, type: "Homozigot" },
                        { phenotype: "roza", genotype: { allele1: "A", allele2: "a" }, type: "Heterozigot" },
                        { phenotype: "bijela", genotype: { allele1: "a", allele2: "a" }, type: "Homozigot" }
                    ],
                    inheritanceType: 'kodominantno'
                },
                {
                    characteristic: 'vg1',
                    traits: [
                        { phenotype: "vg1+", genotype: { allele1: "vg1+", allele2: "vg1+" }, type: "homozigot" },
                        { phenotype: "vg1+", genotype: { allele1: "vg1+", allele2: "vg1-" }, type: "heterozigot" },
                        { phenotype: "vg1-", genotype: { allele1: "vg1-", allele2: "vg1-" }, type: "homozigot" }
                    ],
                    inheritanceType: 'vezani geni'
                },
                {
                    characteristic: 'vg2',
                    traits: [
                        { phenotype: "vg2+", genotype: { allele1: "vg2+", allele2: "vg2+" }, type: "homozigot" },
                        { phenotype: "vg2+", genotype: { allele1: "vg2+", allele2: "vg2-" }, type: "heterozigot" },
                        { phenotype: "vg2-", genotype: { allele1: "vg2-", allele2: "vg2-" }, type: "homozigot" }
                    ],
                    inheritanceType: 'vezani geni'
                },
                {
                    characteristic: 'vg3',
                    traits: [
                        { phenotype: "vg3+", genotype: { allele1: "vg3+", allele2: "vg3+"}, type: "homozigot" },
                        { phenotype: "vg3+", genotype: { allele1: "vg3+", allele2: "vg3-" }, type: "heterozigot" },
                        { phenotype: "vg3-", genotype: { allele1: "vg3-", allele2: "vg3-" }, type: "homozigot" }
                    ],
                    inheritanceType: 'vezani geni'
                },
                {
                    characteristic: 'vg4',
                    traits: [
                        { phenotype: "vg4+", genotype: { allele1: "vg4+", allele2: "vg4+" }, type: "homozigot" },
                        { phenotype: "vg4+", genotype: { allele1: "vg4+", allele2: "vg4-" }, type: "heterozigot" },
                        { phenotype: "vg4-", genotype: { allele1: "vg4-", allele2: "vg4-" }, type: "homozigot" }
                    ],
                    inheritanceType: 'vezani geni'
                }
            ],
            mahuna: [
                {
                    characteristic: 'oblik sjemenke',
                    traits: [
                        { phenotype: "okrugli", genotype: { allele1: "A", allele2: "A" }, type: "homozigot" },
                        { phenotype: "okrugli", genotype: { allele1: "A", allele2: "a" }, type: "heterozigot" },
                        { phenotype: "smežurani", genotype: { allele1: "a", allele2: "a" }, type: "homozigot" }
                    ],
                    inheritanceType: 'dominantno/recesivno'
                },
                {
                    characteristic: 'boja cvjeta',
                    traits: [
                        { phenotype: "ljubičasta", genotype: { allele1: "A", allele2: "A" }, type: "homozigot" },
                        { phenotype: "ljubičasta", genotype: { allele1: "A", allele2: "a" }, type: "heterozigot" },
                        { phenotype: "bijela", genotype: { allele1: "a", allele2: "a" }, type: "homozigot" }
                    ],
                    inheritanceType: 'dominantno/recesivno'
                },
                {
                    characteristic: 'boja sjemenke',
                    traits: [
                        { phenotype: "žuta", genotype: { allele1: "A", allele2: "A" }, type: "homozigot" },
                        { phenotype: "žuta", genotype: { allele1: "A", allele2: "a" }, type: "heterozigot" },
                        { phenotype: "zelena", genotype: { allele1: "a", allele2: "a" }, type: "homozigot" }
                    ],
                    inheritanceType: 'dominantno/recesivno'
                }
            ]
        }
        return data;
    }

    getLinkedGenes(organism: string) {
        let linkedGenes : ILinkedGenes[] = [];
        //TODO: get linkedGenes for given organism
        if (organism === "čovjek") {
            linkedGenes = [
                { gene1Name: "vg1", gene2Name: "vg2", cM: 0.36 },
                { gene1Name: "vg3", gene2Name: "vg4", cM: 0.4 }
            ];
        }
        return linkedGenes;
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