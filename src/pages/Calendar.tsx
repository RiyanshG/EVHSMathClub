import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, ExternalLink } from "lucide-react";

/**
 * ============================================================================
 * HOW TO CONNECT THIS PAGE TO YOUR GOOGLE CALENDAR
 * ============================================================================
 *
 * 1. GO TO YOUR GOOGLE CALENDAR SETTINGS:
 *    - Open Google Calendar (calendar.google.com)
 *    - Click the gear icon (Settings) in the top right
 *    - Click "Settings"
 *
 * 2. FIND YOUR CALENDAR ID:
 *    - In the left sidebar, click on the calendar you want to embed
 *      (under "Settings for my calendars")
 *    - Scroll down to "Integrate calendar"
 *    - Copy the "Calendar ID" - it looks like:
 *      - For personal calendars: your-email@gmail.com
 *      - For created calendars: abc123xyz@group.calendar.google.com
 *
 * 3. MAKE YOUR CALENDAR PUBLIC (required for embedding):
 *    - In the same calendar settings, scroll to "Access permissions for events"
 *    - Check "Make available to public"
 *    - Choose "See all event details" for full visibility
 *
 * 4. UPDATE THE CALENDAR_ID BELOW:
 *    - Replace the placeholder string with your actual Calendar ID
 *
 * Example:
 *   const CALENDAR_ID = "evhsmathclub@gmail.com";
 *   or
 *   const CALENDAR_ID = "c_abc123xyz@group.calendar.google.com";
 *
 * ============================================================================
 */

// Replace this with your actual Google Calendar ID
const CALENDAR_ID = "YOUR_CALENDAR_ID_HERE";

// Customize the calendar appearance
const CALENDAR_CONFIG = {
  // Show week numbers? 0 = no, 1 = yes
  showWeekNumbers: 0,
  // Show calendar title? 0 = no, 1 = yes
  showTitle: 0,
  // Show navigation buttons? 0 = no, 1 = yes
  showNav: 1,
  // Show date? 0 = no, 1 = yes
  showDate: 1,
  // Show print icon? 0 = no, 1 = yes
  showPrint: 0,
  // Show tabs (day/week/month)? 0 = no, 1 = yes
  showTabs: 1,
  // Show calendar list? 0 = no, 1 = yes
  showCalendars: 0,
  // Default view: "WEEK", "MONTH", or "AGENDA"
  defaultView: "MONTH",
  // Timezone (optional, e.g., "America/Los_Angeles")
  timezone: "America/Los_Angeles",
};

const Calendar = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const isPlaceholder = CALENDAR_ID === "YOUR_CALENDAR_ID_HERE";

  // Build the Google Calendar embed URL
  const calendarUrl = `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(CALENDAR_ID)}&ctz=${CALENDAR_CONFIG.timezone}&showTitle=${CALENDAR_CONFIG.showTitle}&showNav=${CALENDAR_CONFIG.showNav}&showDate=${CALENDAR_CONFIG.showDate}&showPrint=${CALENDAR_CONFIG.showPrint}&showTabs=${CALENDAR_CONFIG.showTabs}&showCalendars=${CALENDAR_CONFIG.showCalendars}&showTz=0&mode=${CALENDAR_CONFIG.defaultView}&wkst=1`;

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Calendar</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Stay up to date with upcoming Math Club meetings, competitions, and events.
        </p>
      </div>

      {/* Calendar Section */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          {isPlaceholder ? (
            /* Placeholder state - shown when calendar ID hasn't been configured */
            <div className="flex flex-col items-center justify-center py-16 px-8 text-center space-y-6 bg-muted/30">
              <div className="p-4 rounded-full bg-primary/10">
                <CalendarDays className="h-12 w-12 text-primary" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-foreground">
                  Calendar Coming Soon
                </h2>
                <p className="text-muted-foreground max-w-md">
                  Our Google Calendar integration is being set up. Check back soon to see
                  upcoming Math Club events, meetings, and competition dates.
                </p>
              </div>
              <div className="pt-4 text-sm text-muted-foreground">
                <p>In the meantime, follow our announcements for event updates.</p>
              </div>
            </div>
          ) : (
            /* Calendar embed - shown when calendar ID is configured */
            <div className="relative">
              {/* Loading state */}
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-muted/50 z-10">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    <p className="text-sm text-muted-foreground">Loading calendar...</p>
                  </div>
                </div>
              )}

              {/* Error state */}
              {hasError && (
                <div className="flex flex-col items-center justify-center py-16 px-8 text-center space-y-4">
                  <p className="text-muted-foreground">
                    Unable to load the calendar. Please try again later.
                  </p>
                  <a
                    href={`https://calendar.google.com/calendar/embed?src=${encodeURIComponent(CALENDAR_ID)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:underline"
                  >
                    Open in Google Calendar
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              )}

              {/* Google Calendar iframe */}
              {!hasError && (
                <iframe
                  src={calendarUrl}
                  className="w-full h-[600px] border-0"
                  onLoad={handleIframeLoad}
                  onError={handleIframeError}
                  title="EVHS Math Club Calendar"
                />
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* External link to Google Calendar */}
      {!isPlaceholder && (
        <div className="text-center">
          <a
            href={`https://calendar.google.com/calendar/embed?src=${encodeURIComponent(CALENDAR_ID)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Open calendar in new tab
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      )}
    </div>
  );
};

export default Calendar;
