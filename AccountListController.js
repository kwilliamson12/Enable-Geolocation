/*
The client-side controller to handle the onAccountsLoaded and onRowAction actions.
The onAccountsLoaded function handles the c:AccountsLoaded event (as specified in the component markup) and updates
the rows and cols attributes bound to the <lightning:datatable> tag.
event.getParam( 'accounts' ) gets the account records from the event. Remember that the c:AccountsLoaded
event markup declares this attribute and the c:AccountSearch component sets the value when it fires the event.
The onRowAction function handles user interactions with rows of the <lightning:datatable>.
component.find( 'navigation' ) gets a reference to the <lightning:navigation> service component so we can call its methods.
navigation.navigate(..) is a method exposed by the <lightning:navigation> component.
We pass in a JSON options object to navigate to the selected account record page in Lightning Experience.
*/
({
    onAccountsLoaded: function( component, event, helper ) {
        var cols = [
            {
                'label': 'Name',
                'fieldName': 'Name',
                'type': 'text'
            },
            {
                'label': 'Phone',
                'fieldName': 'Phone',
                'type': 'phone'
            },
            {
                'label': 'Website',
                'fieldName': 'Website',
                'type': 'url'
            },
            {
                'label': 'Action',
                'type': 'button',
                'typeAttributes': {
                    'label': 'View details',
                    'name': 'view_details'
                }
            }
        ];
        component.set( 'v.cols', cols );
        component.set( 'v.rows', event.getParam( 'accounts' ) );
    },
    onRowAction: function( component, event, helper ) {
        var action = event.getParam( 'action' );
        var row = event.getParam( 'row' );
        if ( action.name == 'view_details' ) {
            var navigation = component.find( 'navigation' );
            navigation.navigate({
                'type': 'standard__recordPage',
                'attributes': {
                    'objectApiName': 'Account',
                    'recordId': row.Id,
                    'actionName': 'view'
                }
            });
        }
    }
})
