
import { ApplicationInsights } from '@microsoft/applicationinsights-web';

const appInsights = new ApplicationInsights({
    config: {
        // instrumentationKey: String(appInsights.properties.instrumentationKey)
        instrumentationKey: "532343d3-c1a8-4586-b58c-73517225c5ac",
    },
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