/*
the client-side helper to call the server-side controller to perform the search.
The helper will also fire the c:AccountsLoaded event to notify other components of the search results
component.get( "c.searchAccounts" ) gets a reference to a server-side action—an @AuraEnabled method named searchAccounts.
The Apex method must belong to the controller specified on the <aura:component> tag.
action.setParams(..) takes a JSON object whose keys match the name and type of the Apex method’s parameters.
action.setCallback(..) provides the JavaScript callback function to handle the asynchronous response from the server-side
action. This callback fires the AccountsLoaded event passing the account search results.
response.getReturnValue() is the value returned by the Apex method, automatically serialized as JSON.
$A.enqueueAction(..) adds the server-side controller action to the queue of actions to be executed
*/
({
    // code in the helper is reusable by both
    // the controller.js and helper.js files
    handleSearch: function( component, searchTerm ) {
        var action = component.get( "c.searchAccounts" );
        action.setParams({
            searchTerm: searchTerm
        });
        action.setCallback( this, function( response ) {
            var event = $A.get( "e.c:AccountsLoaded" );
            event.setParams({
                "accounts": response.getReturnValue()
            });
            event.fire();
        });
        $A.enqueueAction( action );
    }
})
