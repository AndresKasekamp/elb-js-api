// TODO ürita Maa-ameti DSM/CHM alla tuua?

define(["esri/widgets/ElevationProfile"], (ElevationProfile) => ({
    setupElevationProfile: (view) =>
      new ElevationProfile({
        view: view,
        profiles: [
            {
                type: "ground",
                title: "Maapind"
            },
            {
                type: "view",
                title: "Kihid"
            },
        ],
        // hide the select button
        // this button can be displayed when there are polylines in the
        // scene to select and display the elevation profile for
        visibleElements: {
            selectButton: true
        }
      }),
  }));