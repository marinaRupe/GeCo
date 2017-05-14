import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ILinkedGenes, ITrait } from "./shared/types";

@Injectable()
export class GeneticDataService {
    http: Http;

    constructor(http: Http) {
        this.http = http;
    }

    getData() {
        return new Promise((resolve, reject) => {
            this.http.get('/api/Organism/GetAllData').subscribe(result => {
                resolve(result.json());
            });
        });
    }

    getDataForOrganism(organismId: string) {
        return new Promise((resolve, reject) => {
            this.http.get('/api/Organism/GetData/' + organismId).subscribe(result => {
                resolve(result.json());
            });
        });
    }

    getLinkedGenesAll() {
        return new Promise((resolve, reject) => {
            this.http.get('/api/Trait/GetAllPairs').subscribe(result => {
                resolve(result.json());
            });
        });
    }

    getLinkedGenes(organismId: string) {
        return new Promise((resolve, reject) => {
            this.http.get('/api/Trait/Organism=' + organismId).subscribe(result => {
                resolve(result.json());
            });
        });
    }

    getOrganisms() {
        return new Promise((resolve, reject) => {
            this.http.get('/api/Organism/GetAll').subscribe(result => {
                resolve(result.json());
            });
        });
    }

    getInheritanceTypes() {
        return new Promise((resolve, reject) => {
            this.http.get('/api/Inheritance/GetAll').subscribe(result => {
                resolve(result.json().map(i => i.name));
            });
        });
    }
}