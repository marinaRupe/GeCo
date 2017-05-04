import { Injectable } from '@angular/core';
import { ITrait } from "./shared/types";

@Injectable()
export class InheritanceService {
    generateGenotypes(genotype1: string, genotype2: string) {
        let genotypes = [];
        const isDihybrid = genotype1.length === 4;

        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
                let genotypeMono = genotype1[i] + genotype2[j];
                if (isDihybrid) {
                    for (let k = 2; k < 4; k++) {
                        for (let l = 2; l < 4; l++) {
                            let genotypeDih = genotype1[k] + genotype2[l];
                            genotypes.push(genotypeMono + genotypeDih);
                        }
                    }   
                } else {
                    genotypes.push(genotypeMono);
                }
            }
        }
        console.log(genotypes);
        return genotypes;
    }

    getPhenotype(traits: ITrait[], genotype: string) { 
        let reversedGenotype = genotype[1] + genotype[0];
        for (let i = 0; i < traits.length; i++) {
            if (genotype === traits[i].genotype || reversedGenotype === traits[i].genotype) {
                return traits[i].phenotype;
            }    
        }
        return 'TODO';
    }

    getType(genotype: string) {
        const HOMOZYGOTE = 'homozigot';
        const HETEROZYGOTE = 'heterozigot';

        if (genotype.length === 2) {
            if (genotype[0] === genotype[1]) return HOMOZYGOTE;
            else return HETEROZYGOTE;
        }
        else if (genotype.length === 4) {
            return 'TODO';
        }
    }
}