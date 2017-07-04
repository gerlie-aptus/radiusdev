import { Component } from '@angular/core';

@Component({
    selector: 'messages',
    templateUrl: '../elements/messages.html'
})

export class Messages {
    info: string;

    constructor() {
        this.info = 'testttt';
    }

    setInfo(infoVal: string){
        this.info = infoVal;
        console.log(this.info);
    }

}

