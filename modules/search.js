// TODO proovi CORS localil lahendada
// TODO kas custom search peabki selline välja nägema?
// TODO muuda kasti natuke suuremaks


define([
  "esri/widgets/Search",
  "esri/widgets/Search/SearchSource",
  "esri/Graphic",
  "esri/geometry/Point",
  "esri/request",
  "esri/geometry/geometryEngine",
], (Search, SearchSource, Graphic, Point, esriRequest, geometryEngine) => ({
  setupCustomSearchSource: (url) =>
    new SearchSource({
      placeholder: "Find address with IN-ADS API",
      // Provide a getSuggestions method
      // to provide suggestions to the Search widget
      getSuggestions: (params) => {
        const keyword = params.suggestTerm; // keyword input by user
        const suggestUrl = `${url}?address=${encodeURIComponent(keyword)}`;
        return esriRequest(suggestUrl, { responseType: "json" }).then(
          (results) => {
            // Return Suggestion results to display
            // in the Search widget
            return results.data.addresses.map((address) => {
              return {
                text: address.pikkaadress,
                magicKey: address.unik,
              };
            });
          }
        );
      },

      //Provide a getResults method to find
      //results from the suggestions
      getResults: (params) => {
        const key = params.suggestResult.text; // keyword input by user
        const newUrl = `${url}?address=${encodeURIComponent(key)}`;
        return esriRequest(newUrl, {
          responseType: "json",
        }).then((results) => {
          // Parse the results of your custom search

          const searchResults = results.data.addresses.map((address) => {
            const graphic = new Graphic({
              geometry: new Point({
                x: address.viitepunkt_l,
                y: address.viitepunkt_b,
              }),
            });
            //Optionally,provide an extent for a point result, so the view can zoom to it
            const buffer = geometryEngine.geodesicBuffer(
              graphic.geometry,
              30,
              "meters"
            );
            // Return a Search Result
            const searchResult = {
              extent: buffer.extent,
              feature: graphic,
              //name: address.pikkaadress,
              name: `${address.pikkaadress}\n(ads_oid=${address.ads_oid})`,
            };

            return searchResult;
          });

          // Return an array of Search Results
          return searchResults;
        });
      },
    }),

  setupSearchWidget: (view, sources) =>
    new Search({
      view: view,
      sources: [sources],
      includeDefaultSources: false,
    }),
}));
