/*
 *The client-side controller to handle the onAccountsLoaded action.
The onAccountsLoaded function handles the c:AccountsLoaded event (as specified in the component markup)
and updates the mapMarkers attribute bound to the <lightning:map> tag.
event.getParam( 'accounts' ) gets the account records from the event.
The c:AccountsLoaded event markup declares this attribute and the c:AccountSearch component sets the value when
it fires the event  
*/
({
    onAccountsLoaded: function( component, event, helper ) {
        var mapMarkers = [];
        var accounts = event.getParam( 'accounts' );
        for ( var i = 0; i < accounts.length; i++ ) {
            var account = accounts[i];
            var marker = {
                'location': {
                    'Street': account.BillingStreet,
                    'City': account.BillingCity,
                    'PostalCode': account.BillingPostalCode
                },
                'title': account.Name,
                'description': (
                    'Phone: ' + account.Phone +
                    '<br/>' +
                    'Website: ' + account.Website
                ),
                'icon': 'standard:location'
            };
            mapMarkers.push( marker );
        }
        component.set( 'v.mapMarkers', mapMarkers );
    }
})
