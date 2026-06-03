import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Calendar, Users, BookOpen, Trophy, ExternalLink } from "lucide-react";

import 'katex/dist/katex.min.css';
// Keeping the import even though we aren't rendering Latex right now, 
// in case you add a Latex problem back later.
import Latex from "react-latex-next"; 

const ANIMATION_STORAGE_KEY = "evhs-math-club-animation-disabled";

/**
 * Lightweight, self-contained Matter.js canvas used in the hero's animation area.
 * - no SSR assumptions (dynamic import of matter-js)
 * - crisp on HiDPI
 * - responsive to container size
 * - mouse/touch drag enabled
 * - cursor repulsion effect
 * - tap/click explosion effect
 * - freeze mode: when disabled, physics stops but visuals remain
 */
function PhysicsAnimation({ disabled }: { disabled: boolean }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const disabledRef = useRef(disabled);
  const runnerRef = useRef<any>(null);
  const timerRef = useRef<number | null>(null);

  // Keep the ref in sync with prop
  useEffect(() => {
    disabledRef.current = disabled;
    
    // Pause or resume the runner based on disabled state
    if (runnerRef.current) {
      runnerRef.current.enabled = !disabled;
    }
  }, [disabled]);

  useEffect(() => {
    let engine: any, render: any;
    let walls: any[] = [];
    let ramps: any[] = [];
    let allBalls: any[] = [];
    let destroyed = false;
    
    // Track mouse/touch position for repulsion
    let mousePos = { x: -1000, y: -1000 };
    const REPULSION_RADIUS = 100;
    const REPULSION_STRENGTH = 0.008;

    const setup = async () => {
      const Matter = await import("matter-js");
      const { Engine, Render, Runner, Bodies, Body, World, Events } = Matter;

      if (!mountRef.current) return;
      const container = mountRef.current;
      const rect = container.getBoundingClientRect();

      engine = Engine.create({ gravity: { x: 0, y: 1.0 } });

      render = Render.create({
        element: container,
        engine,
        options: {
          width: Math.max(320, Math.floor(rect.width)),
          height: Math.max(260, Math.floor(rect.height)),
          wireframes: false,
          background: "transparent",
          pixelRatio: window.devicePixelRatio || 1,
        },
      });

      const COLORS = ["#f97316", "#f59e0b", "#fbbf24", "#fde68a", "#0f2940"];
      const rand = (min: number, max: number) => Math.random() * (max - min) + min;
      const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

      const makeBall = (x: number, y: number) => {
        const ball = Bodies.circle(x, y, rand(8, 18), {
          restitution: 0.45,
          friction: 0.001,
          frictionAir: 0.01,
          render: {
            fillStyle: pick(COLORS),
            strokeStyle: "rgba(0,0,0,0.06)",
            lineWidth: 1,
          },
        });
        allBalls.push(ball);
        return ball;
      };

      const mkWalls = (W: number, H: number) => {
        walls = [];
        World.add(engine.world, walls);
      };

      const rampStyle = {
        isStatic: true,
        chamfer: { radius: 6 },
        render: {
          fillStyle: "transparent",
          strokeStyle: "#ffffff",
          lineWidth: 3,
        },
      };

      const mkRamps = (W: number, H: number) => {
        const a1 = -0.2;
        const a2 = +0.17;
        const a3 = -0.26;

        const r1 = Bodies.rectangle(W * 0.66, H * 0.22, W * 0.5, 12, {
          ...rampStyle,
          angle: a1,
        });
        const r2 = Bodies.rectangle(W * 0.32, H * 0.55, W * 0.56, 12, {
          ...rampStyle,
          angle: a2,
        });
        const r3 = Bodies.rectangle(W * 0.6, H * 0.86, W * 0.82, 12, {
          ...rampStyle,
          angle: a3,
        });

        ramps = [r1, r2, r3];
        World.add(engine.world, ramps);
      };

      const W = render.options.width;
      const H = render.options.height;
      mkWalls(W, H);
      mkRamps(W, H);

      const initial = 5;
      const balls = Array.from({ length: initial }, () =>
        makeBall(rand(W * 0.8, W * 0.28), rand(-40, H * 0.05))
      );
      World.add(engine.world, balls);

      balls.forEach((b) => Body.setAngularVelocity(b, rand(-0.05, 0.05)));

      // Infinite ball spawning - remove balls that fall off screen and spawn new ones
      const MAX_BALLS = 50;
      timerRef.current = window.setInterval(() => {
        if (destroyed || disabledRef.current) return;
        
        // Remove balls that have fallen off the bottom
        const toRemove = allBalls.filter((ball) => ball.position.y > H + 100);
        toRemove.forEach((ball) => {
          World.remove(engine.world, ball);
          const idx = allBalls.indexOf(ball);
          if (idx > -1) allBalls.splice(idx, 1);
        });
        
        // Spawn new balls if under the limit
        if (allBalls.length < MAX_BALLS) {
          const b = makeBall(rand(W * 0.9, W * 0.22), -30);
          World.add(engine.world, b);
        }
      }, 700);

      // Cursor repulsion effect - applied every physics tick
      Events.on(engine, "beforeUpdate", () => {
        if (disabledRef.current || mousePos.x < 0) return;
        
        allBalls.forEach((ball) => {
          const dx = ball.position.x - mousePos.x;
          const dy = ball.position.y - mousePos.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < REPULSION_RADIUS && distance > 0) {
            const force = (REPULSION_RADIUS - distance) / REPULSION_RADIUS * REPULSION_STRENGTH;
            const fx = (dx / distance) * force;
            const fy = (dy / distance) * force;
            Body.applyForce(ball, ball.position, { x: fx, y: fy });
          }
        });
      });

      // Explosion effect on click/tap
      const triggerExplosion = (x: number, y: number) => {
        if (disabledRef.current) return;
        
        const EXPLOSION_RADIUS = 150;
        const EXPLOSION_STRENGTH = 0.15;
        
        allBalls.forEach((ball) => {
          const dx = ball.position.x - x;
          const dy = ball.position.y - y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < EXPLOSION_RADIUS && distance > 0) {
            const force = (EXPLOSION_RADIUS - distance) / EXPLOSION_RADIUS * EXPLOSION_STRENGTH;
            const fx = (dx / distance) * force;
            const fy = (dy / distance) * force;
            Body.applyForce(ball, ball.position, { x: fx, y: fy });
          }
        });
      };

      // Pointer/touch event handlers with proper coordinate mapping
      // Account for CSS size vs canvas internal size scaling
      const getCanvasCoords = (clientX: number, clientY: number) => {
        if (!render.canvas) return { x: -1000, y: -1000 };
        const canvasRect = render.canvas.getBoundingClientRect();
        // Map from CSS pixel space to canvas logical space
        const scaleX = render.options.width / canvasRect.width;
        const scaleY = render.options.height / canvasRect.height;
        return {
          x: (clientX - canvasRect.left) * scaleX,
          y: (clientY - canvasRect.top) * scaleY,
        };
      };

      // Track if last interaction was touch to prevent ghost clicks
      let lastTouchTime = 0;

      // --- Pointer Events (unified mouse + touch on supported browsers) ---
      const handlePointerMove = (e: PointerEvent) => {
        if (disabledRef.current) return;
        mousePos = getCanvasCoords(e.clientX, e.clientY);
      };

      const handlePointerLeave = () => {
        mousePos = { x: -1000, y: -1000 };
      };

      const handlePointerDown = (e: PointerEvent) => {
        if (disabledRef.current) return;
        // For touch, track time to prevent duplicate click
        if (e.pointerType === "touch") {
          lastTouchTime = Date.now();
        }
        const coords = getCanvasCoords(e.clientX, e.clientY);
        mousePos = coords;
        triggerExplosion(coords.x, coords.y);
      };

      const handlePointerUp = (e: PointerEvent) => {
        // Reset mouse position when pointer is released (especially for touch)
        if (e.pointerType === "touch") {
          mousePos = { x: -1000, y: -1000 };
        }
      };

      // --- Fallback click handler (filtered to avoid double-fire after touch) ---
      const handleClick = (e: MouseEvent) => {
        if (disabledRef.current) return;
        // Skip if this click is a ghost click following a touch event
        if (Date.now() - lastTouchTime < 500) return;
        const coords = getCanvasCoords(e.clientX, e.clientY);
        triggerExplosion(coords.x, coords.y);
      };

      // --- Touch-specific handlers for browsers with limited pointer event support ---
      const handleTouchMove = (e: TouchEvent) => {
        if (disabledRef.current) return;
        if (e.touches.length > 0) {
          mousePos = getCanvasCoords(e.touches[0].clientX, e.touches[0].clientY);
        }
      };

      const handleTouchEnd = () => {
        mousePos = { x: -1000, y: -1000 };
      };

      const handleTouchStart = (e: TouchEvent) => {
        if (disabledRef.current) return;
        lastTouchTime = Date.now();
        if (e.touches.length > 0) {
          const coords = getCanvasCoords(e.touches[0].clientX, e.touches[0].clientY);
          mousePos = coords;
          triggerExplosion(coords.x, coords.y);
        }
      };

      // Attach event listeners - use pointer events as primary, with touch fallbacks
      const canvas = render.canvas;
      
      // Pointer events (modern browsers, including mobile)
      canvas.addEventListener("pointermove", handlePointerMove);
      canvas.addEventListener("pointerleave", handlePointerLeave);
      canvas.addEventListener("pointerdown", handlePointerDown);
      canvas.addEventListener("pointerup", handlePointerUp);
      canvas.addEventListener("pointercancel", handlePointerLeave);
      
      // Click fallback for mouse (filtered to avoid double-fire)
      canvas.addEventListener("click", handleClick);
      
      // Touch fallbacks for older browsers
      canvas.addEventListener("touchmove", handleTouchMove, { passive: true });
      canvas.addEventListener("touchend", handleTouchEnd);
      canvas.addEventListener("touchstart", handleTouchStart, { passive: true });
      
      // Ensure touch-action allows our handlers to work
      canvas.style.touchAction = "none";

      const resize = () => {
        if (!mountRef.current) return;
        const { width, height } = mountRef.current.getBoundingClientRect();
        const newW = Math.max(320, Math.floor(width));
        const newH = Math.max(260, Math.floor(height));

        render.options.width = newW;
        render.options.height = newH;
        render.canvas.width = newW * (window.devicePixelRatio || 1);
        render.canvas.height = newH * (window.devicePixelRatio || 1);
        render.canvas.style.width = `${newW}px`;
        render.canvas.style.height = `${newH}px`;
        Render.setPixelRatio(render, window.devicePixelRatio || 1);

        if (walls.length) World.remove(engine.world, walls);
        if (ramps.length) World.remove(engine.world, ramps);
        mkWalls(newW, newH);
        mkRamps(newW, newH);
      };

      window.addEventListener("resize", resize);

      Render.run(render);
      const runner = Runner.create();
      runnerRef.current = runner;
      // Set initial enabled state based on current disabled prop
      runner.enabled = !disabledRef.current;
      Runner.run(runner, engine);

      return () => {
        window.removeEventListener("resize", resize);
        if (timerRef.current) window.clearInterval(timerRef.current);
        // Remove pointer events
        canvas.removeEventListener("pointermove", handlePointerMove);
        canvas.removeEventListener("pointerleave", handlePointerLeave);
        canvas.removeEventListener("pointerdown", handlePointerDown);
        canvas.removeEventListener("pointerup", handlePointerUp);
        canvas.removeEventListener("pointercancel", handlePointerLeave);
        canvas.removeEventListener("click", handleClick);
        // Remove touch fallbacks
        canvas.removeEventListener("touchmove", handleTouchMove);
        canvas.removeEventListener("touchend", handleTouchEnd);
        canvas.removeEventListener("touchstart", handleTouchStart);
        try {
          Runner.stop(runner);
          Render.stop(render);
          if (render?.canvas && render.canvas.parentNode)
            render.canvas.parentNode.removeChild(render.canvas);
          Engine.clear(engine);
        } catch {}
      };
    };

    let cleanup: (() => void) | undefined;
    (async () => (cleanup = await setup()))();

    return () => {
      destroyed = true;
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <div ref={mountRef} className="relative w-full h-[420px] lg:h-[520px] cursor-pointer" />
  );
}

const Home = () => {
  const [animationDisabled, setAnimationDisabled] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(ANIMATION_STORAGE_KEY) === "true";
    }
    return false;
  });

  const toggleAnimation = () => {
    const newValue = !animationDisabled;
    setAnimationDisabled(newValue);
    localStorage.setItem(ANIMATION_STORAGE_KEY, String(newValue));
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>

        {/* BACKGROUND GLOWS */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Glow 1 */}
          <div className="absolute top-20 left-20">
            <div className="w-72 h-72 rounded-full overflow-hidden">
              <div className="w-full h-full bg-primary/20 blur-3xl animate-float" />
            </div>
          </div>

          {/* Glow 2 */}
          <div className="absolute bottom-20 right-20">
            <div className="w-96 h-96 rounded-full overflow-hidden">
              <div
                className="w-full h-full bg-accent/20 blur-3xl animate-float"
                style={{ animationDelay: "2s" }}
              />
            </div>
          </div>

          {/* Glow 3 */}
          <div className="absolute top-1/2 left-[46%] -translate-x-1/2 -translate-y-1/2">
            <div className="w-[600px] h-[600px] rounded-full overflow-hidden">
              <div
                className="w-full h-full bg-cyan-500/10 blur-3xl animate-float"
                style={{ animationDelay: "4s" }}
              />
            </div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-slide-up">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-primary bg-clip-text text-transparent leading-tight">
                EVHS<span className="block">Math Club</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                Join us in exploring mathematics through competitions,
                problem-solving, and collaborative learning.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://discord.gg/HeAM7TYV2y"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    className="bg-gradient-primary hover:shadow-glow-purple transition-all duration-300 text-white font-semibold px-8 py-4 text-lg"
                  >
                    Join Our Discord
                    <ExternalLink className="ml-2 h-5 w-5" />
                  </Button>
                </a>
                <Link to="/resources">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-primary/30 hover:border-primary hover:bg-primary/10 hover:text-primary transition-all duration-300 px-8 py-4 text-lg"
                  >
                    View Resources
                  </Button>
                </Link>
              </div>
            </div>

            {/* Animation Area w/ Matter.js */}
            <div
              className="hidden lg:block lg:order-last animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="relative">
                <PhysicsAnimation disabled={animationDisabled} />
                <label className="absolute bottom-2 right-2 flex items-center gap-2 text-xs text-muted-foreground/70 hover:text-muted-foreground cursor-pointer select-none bg-background/50 backdrop-blur-sm rounded px-2 py-1">
                  <input
                    type="checkbox"
                    checked={animationDisabled}
                    onChange={toggleAnimation}
                    className="w-3 h-3 accent-primary"
                  />
                  Disable animation
                </label>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-card border-border/50 hover:shadow-glow-purple hover:border-primary/30 transition-all duration-300 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Next Meeting
              </CardTitle>
              <Calendar className="h-4 w-4 text-primary group-hover:text-primary-glow transition-colors duration-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Next year!
              </div>
              <p className="text-xs text-muted-foreground">Room B109 @ Lunch</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50 hover:shadow-glow-cyan hover:border-cyan-500/30 transition-all duration-300 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Members
              </CardTitle>
              <Users className="h-4 w-4 text-cyan-500 group-hover:text-cyan-400 transition-colors duration-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-500 bg-clip-text text-transparent">
                127
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Signups This Year
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50 hover:shadow-glow-orange hover:border-accent/30 transition-all duration-300 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Next Competition
              </CardTitle>
              <Trophy className="h-4 w-4 text-accent group-hover:text-accent-hover transition-colors duration-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold bg-gradient-secondary bg-clip-text text-transparent">
                TBD
              </div>
              <p className="text-xs text-muted-foreground">Next year!</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50 hover:shadow-glow-green hover:border-emerald-400/30 transition-all duration-300 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Resources
              </CardTitle>
              <BookOpen className="h-4 w-4 text-emerald-400 group-hover:text-emerald-500 transition-colors duration-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-500 bg-clip-text text-transparent">
                85+
              </div>
              <p className="text-xs text-muted-foreground">
                Available Resources
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Connect Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-primary opacity-5 rounded-3xl"></div>
          <div className="relative backdrop-blur-sm bg-card/30 border border-border/50 rounded-3xl p-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Stay Connected
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Join our community on Discord for announcements, discussions,
                and competition updates.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center pt-2">
                <a
                  href="https://discord.gg/HeAM7TYV2y"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold px-8 py-4 text-lg hover:shadow-lg hover:shadow-[#5865F2]/25 transition-all duration-300">
                    Join Discord Server
                    <ExternalLink className="ml-2 h-5 w-5" />
                  </Button>
                </a>
                <a
                  href="https://www.facebook.com/groups/evhsmathclub"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    className="border-primary/30 hover:border-primary hover:bg-primary/10 hover:text-primary font-semibold px-8 py-4 text-lg transition-all duration-300"
                  >
                    Follow on Facebook
                    <ExternalLink className="ml-2 h-5 w-5" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="py-12"></div>
    </div>
  );
};

export default Home;
