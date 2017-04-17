import { Injectable } from '@angular/core';
import { ITrait } from "./shared/types";

@Injectable()
export class InheritanceService {
    generateGenotypes(genotype1: string, genotype2: string) {
        let genotypes = [];
        for (let i = 0; i < genotype1.length; i++) {
            for (let j = 0; j < genotype2.length; j++) {
                genotypes.push(genotype1[i] + genotype2[j]);
            }
        }
        return genotypes;
    }

    getFenotype(traits: ITrait[], genotype: string) { 
        let reversedGenotype = genotype[1] + genotype[0];
        for (let i = 0; i < traits.length; i++) {
            if (genotype === traits[i].genotype || reversedGenotype === traits[i].genotype) {
                return traits[i].fenotype;
            }    
        }
        return 'TODO';
    }

    getType(genotype: string) {
        const HOMOZYGOTE = 'Homozigot';
        const HETEROZYGOTE = 'Heterozigot';

        if (genotype.length === 2) {
            if (genotype[0] === genotype[1]) return HOMOZYGOTE;
            else return HETEROZYGOTE;
        }
        else if (genotype.length === 4) {
            return 'TODO';
        }
    }
}