import { LightningElement, api ,track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
    const actions = [
    { label: 'Show details', name: 'show_details' },
    { label: 'Edit', name: 'Edit'},
    ];
    const columns = [
    { label: 'Contact', fieldName: 'Name' },
    { label: 'ContactId', fieldName: 'Id' },
    {
        type: 'action',
        typeAttributes: { rowActions: actions },
    }
    ];
    export default class DataTableMap extends NavigationMixin(LightningElement) {
    @api keyvalue;
    @api map;
    @track columns = columns;
    @track List = [];
        connectedCallback() {
        this.List = this.map[this.keyvalue];
    }
    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        const recordid = row.Id;
        switch (actionName) {
            case 'Edit':
                    this.navigateToEdit(recordid);
                    break;
            case 'show_details':
                    this.navigateToContact(recordid);
                break;
            default:
        }
    }
    
    navigateToContact(id) {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: id,
                objectApiName: 'Contact',
                actionName: 'view'
            }
        });
    }

    navigateToEdit(id) {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: id,
                objectApiName: 'Contact',
                actionName: 'edit'
            }
        });
    }
}