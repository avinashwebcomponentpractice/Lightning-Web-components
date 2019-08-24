import { LightningElement, track } from 'lwc';
import getAccountList from '@salesforce/apex/ContactController.getAccountList';
import getAccountContactList from '@salesforce/apex/ContactController.getAccountContactList';
import { NavigationMixin } from 'lightning/navigation';
 
export default class LightningExampleAccordionMultiple extends NavigationMixin(LightningElement) {
 
    @track activeSections = [];
    @track activeSectionsMessage = '';
    @track Accounts;
    @track error;
    @track data ;

    connectedCallback() {
        // initialize component
        getAccountList()
        .then(result => {
            this.Accounts = result;
            this.error = undefined;
        })
        .catch(error => {
            this.error = error;
            this.contacts = undefined;
        });
        getAccountContactList()
        .then(result => {
            this.data = result;
            console(result);
        })
        .catch(error => {
            this.error = error;
            this.data = undefined;
        });
        
    }

    handleSectionToggle(event) {
        const openSections = event.detail.openSections;

        if (openSections.length === 0) {
            this.activeSectionsMessage = 'All sections are closed';
        } else {
            this.activeSectionsMessage =
                'Open sections: ' + openSections.join(', ');
        }
    }
    handlemenu(event){
        const actionName = event.detail.value;
        const record = event.target.id;
        const recordid = record.split('-')[0];
        switch (actionName) {
            case 'Edit':
                    this.navigateToEdit(recordid);
                    break;
            case 'show_details':
                    this.navigateToAccount(recordid);
                break;
            case 'New':
                    this.navigateToNewAccount(recordid);
                break;
            default:
        }
    }
    navigateToAccount(id) {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: id,
                objectApiName: 'Account',
                actionName: 'view'
            }
        });
    }
    navigateToNewAccount() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Account',
                actionName: 'new'
            }
        });
    }

    navigateToEdit(id) {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: id,
                objectApiName: 'Account',
                actionName: 'edit'
            }
        });
    }
}