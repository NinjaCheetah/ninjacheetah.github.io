// Thanks to Hasse Björk on StackOverflow for this code! It works great for building a ToC on my blog posts.
// Answer: https://stackoverflow.com/a/41085566/13545098

document.addEventListener('DOMContentLoaded', function() {
    htmlTableOfContents();
} );                        

function htmlTableOfContents( documentRef ) {
    var documentRef = documentRef || document;
    var toc = documentRef.getElementById("toc");
    // Not a blog article.
    if (toc === null) {
        return;
    }

    var headings = [].slice.call(documentRef.body.querySelectorAll('.blog-content h1, .blog-content h2, .blog-content h3, .blog-content h4, .blog-content h5, .blog-content h6'));

    // Remove the ToC from the DOM if there aren't headings to build a ToC
    // from in the current article.
    if (headings.length === 0) {
        toc.remove();
        return;
    }

    headings.forEach(function (heading, index) {
        var ref = "toc" + index;
        if ( heading.hasAttribute( "id" ) ) 
            ref = heading.getAttribute( "id" );
        else
            heading.setAttribute( "id", ref );
        
        var div = toc.appendChild( documentRef.createElement( "div" ) );
        div.setAttribute( "class", heading.tagName.toLowerCase() );

        var link = div.appendChild( documentRef.createElement( "a" ) );
        link.setAttribute( "href", "#"+ ref );
        link.textContent = heading.textContent;
    });
}

