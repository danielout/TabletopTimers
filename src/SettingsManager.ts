const CURRENT_SETTINGS_VERSION = 1;

interface DisplaySettings {
    showBigTimer: boolean;
    showPlayerTimers: boolean;
    showExtraTimer: boolean;
}

interface WarningSettings {
    enableTimerWarnings: boolean;
    warningThresholdType: "absolute" | "relative";
    warningThreshold: number;
    warningIntensity: "low" | "medium" | "high";
}

interface ThemingSettings {
    themeType: "light" | "dark" | "auto";
    darkTheme: string;
    lightTheme: string;
    availableDarkThemes: string[];
    availableLightThemes: string[];
}


export class SettingsManager {
    display: DisplaySettings;
    warning: WarningSettings;
    theming: ThemingSettings;
    settingsVersion: number = CURRENT_SETTINGS_VERSION;


    constructor() {
        this.display = {
            showBigTimer: true,
            showPlayerTimers: true,
            showExtraTimer: true
        }
        this.warning = {
            enableTimerWarnings: true,
            warningThresholdType: "absolute",
            warningThreshold: 5,
            warningIntensity: "medium"
        }
        this.theming = {
            themeType: "dark",
            darkTheme: "dark",
            lightTheme: "light",
            availableDarkThemes: ["dark"],
            availableLightThemes: ["light"]
        }

    }

    // If themeType is auto, return darkTheme or lightTheme depending on system theme
    autoTheme(): string {
        // Get the current system theme
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

        // Return the user selected theme that matches the system theme
        if (systemTheme === "dark") {
            return this.theming.darkTheme;
        } else {
            return this.theming.lightTheme;
        }
    }


}