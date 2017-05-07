import { Injectable } from '@angular/core';
import { ITrait, IParents, IOrganism, IChild } from "./shared/types";

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

    generateChildren(characteristic: string, traits1: ITrait[], traits2: ITrait[], parent1: IOrganism, parent2: IOrganism) : IChild[] {
        let children: IChild[];
        if (traits2.length === 0) {
            children = this.monohybridCross(characteristic, traits1, parent1, parent2);
        } else {
            children = this.dihybridCross(characteristic, traits1, traits2, parent1, parent2);
        }
        return children;
    }

    monohybridCross(characteristic: string, traits: ITrait[], parent1: IOrganism, parent2: IOrganism): IChild[] {

        let children: IChild[] = [];
        let childrenGenotypes = this.generateGenotypes(parent1.trait1.genotype, parent2.trait1.genotype);
        let traitData: ITrait;
        let childData: IChild;
        let childrenCounter = {};

        for (let genoType of childrenGenotypes) {
            childrenCounter[genoType] = (childrenCounter[genoType] || 0) + 1;
        }
        for (let genoType in childrenCounter) {
                childData = {
                    child: {
                        trait1: { phenotype: this.getPhenotype(traits, genoType),genotype: genoType, type: this.getType(genoType) },
                        trait2: {} as any
                        },
                    percentage : childrenCounter[genoType] / childrenGenotypes.length
                }
            children.push(childData);
        }

        return children;
    }

    dihybridCross(characteristic: string, traits1: ITrait[], traits2: ITrait[], parent1: IOrganism, parent2: IOrganism): IChild[] {

        let children: IChild[] = [];
        let childrenGenotypes1 = this.generateGenotypes(parent1.trait1.genotype, parent2.trait1.genotype);
        let childrenGenotypes2 = this.generateGenotypes(parent1.trait2.genotype, parent2.trait2.genotype);
        let traitData: ITrait;
        let childData: IChild;
        let childrenCounter1 = {};
        let childrenCounter2 = {};
        let vezani = false;

        for (let genoType1 of childrenGenotypes1) {
            childrenCounter1[genoType1] = (childrenCounter1[genoType1] || 0) + 1;
        }
        
        for (let genoType2 of childrenGenotypes2) {
            childrenCounter2[genoType2] = (childrenCounter2[genoType2] || 0) + 1;
        }
        for (let genoType1 in childrenCounter1) {
            for (let genoType2 in childrenCounter2) {
                childData = {
                    child: {
                        trait1: { phenotype: this.getPhenotype(traits1, genoType1), genotype: genoType1, type: this.getType(genoType1) },
                        trait2: { phenotype: this.getPhenotype(traits2, genoType2), genotype: genoType2, type: this.getType(genoType2) }
                    },

                    percentage: childrenCounter1[genoType1] * childrenCounter2[genoType2] / (childrenGenotypes1.length * childrenGenotypes2.length)
                }
                if (vezani) {
                    //bar jedan roditelj mora biti heterozigot u oba svojstva inace crossing over nema efekta
                    if (parent1.trait1.type === 'HETEROZYGOTE' && parent1.trait2.type === 'HETEROZYGOTE' || parent2.trait1.type === 'HETEROZYGOTE' && parent2.trait2.type === 'HETEROZYGOTE') {


                        //ovo isto treba getati alela a ne raditi substring
                        let parent1Alel1 = parent1.trait1.genotype.substring(0, 1);
                        let parent1Alel2 = parent1.trait1.genotype.substring(1, 2);
                        let parent1Alel3 = parent1.trait2.genotype.substring(0, 1);
                        let parent1Alel4 = parent1.trait2.genotype.substring(1, 2);
                        let parent2Alel1 = parent2.trait1.genotype.substring(0, 1);
                        let parent2Alel2 = parent2.trait1.genotype.substring(1, 2);
                        let parent2Alel3 = parent2.trait2.genotype.substring(0, 1);
                        let parent2Alel4 = parent2.trait2.genotype.substring(1, 2);
                        let childAlel1 = genoType1.substring(0, 1);
                        let childAlel2 = genoType1.substring(1, 2);
                        let childAlel3 = genoType2.substring(0, 1);
                        let childAlel4 = genoType2.substring(1, 2);
                        //izvuc iz svojstva
                        let cm = 0.36;
                        let x = 0-5 - cm/4;
                        let y = cm/4;

                        //oba heterozigoti u oba svojstva
                        if (parent1.trait1.type === 'HETEROZYGOTE' && parent1.trait2.type === 'HETEROZYGOTE' && parent2.trait1.type === 'HETEROZYGOTE' && parent2.trait2.type === 'HETEROZYGOTE') {

                            if (childAlel1 === parent1Alel1 && childAlel3 === parent1Alel3 || childAlel1 === parent1Alel2 && childAlel3 === parent1Alel4) {
                                childData.percentage = childData.percentage * x;
                            }
                            else {
                                childData.percentage = childData.percentage * y;
                            }
                            if (childAlel2 === parent2Alel1 && childAlel4 === parent2Alel3 || childAlel2 === parent2Alel2 && childAlel4 === parent2Alel4) {
                                childData.percentage = childData.percentage * x;
                            }
                            else {
                                childData.percentage = childData.percentage * y;
                            }
                            childData.percentage = childData.percentage * 16;
                        }
                        //slucaj 2, drugi roditelj nije heterozigt u oba, znaci crossing over samo za parenta1
                        else if (parent1.trait1.type === 'HETEROZYGOTE' && parent1.trait2.type === 'HETEROZYGOTE' && !(parent2.trait1.type === 'HETEROZYGOTE' && parent2.trait2.type === 'HETEROZYGOTE')) {

                            if (childAlel1 === parent1Alel1 && childAlel3 === parent1Alel3 || childAlel1 === parent1Alel2 && childAlel3 === parent1Alel4) {
                                childData.percentage = childData.percentage * x;
                            }
                            else {
                                childData.percentage = childData.percentage * y;
                            }
                            childData.percentage = childData.percentage * 8;
                        }
                        //prvi parent nije heteorozigot u oba, xcrossing over smao za drugog
                        else if (!(parent1.trait1.type === 'HETEROZYGOTE' && parent1.trait2.type === 'HETEROZYGOTE') && (parent2.trait1.type === 'HETEROZYGOTE' && parent2.trait2.type === 'HETEROZYGOTE')) {

                            if (childAlel2 === parent2Alel1 && childAlel4 === parent2Alel3 || childAlel2 === parent2Alel2 && childAlel4 === parent2Alel4) {
                                childData.percentage = childData.percentage * x;
                            }
                            else {
                                childData.percentage = childData.percentage * y;
                            }
                            childData.percentage = childData.percentage * 4;
                        }
                    }
                }

                children.push(childData);
            }
            
        }
        
        return children;
    }
}