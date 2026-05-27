import React from 'react';

const EVMT = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">EVMT</h1>
          <p className="text-muted-foreground text-lg">
            Evergreen Valley Math Tournament
          </p>
        </div>

        <div className="p-6 border rounded-lg shadow-sm bg-card text-card-foreground">
          <h2 className="text-2xl font-semibold mb-6">Event Details</h2>
          
          <ul className="space-y-4 text-lg mb-8">
            <li className="flex items-center gap-2">
              <span className="font-semibold w-24">Date:</span> 
              <span>Saturday, May 30</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="font-semibold w-24">Time:</span> 
              <span>9:00 AM - 12:00 PM</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="font-semibold w-24">Eligibility:</span> 
              <span>Grades 4-8</span>
            </li>
          </ul>

          <a
            href="https://forms.gle/1enNhr8hk3m5U8Gy5"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Sign Up Form
          </a>
        </div>
      </div>
    </div>
  );
};

export default EVMT;