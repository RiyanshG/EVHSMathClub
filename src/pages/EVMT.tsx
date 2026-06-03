import React from 'react';
import { Link } from 'react-router-dom';

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
          <p className="text-lg mb-6">
            More details to come next year, stay tuned.
          </p>

          <Link
            to="/archive"
            className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Check out the archive page for previous problems, solutions, and guides
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EVMT;
