﻿import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ILinkedGenes, ITrait } from "./shared/types"

@Injectable()
export class GeneticDataService {
    getData() {
        //hardcoded - get with GET request
        let data = {
            čovjek: [
                {
                    characteristic: 'oblik kose',
                    traits: [
                        { phenotype: "ravna", genotype: { allele1: "K", allele2: "K" }, type: "homozigot", imageUrl: "gecko2.png" },
                        { phenotype: "valovita", genotype: { allele1: "K", allele2: "k" }, type: "heterozigot", imageUrl: "gecko2.png" },
                        { phenotype: "kovrčava", genotype: { allele1: "k", allele2: "k" }, type: "homozigot", imageUrl: "gecko2.png" }
                    ],
                    inheritanceType: 'nepotpuno dominantno/recesivno'
                },
                {
                    characteristic: 'ušna resica',
                    traits: [
                        { phenotype: "slobodna", genotype: { allele1: "U", allele2: "U" }, type: "homozigot", imageUrl: "gecko2.png" },
                        { phenotype: "slobodna", genotype: { allele1: "U", allele2: "u" }, type: "heterozigot", imageUrl: "gecko2.png" },
                        { phenotype: "srasla", genotype: { allele1: "u", allele2: "u" }, type: "homozigot", imageUrl: "gecko2.png" }
                    ],
                    inheritanceType: 'dominantno/recesivno'
                },
                {
                    characteristic: 'krvna grupa',
                    traits: [
                        { phenotype: "A", genotype: { allele1: "A", allele2: "A" }, type: "homozigot", imageUrl: "gecko2.png" },
                        { phenotype: "A", genotype: { allele1: "A", allele2: "0" }, type: "heterozigot", imageUrl: "gecko2.png" },
                        { phenotype: "B", genotype: { allele1: "B", allele2: "B" }, type: "homozigot", imageUrl: "gecko2.png" },
                        { phenotype: "B", genotype: { allele1: "B", allele2: "0" }, type: "heterozigot", imageUrl: "gecko2.png" },
                        { phenotype: "AB", genotype: { allele1: "A", allele2: "B" }, type: "heterozigot", imageUrl: "gecko2.png" },
                        { phenotype: "0", genotype: { allele1: "0", allele2: "0" }, type: "homozigot", imageUrl: "gecko2.png" }
                    ],
                    inheritanceType: 'kodominantno'
                },
                {
                    characteristic: 'daltonizam',
                    traits: [
                        { phenotype: "zdrava", genotype: { allele1: "D", allele2: "D" }, type: "homozigot", imageUrl: "gecko2.png" },
                        { phenotype: "zdrava", genotype: { allele1: "D", allele2: "d" }, type: "heterozigot", imageUrl: "gecko2.png" },
                        { phenotype: "zdrav", genotype: { allele1: "D", allele2: "Y" }, type: "heterozigot", imageUrl: "gecko2.png" },
                        { phenotype: "bolestan", genotype: { allele1: "d", allele2: "Y" }, type: "heterozigot", imageUrl: "gecko2.png" }
                    ],
                    inheritanceType: 'spolni kromosomi'
                }
            ],
            mahuna: [
                {
                    characteristic: 'oblik sjemenke',
                    traits: [
                        { phenotype: "okrugli", genotype: { allele1: "OS", allele2: "OS" }, type: "homozigot", imageUrl: "gecko2.png" },
                        { phenotype: "okrugli", genotype: { allele1: "OS", allele2: "os" }, type: "heterozigot", imageUrl: "gecko2.png" },
                        { phenotype: "smežurani", genotype: { allele1: "os", allele2: "os" }, type: "homozigot", imageUrl: "gecko2.png" }
                    ],
                    inheritanceType: 'dominantno/recesivno'
                },
                {
                    characteristic: 'boja cvijeta',
                    traits: [
                        { phenotype: "ljubičasta", genotype: { allele1: "B", allele2: "B" }, type: "homozigot", imageUrl: "gecko2.png" },
                        { phenotype: "ljubičasta", genotype: { allele1: "B", allele2: "b" }, type: "heterozigot", imageUrl: "gecko2.png" },
                        { phenotype: "bijela", genotype: { allele1: "b", allele2: "b" }, type: "homozigot", imageUrl: "gecko2.png" }
                    ],
                    inheritanceType: 'dominantno/recesivno'
                },
                {
                    characteristic: 'boja sjemenke',
                    traits: [
                        { phenotype: "žuta", genotype: { allele1: "BS", allele2: "BS" }, type: "homozigot", imageUrl: "gecko2.png" },
                        { phenotype: "žuta", genotype: { allele1: "BS", allele2: "bs" }, type: "heterozigot", imageUrl: "gecko2.png" },
                        { phenotype: "zelena", genotype: { allele1: "bs", allele2: "bs" }, type: "homozigot", imageUrl: "gecko2.png" }
                    ],
                    inheritanceType: 'dominantno/recesivno'
                }
            ],
            "vinska mušica": [
                {
                    characteristic: 'vg1',
                    traits: [
                        { phenotype: "vg1+", genotype: { allele1: "vg1+", allele2: "vg1+" }, type: "homozigot", imageUrl: "gecko2.png" },
                        { phenotype: "vg1+", genotype: { allele1: "vg1+", allele2: "vg1-" }, type: "heterozigot", imageUrl: "gecko2.png" },
                        { phenotype: "vg1-", genotype: { allele1: "vg1-", allele2: "vg1-" }, type: "homozigot", imageUrl: "gecko2.png" }
                    ],
                    inheritanceType: 'vezani geni'
                },
                {
                    characteristic: 'vg2',
                    traits: [
                        { phenotype: "vg2+", genotype: { allele1: "vg2+", allele2: "vg2+" }, type: "homozigot", imageUrl: "gecko2.png" },
                        { phenotype: "vg2+", genotype: { allele1: "vg2+", allele2: "vg2-" }, type: "heterozigot", imageUrl: "gecko2.png" },
                        { phenotype: "vg2-", genotype: { allele1: "vg2-", allele2: "vg2-" }, type: "homozigot", imageUrl: "gecko2.png" }
                    ],
                    inheritanceType: 'vezani geni'
                },
                {
                    characteristic: 'vg3',
                    traits: [
                        { phenotype: "vg3+", genotype: { allele1: "vg3+", allele2: "vg3+" }, type: "homozigot", imageUrl: "gecko2.png" },
                        { phenotype: "vg3+", genotype: { allele1: "vg3+", allele2: "vg3-" }, type: "heterozigot", imageUrl: "gecko2.png" },
                        { phenotype: "vg3-", genotype: { allele1: "vg3-", allele2: "vg3-" }, type: "homozigot", imageUrl: "gecko2.png" }
                    ],
                    inheritanceType: 'vezani geni'
                },
                {
                    characteristic: 'vg4',
                    traits: [
                        { phenotype: "vg4+", genotype: { allele1: "vg4+", allele2: "vg4+" }, type: "homozigot", imageUrl: "gecko2.png" },
                        { phenotype: "vg4+", genotype: { allele1: "vg4+", allele2: "vg4-" }, type: "heterozigot", imageUrl: "gecko2.png" },
                        { phenotype: "vg4-", genotype: { allele1: "vg4-", allele2: "vg4-" }, type: "homozigot", imageUrl: "gecko2.png" }
                    ],
                    inheritanceType: 'vezani geni'
                }
            ]
        }
        return data;
    }

    getLinkedGenes(organism: string) {
        let linkedGenes : ILinkedGenes[] = [];
        //TODO: get linkedGenes for given organism
        if (organism === "vinska mušica") {
            linkedGenes = [
                { gene1Name: "vg1", gene2Name: "vg2", cM: 0.36 },
                { gene1Name: "vg3", gene2Name: "vg4", cM: 0.4 }
            ];
        }
        return linkedGenes;
    }

    getOrganisms() {
        //hardcoded - get with GET request
        return ['čovjek', 'mahuna', 'vinska mušica'];
    }

    getInheritanceTypes() {
    //hardcoded - get with GET request
        return [
            'dominantno/recesivno',
            'nepotpuno dominantno/recesivno',
            'kodominantno',
            'spolni kromosomi',
            'vezani geni'
        ];
    }

    geDataWithoutInheritanceType(inheritanceTypes: string[]) {
        let allData = this.getData();
        let data = {};

        for (let organism in allData) {
            let organismData = [];
            for (let i = 0; i < allData[organism].length; i++) {
                let char = allData[organism][i];
                if (inheritanceTypes.indexOf(char.inheritanceType) >= 0) {
                    organismData.push(char);
                }
            }
            if (organismData.length > 0) {
                data[organism] = organismData;
            }
        }
        return data;
    }
}