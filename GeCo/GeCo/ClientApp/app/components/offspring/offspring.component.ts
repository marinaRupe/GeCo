import { ChildOrganismComponent } from "../child-organism/child-organism.component";
import { Component, ContentChildren, QueryList } from '@angular/core';

@Component({
    selector: 'offspring',
    template: require('./offspring.component.html')
})
export class OffspringComponent {
    //@ViewChildren(ChildOrganismComponent) offspring: QueryList<ChildOrganismComponent>;
    offspringData: [{}];
    constructor() {
        this.offspringData = [
            { genotype:"AA", fenotype:"crvena" },
            { genotype: "Aa", fenotype: "roza" },
            { genotype: "aA", fenotype: "roza" },
            { genotype: "aa", fenotype: "bijela" }];
    }
}