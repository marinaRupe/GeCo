import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ILinkedGenes, ITrait } from "./shared/types";

@Injectable()
export class GeneticDataService {
    http: Http;
    data: {};

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

    getAllData() {
        return new Promise((resolve, reject) => {
            this.getOrganisms().then((result) => {
                let organisms = <any>result;
                let thisObj = this;
                this.data = {};

                var promises = [];
                for (var i = 0; i < organisms.length; i++) {
                    var promise = this.getDataOrganismId(organisms[i].id);
                    promises.push(promise);
                }

                Promise.all(promises).then((values) => {
                    values.forEach(v => {
                        for (let i = 0; i < organisms.length; i++) {
                            if (organisms[i].id === v[0]) {
                                this.data[organisms[i].name] = v[1].characteristics;
                            }
                        }  
                    });
                    resolve(this.data);
                });
            });
        });
    }

    private getDataOrganismId(organismId: string) {
        return new Promise((resolve, reject) => {
            this.http.get('/api/Organism/GetData2/' + organismId).subscribe(result => {
                resolve([organismId, result.json()]);
            });
        });
    }

    getDataForOrganism(organismId: string) {
        return new Promise((resolve, reject) => {
            this.http.get('/api/Organism/GetData2/' + organismId)
                .subscribe(result => {
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