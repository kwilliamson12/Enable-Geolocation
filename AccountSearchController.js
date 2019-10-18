/*
 *The client-side controller to handle the onInit and onSearchTermChange actions
component.get( "v.searchTerm" ) gets the user’s search term—the text value bound to the <lightning:input> tag.
The helper.handleSearch(component, searchTerm) function encapsulates the call to the server-side controller to
perform the search. Using Helper functions to promote JavaScript code reuse within a component bundle.
*/
({
    onInit: function( component, event, helper ) {
        // proactively search on component initialization
        var searchTerm = component.get( "v.searchTerm" );
        helper.handleSearch( component, searchTerm );
    },
    onSearchTermChange: function( component, event, helper ) {
        // search anytime the term changes
        var searchTerm = component.get( "v.searchTerm" );
        // to improve performance, particularly for fast typers,
        // we wait a small delay to check when user is done typing
        var delayMillis = 500;
        // get timeout id of pending search action
        var timeoutId = component.get( "v.searchTimeoutId" );
        // cancel pending search action and reset timer
        clearTimeout( timeoutId );
        // delay doing search until user stops typing
        // this improves client-side and server-side performance
        timeoutId = setTimeout( $A.getCallback( function() {
            helper.handleSearch( component, searchTerm );
        }), delayMillis );
        component.set( "v.searchTimeoutId", timeoutId );
    }
})
