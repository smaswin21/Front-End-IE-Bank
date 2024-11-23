
import { ApplicationInsights } from '@microsoft/applicationinsights-web';

const appInsights = new ApplicationInsights({
    config: {
        connectionString: "InstrumentationKey=df87d74e-a9f4-40b8-80d5-9dd0a591faf4;IngestionEndpoint=https://northeurope-2.in.applicationinsights.azure.com/;LiveEndpoint=https://northeurope.livediagnostics.monitor.azure.com/;ApplicationId=4aa0857a-04b6-4f29-8e3b-61166098a9c6"
    }
});

appInsights.loadAppInsights();
appInsights.trackPageView();

export default appInsights;



// instrumentationKey: String(appInsights.properties.instrumentationKey)
// instrumentationKey: "a4b6380f-bde6-44bb-8417-22e90f2a3f08",

/*
import { ApplicationInsights } from "@microsoft/applicationinsights-web";

async function fetchInstrumentationKey() {
    try {
        const response = await fetch("/api/appinsights"); // Call backend API
        const data = await response.json();
        if (response.ok && data.instrumentationKey) {
            return data.instrumentationKey;
        } else {
            console.error("Failed to fetch instrumentation key:", data.error || "Unknown error");
            return null;
        }
    } catch (error) {
        console.error("Error fetching instrumentation key:", error);
        return null;
    }
}

(async function initializeAppInsights() {
    const instrumentationKey = await fetchInstrumentationKey();
    if (!instrumentationKey) {
        console.warn("Using fallback instrumentation key.");
        return; // Optionally use a fallback key here
    }

    const appInsights = new ApplicationInsights({
        config: {
            instrumentationKey,
            enableAutoRouteTracking: true, // Tracks route changes
        },
    });
    appInsights.loadAppInsights();
    appInsights.trackPageView(); // Tracks initial page load
})();

export default appInsights;
*/