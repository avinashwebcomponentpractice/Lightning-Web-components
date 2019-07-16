import { LightningElement, track } from 'lwc';
import getAccountList from '@salesforce/apex/ContactController.getAccountList';
import getAccountContactList from '@salesforce/apex/ContactController.getAccountContactList';

export default class LightningExampleAccordionMultiple extends LightningElement {
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
}
