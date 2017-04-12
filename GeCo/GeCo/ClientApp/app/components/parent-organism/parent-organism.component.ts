import { Component, Input } from '@angular/core';

@Component({
    selector: 'parent-organism',
    template: require('./parent-organism.component.html'),
    styles: [require('./parent-organism.component.css')]
})
export class ParentOrganismComponent {
    trait: {} = {fenotype: "", genotype: "", type: ""};
    traits: [{}] = [
        { fenotype: "crvena", genotype: "AA", type: "Homozigot" },
        { fenotype: "roza", genotype: "Aa", type: "Heterozigot" },
        { fenotype: "bijela", genotype: "aa", type: "Homozigot" }
    ];
}