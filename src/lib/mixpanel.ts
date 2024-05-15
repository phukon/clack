import mixpanel from "mixpanel-browser";

export class MixpanelTracking {
  private static _instance: MixpanelTracking;

  public static getInstance(): MixpanelTracking {
    if (MixpanelTracking._instance == null) {
      return (MixpanelTracking._instance = new MixpanelTracking());
    }
    return this._instance;
  }

  public constructor() {
    if (MixpanelTracking._instance) {
      throw new Error(
        "Error: Instance creation of MixpanelTracking not allowed. Use Mixpanel.getInstance instead."
      );
    }


    // problems with using env variable. hence hardcoding
    mixpanel.init('9a3320d1e1f35b87935e3ff42211dbe5', {
      debug: true,
      track_pageview: true,
      persistence: "localStorage",
    });
  }

  public trackEvent(name: string, data: object = {}) {
    mixpanel.track(name, data);
  }
}
