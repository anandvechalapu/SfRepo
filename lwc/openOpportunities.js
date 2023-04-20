import { LightningElement, wire, track } from 'lwc';
import { getOpenOpportunities } from '@salesforce/apex/OpportunityController.getOpenOpportunities';

export default class OpenOpportunities extends LightningElement {
    @track openOpportunities;
    @track searchKey;
    @track currentPage = 1;
    @track pageSize = 10;
    @track totalRecords;
    @track sortBy = 'Name';
    @track sortDirection = 'asc';

    @wire(getOpenOpportunities, { searchKey: '$searchKey', pageSize: '$pageSize', currentPage: '$currentPage', sortBy: '$sortBy', sortDirection: '$sortDirection' })
    wiredOpportunities({ error, data }) {
        if (data) {
            this.openOpportunities = data;
            this.totalRecords = data.length;
        } else if (error) {
            this.openOpportunities = undefined;
            this.totalRecords = 0;
        }
    }

    handleKeyChange(event) {
        this.searchKey = event.target.value;
    }

    handlePrevious() {
        if (this.currentPage > 1) {
            this.currentPage = this.currentPage - 1;
        }
    }

    handleNext() {
        if ((this.currentPage * this.pageSize) < this.totalRecords) {
            this.currentPage = this.currentPage + 1;
        }
    }

    handleSort(event) {
        const { fieldName: sortBy, sortDirection } = event.detail;
        this.sortBy = sortBy;
        this.sortDirection = sortDirection;
    }
}