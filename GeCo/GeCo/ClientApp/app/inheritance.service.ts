import { Injectable } from '@angular/core';
import { ITrait, IParents, IOrganism } from "./shared/types";

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
        return genotypes;
    }

    getPhenotype(traits: ITrait[], genotype: string) { 
        const reversedGenotype = genotype[1] + genotype[0];
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
    }

    getParentsForChild(characteristic1: string, traits1: ITrait[], characteristic2: string, traits2: ITrait[], childGenotype: string, childGenotype2: string) : IParents[] {
        let possibleParents: IParents[] = [];
        for (let i = 0; i < traits1.length; i++) {
            for (let j = 0; j < traits1.length; j++) {
                const parent1Trait1 = traits1[i];
                const parent2Trait1 = traits1[j];
                let parentData: IParents;

                if (childGenotype2 && traits2.length > 0) {
                    for (let k = 0; k < traits2.length; k++) {
                        for (let l = 0; l < traits2.length; l++) {
                            const parent1Trait2 = traits2[i];
                            const parent2Trait2 = traits2[j];

                            parentData = {
                                parent1: { trait1: parent1Trait1, trait2: parent1Trait2 },
                                parent2: { trait1: parent2Trait1, trait2: parent2Trait2 },
                                percentage: this.getChildPercentage(childGenotype, childGenotype2, parent1Trait1.genotype, parent2Trait1.genotype,
                                                                     parent1Trait2.genotype, parent2Trait2.genotype)
                            };
                            possibleParents.push(parentData);
                        }
                    }
                }
                else {
                    parentData = {
                        parent1: { trait1: parent1Trait1, trait2: {} as any },
                        parent2: { trait1: parent2Trait1, trait2: {} as any },
                        percentage: this.getChildPercentage(childGenotype, parent1Trait1.genotype, parent2Trait1.genotype)
                    };
                    possibleParents.push(parentData);
                }
            }
        }
        return possibleParents;
    }

    getChildPercentage(childGenotype: string, parent1Trait1Genotype: string, parent2Trait1Genotype: string, child2Genotype: string = "", parent1Trait2Genotype: string = "", parent2Trait2Genotype: string = "") {
        return 0.2; //TODO: generirati djecu i vratiti udio childGenotype u genotipovima djece
    }
}