import { Injectable } from '@angular/core';
import { GeneticDataService } from "./genetic-data.service"
import { ITrait, IParents, IOrganism, IChild, IGenotype, IInheritance, ICharacteristic } from "./shared/types";
import { LINKED_GENES_INHERITANCE, SEX_CHROMOSOMES_INHERITANCE, HOMOZYGOTE, HETEROZYGOTE, MALE_SEX_CHROMOSOME } from './shared/constants';

@Injectable()
export class InheritanceService {
    constructor(private geneticDataService: GeneticDataService) { }

    generateGenotypes(genotype1: IGenotype, genotype2: IGenotype) : IGenotype[] {
        let genotypes : IGenotype[] = [];
        genotypes.push({ allele1: genotype1.allele1, allele2: genotype2.allele1 });
        genotypes.push({ allele1: genotype1.allele1, allele2: genotype2.allele2 });
        genotypes.push({ allele1: genotype1.allele2, allele2: genotype2.allele1 });
        genotypes.push({ allele1: genotype1.allele2, allele2: genotype2.allele2 });
        return genotypes;
    }

    getPhenotype(traits: ITrait[], genotype: IGenotype) { 
        const reversedGenotype : IGenotype = { allele1: genotype.allele2, allele2: genotype.allele1 };
        for (let i = 0; i < traits.length; i++) {
            if (this.compareGenotypes(genotype, traits[i].genotype) || this.compareGenotypes(reversedGenotype, traits[i].genotype)) {
                return traits[i].phenotype;
            }    
        }
        return 'ERROR';
    }

    getType(genotype: IGenotype) {
        if (genotype.allele1 === genotype.allele2) return HOMOZYGOTE;
        else return HETEROZYGOTE;
    }

    getImageUrl(traits: ITrait[], phenotype: string) {
        for (let i = 0; i < traits.length; i++) {
            if (traits[i].phenotype === phenotype) {
                return traits[i].imageUrl;
            }
        }
        return "gecko2.png";
    }

    getParentsForChild(characteristic: ICharacteristic, inheritanceType: IInheritance, traits1: ITrait[], traits2: ITrait[], childGenotype: IGenotype, childGenotype2: IGenotype, cM:number = undefined) : IParents[] {
        let possibleParents: IParents[] = [];
        const isDihybrid = traits2.length > 0;

        for (let i = 0; i < traits1.length; i++) {
            for (let j = 0; j < traits1.length; j++) {
                const parent1Trait1 = traits1[i];
                const parent2Trait1 = traits1[j];
                if (inheritanceType.type1 === SEX_CHROMOSOMES_INHERITANCE)
                {
                    if (parent1Trait1.genotype.allele2 === MALE_SEX_CHROMOSOME || parent2Trait1.genotype.allele2 !== MALE_SEX_CHROMOSOME) {
                        continue;
                    }
                }
                let parentData: IParents;

                if (isDihybrid) {
                    for (let k = 0; k < traits2.length; k++) {
                        for (let l = 0; l < traits2.length; l++) {
                            const parent1Trait2 = traits2[k];
                            const parent2Trait2 = traits2[l];
                            if (inheritanceType.type2 === SEX_CHROMOSOMES_INHERITANCE) {
                                if (parent1Trait2.genotype.allele2 === MALE_SEX_CHROMOSOME || parent2Trait2.genotype.allele2 !== MALE_SEX_CHROMOSOME) {
                                    continue;
                                }
                            }
                            const parent1 = { trait1: parent1Trait1, trait2: parent1Trait2 };
                            const parent2 = { trait1: parent2Trait1, trait2: parent2Trait2 };

                            parentData = {
                                parent1,
                                parent2,
                                percentage: this.getChildPercentage(characteristic, inheritanceType, traits1, traits2, childGenotype, childGenotype2, parent1, parent2, cM)
                            };
                            possibleParents.push(parentData);
                        }
                    }
                }
                else {
                    const parent1 = { trait1: parent1Trait1, trait2: {} as ITrait };
                    const parent2 = { trait1: parent2Trait1, trait2: {} as ITrait };

                    parentData = {
                        parent1,
                        parent2,
                        percentage: this.getChildPercentage(characteristic, inheritanceType, traits1, traits2, childGenotype, childGenotype2, parent1, parent2, cM)
                    };
                    possibleParents.push(parentData);
                }
            }
        }
        return possibleParents;
    }

    getChildPercentage(characteristic: ICharacteristic, inheritanceType: IInheritance, traits1: ITrait[], traits2: ITrait[], childGenotype: IGenotype, childGenotype2: IGenotype, parent1: IOrganism, parent2: IOrganism, cM: number) {
        let children: IChild[] = this.generateChildren(characteristic, inheritanceType, traits1, traits2, parent1, parent2, cM);
        const isDihybrid = traits2.length > 0;

        for (let i = 0; i < children.length; i++) {
            const c = children[i];
            const child = c.child;
            if (isDihybrid) {
                if (this.compareGenotypes(child.trait1.genotype, childGenotype) && this.compareGenotypes(child.trait2.genotype, childGenotype2)) {
                    return c.percentage;
                }
            } else {
                if (this.compareGenotypes(child.trait1.genotype, childGenotype)) {
                    return c.percentage;
                }
            }
        }
        return 0; //TODO: generirati djecu i vratiti udio childGenotype u genotipovima djece
    }

    generateChildren(characteristic: ICharacteristic, inheritanceType: IInheritance, traits1: ITrait[], traits2: ITrait[], parent1: IOrganism, parent2: IOrganism, cM: number=undefined) : IChild[] {
        let children: IChild[];
        const isDihybrid = traits2.length > 0;
        if (!isDihybrid) {
            children = this.monohybridCross(characteristic.first, inheritanceType.type1, traits1, parent1, parent2);
        } else {
            children = this.dihybridCross(characteristic, inheritanceType, traits1, traits2, parent1, parent2, cM);
        }
        return children;
    }

    monohybridCross(characteristic: string, inheritanceType: string, traits: ITrait[], parent1: IOrganism, parent2: IOrganism): IChild[] {
        let children: IChild[] = [];
        let childrenGenotypes = this.generateGenotypes(parent1.trait1.genotype, parent2.trait1.genotype);
        let traitData: ITrait;
        let childData: IChild;
        let childrenCounter = {};

        for (let genotype of childrenGenotypes) {
            const gen: string = genotype.allele1 + genotype.allele2;
            childrenCounter[gen] = {
                count: (childrenCounter[gen] ? childrenCounter[gen].count : 0) + 1,
                genotype
            }
        }
        for (let genotype in childrenCounter) {
            const gen = childrenCounter[genotype];
            const phenotype = this.getPhenotype(traits, gen.genotype);
                childData = {
                    child: {
                        trait1: { phenotype, genotype: gen.genotype, type: this.getType(gen.genotype), imageUrl: this.getImageUrl(traits, phenotype) },
                        trait2: {} as any
                        },
                    percentage : gen.count / childrenGenotypes.length
            }
            children.push(childData);
        }

        return children;
    }

    dihybridCross(characteristic: ICharacteristic, inheritanceType : IInheritance, traits1: ITrait[], traits2: ITrait[], parent1: IOrganism, parent2: IOrganism, cM: number): IChild[] {
        let children: IChild[] = [];
        let childrenGenotypes1 = this.generateGenotypes(parent1.trait1.genotype, parent2.trait1.genotype);
        let childrenGenotypes2 = this.generateGenotypes(parent1.trait2.genotype, parent2.trait2.genotype);
        let traitData: ITrait;
        let childData: IChild;
        let childrenCounter1 = {};
        let childrenCounter2 = {};
        let vezani = inheritanceType.type1 === LINKED_GENES_INHERITANCE && inheritanceType.type2 === LINKED_GENES_INHERITANCE;

        for (let genotype1 of childrenGenotypes1) {
            let genotype: string = genotype1.allele1 + genotype1.allele2;
            childrenCounter1[genotype] = {
                count: (childrenCounter1[genotype] ? childrenCounter1[genotype].count : 0) + 1,
                genotype: genotype1
            }
        }
        
        for (let genotype2 of childrenGenotypes2) {
            let genotype: string = genotype2.allele1 + genotype2.allele2;
            childrenCounter2[genotype] = {
                count: (childrenCounter2[genotype] ? childrenCounter2[genotype].count : 0) + 1,
                genotype: genotype2
            }
        }
        for (let genotype1 in childrenCounter1) {
            for (let genotype2 in childrenCounter2) {
                const gen1: IGenotype = childrenCounter1[genotype1].genotype;
                const gen2: IGenotype = childrenCounter2[genotype2].genotype;
                const gen1Count: number = childrenCounter1[genotype1].count;
                const gen2Count: number = childrenCounter2[genotype2].count;
                const phenotype1: string = this.getPhenotype(traits1, gen1);
                const phenotype2: string = this.getPhenotype(traits2, gen2);

                childData = {
                    child: {
                        trait1: { phenotype: phenotype1, genotype: gen1, type: this.getType(gen1), imageUrl: this.getImageUrl(traits1, phenotype1) },
                        trait2: { phenotype: phenotype2, genotype: gen2, type: this.getType(gen2), imageUrl: this.getImageUrl(traits2, phenotype2) }
                    },
                    percentage: gen1Count * gen2Count / (childrenGenotypes1.length * childrenGenotypes2.length)
                }
                if (vezani) {
                    //bar jedan roditelj mora biti heterozigot u oba svojstva inace crossing over nema efekta
                    if (parent1.trait1.type === HETEROZYGOTE && parent1.trait2.type === HETEROZYGOTE || parent2.trait1.type === HETEROZYGOTE && parent2.trait2.type === HETEROZYGOTE) {

                        //ovo isto treba getati alela a ne raditi substring
                        let parent1Alel1 = parent1.trait1.genotype.allele1;
                        let parent1Alel2 = parent1.trait1.genotype.allele2;
                        let parent1Alel3 = parent1.trait2.genotype.allele1;
                        let parent1Alel4 = parent1.trait2.genotype.allele2;
                        let parent2Alel1 = parent2.trait1.genotype.allele1;
                        let parent2Alel2 = parent2.trait1.genotype.allele2;
                        let parent2Alel3 = parent2.trait2.genotype.allele1;
                        let parent2Alel4 = parent2.trait2.genotype.allele2;
                        let childAlel1 = genotype1.substring(0, genotype1.length/2);
                        let childAlel2 = genotype1.substring(genotype1.length / 2, genotype1.length);
                        let childAlel3 = genotype2.substring(0, genotype2.length / 2);
                        let childAlel4 = genotype2.substring(genotype2.length / 2, genotype2.length);
                        //izvuc iz svojstva
                        let cm = (cM * 2) / 100;
                        let x = 0.5 - cm/4;
                        let y = cm/4;

                        //oba heterozigoti u oba svojstva
                        if (parent1.trait1.type === HETEROZYGOTE && parent1.trait2.type === HETEROZYGOTE && parent2.trait1.type === HETEROZYGOTE && parent2.trait2.type === HETEROZYGOTE) {

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
                         }
                        //slucaj 2, drugi roditelj nije heterozigt u oba, znaci crossing over samo za parenta1
                        
                        else if (parent1.trait1.type === HETEROZYGOTE && parent1.trait2.type === HETEROZYGOTE && !(parent2.trait1.type === HETEROZYGOTE && parent2.trait2.type === HETEROZYGOTE)) {

                            if (childAlel1 === parent1Alel1 && childAlel3 === parent1Alel3 || childAlel1 === parent1Alel2 && childAlel3 === parent1Alel4) {
                                childData.percentage = childData.percentage * x;
                            }
                            else {
                                childData.percentage = childData.percentage * y;
                            }
                            if ((parent2.trait1.type === HETEROZYGOTE && parent2.trait2.type !== HETEROZYGOTE) || (parent2.trait1.type !== HETEROZYGOTE && parent2.trait2.type === HETEROZYGOTE)) {
                                childData.percentage = childData.percentage / 2;
                            }
                        }
                        //prvi parent nije heteorozigot u oba, xcrossing over smao za drugog
                        else if (!(parent1.trait1.type === HETEROZYGOTE && parent1.trait2.type === HETEROZYGOTE) && (parent2.trait1.type === HETEROZYGOTE && parent2.trait2.type === HETEROZYGOTE)) {

                            if (childAlel2 === parent2Alel1 && childAlel4 === parent2Alel3 || childAlel2 === parent2Alel2 && childAlel4 === parent2Alel4) {
                                childData.percentage = childData.percentage * x;
                            }
                            else {
                                childData.percentage = childData.percentage * y;
                            }
                            if ((parent1.trait1.type === HETEROZYGOTE && parent1.trait2.type !== HETEROZYGOTE) || (parent1.trait1.type !== HETEROZYGOTE && parent1.trait2.type === HETEROZYGOTE)) {
                                childData.percentage = childData.percentage / 2;
                            }
                        }
                    }
                }
               children.push(childData);
            }
        }
        return children;
    }

    private compareGenotypes(genotype1: IGenotype, genotype2: IGenotype) {
        return genotype1.allele1 === genotype2.allele1 && genotype1.allele2 === genotype2.allele2;
    }

    private filterTraitsBySex(sex: string, traits: ITrait[]) {
        let traitsTemp: ITrait[] = [];
        for (let i = 0; i < traits.length; i++) {
            if ((sex === "male" && traits[i].genotype.allele2 === MALE_SEX_CHROMOSOME) || (sex === "female" && traits[i].genotype.allele2 !== MALE_SEX_CHROMOSOME)) {
                traitsTemp.push(traits[i]);
            }
        }
        return traitsTemp;
    }
}