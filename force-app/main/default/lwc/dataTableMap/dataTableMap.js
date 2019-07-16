import { LightningElement, api ,track } from 'lwc';
const columns = [
    { label: 'Account', fieldName: 'Name' },
    { label: 'AccountId', fieldName: 'Id' }
];
export default class DataTableMap extends LightningElement {
@api keyvalue;
@api map;
 @track columns = columns;
@track List = [];
     connectedCallback() {
        this.List = this.map[this.keyvalue];
    }
}