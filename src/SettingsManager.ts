

interface DisplaySettings {
    showHeaderTimers: boolean;
    showPlayerTimers: boolean;
    showExtraTimers: boolean;
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
    settings: {
        display: DisplaySettings;
        warning: WarningSettings;
        theming: ThemingSettings;
    };

    constructor() {
        this.settings = {
            display: {
                showHeaderTimers: true,
                showPlayerTimers: true,
                showExtraTimers: true
            },
            warning: {
                enableTimerWarnings: true,
                warningThresholdType: "absolute",
                warningThreshold: 5,
                warningIntensity: "medium"
            },
            theming: {
                themeType: "dark",
                darkTheme: "dark",
                lightTheme: "light",
                availableDarkThemes: ["dark"],
                availableLightThemes: ["light"]
            }
        };
    }

    // If themeType is auto, return darkTheme or lightTheme depending on system theme
    autoTheme(): string {
        // Get the current system theme
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

        // Return the user selected theme that matches the system theme
        if (systemTheme === "dark") {
            return this.settings.theming.darkTheme;
        } else {
            return this.settings.theming.lightTheme;
        }
    }


}