import { sp } from "@pnp/sp/presets/all";
sp.setup({
    spfxContext: this.context
});
var pageSize = 10; // Number of items to retrieve per page
var skip = 0; // Number of items to skip, initialized to 0 for the first page
function retrieveDocuments(pageNumber) {
    var _this = this;
    skip = (pageNumber - 1) * pageSize; // Calculate the number of items to skip based on the current page number
    sp.web.lists.getByTitle("YourDocumentLibrary").items
        .select("Title", "numero", "FileDirRef", "FileLeafRef", "FileRef")
        .top(pageSize) // Number of items to retrieve per page
        .skip(skip) // Number of items to skip
        .getPaged() // Retrieve paged results
        .filter()
        .then(function (pagedItems) {
        pagedItems.results.forEach(function (item) {
            console.log(item.Title); // Access the Title field
            console.log(item.OtherField); // Access another custom field
            console.log(item.FileDirRef); // Path to the directory of the file
            console.log(item.FileLeafRef); // File name
            console.log(_this.context.pageContext.web.absoluteUrl + item.FileRef); // URL of the file
        });
        // Check if there are more items to fetch
        if (pagedItems.hasNext) {
            // Call the function recursively for the next page
            retrieveDocuments(pageNumber + 1);
        }
    })
        .catch(function (error) {
        console.error(error);
    });
}
// Call the function for the first page
retrieveDocuments(1);
//# sourceMappingURL=teste.js.map