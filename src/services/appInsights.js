import { ApplicationInsights } from '@microsoft/applicationinsights-web';

const appInsights = new ApplicationInsights({
    config: {
        instrumentationKey: String(appInsights.properties.instrumentationKey)
        // instrumentationKey: "a4b6380f-bde6-44bb-8417-22e90f2a3f08",
    },
});

appInsights.loadAppInsights();
appInsights.trackPageView();

export default appInsights;
