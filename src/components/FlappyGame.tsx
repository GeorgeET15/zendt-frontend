import { useState, useEffect, useRef } from "react";

interface GameState {
  birdY: number;
  birdVelocity: number;
  obstacles: { x: number; gapY: number }[];
  score: number;
  isPlaying: boolean;
  isGameOver: boolean;
}

export default function FlappyGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const birdImageRef = useRef<HTMLImageElement | null>(null);
  const [gameState, setGameState] = useState<GameState>({
    birdY: 150,
    birdVelocity: 0,
    obstacles: [],
    score: 0,
    isPlaying: false,
    isGameOver: false,
  });

  const BIRD_SIZE = 60;
  const OBSTACLE_WIDTH = 50;
  const GAP_SIZE = 180; // Increased from 150
  const GRAVITY = 0.35; // Reduced from 0.5
  const JUMP_STRENGTH = -7; // Reduced from -8
  const OBSTACLE_SPEED = 2; // Reduced from 3

  // Load bird image
  useEffect(() => {
    const img = new Image();
    img.src = "/z-logo-nobg.png";
    birdImageRef.current = img;
  }, []);

  // Start game
  const startGame = () => {
    setGameState({
      birdY: 150,
      birdVelocity: 0,
      obstacles: [{ x: 400, gapY: 150 }],
      score: 0,
      isPlaying: true,
      isGameOver: false,
    });
  };

  // Handle jump
  const jump = () => {
    if (!gameState.isPlaying || gameState.isGameOver) return;
    setGameState((prev) => ({ ...prev, birdVelocity: JUMP_STRENGTH }));
  };

  // Game loop
  useEffect(() => {
    if (!gameState.isPlaying || gameState.isGameOver) return;

    const gameLoop = setInterval(() => {
      setGameState((prev) => {
        let newBirdY = prev.birdY + prev.birdVelocity;
        let newBirdVelocity = prev.birdVelocity + GRAVITY;

        // Check canvas bounds
        if (newBirdY < 0 || newBirdY > 300 - BIRD_SIZE) {
          return { ...prev, isGameOver: true, isPlaying: false };
        }

        // Update obstacles
        let newObstacles = prev.obstacles.map((obs) => ({
          ...obs,
          x: obs.x - OBSTACLE_SPEED,
        }));

        // Add new obstacle
        if (newObstacles.length === 0 || newObstacles[newObstacles.length - 1].x < 250) {
          newObstacles.push({
            x: 400,
            gapY: Math.random() * 100 + 75,
          });
        }

        // Remove off-screen obstacles
        newObstacles = newObstacles.filter((obs) => obs.x > -OBSTACLE_WIDTH);

        // Check collisions and score
        let newScore = prev.score;
        let collision = false;

        newObstacles.forEach((obs) => {
          // Bird is in obstacle x range
          if (obs.x < 50 + BIRD_SIZE && obs.x + OBSTACLE_WIDTH > 50) {
            // Check if bird is in the gap
            if (newBirdY < obs.gapY - GAP_SIZE / 2 || newBirdY + BIRD_SIZE > obs.gapY + GAP_SIZE / 2) {
              collision = true;
            }
          }

          // Score when passing obstacle
          if (obs.x + OBSTACLE_WIDTH < 50 && obs.x + OBSTACLE_WIDTH >= 50 - OBSTACLE_SPEED) {
            newScore++;
          }
        });

        if (collision) {
          return { ...prev, isGameOver: true, isPlaying: false };
        }

        return {
          ...prev,
          birdY: newBirdY,
          birdVelocity: newBirdVelocity,
          obstacles: newObstacles,
          score: newScore,
        };
      });
    }, 1000 / 60); // 60 FPS

    return () => clearInterval(gameLoop);
  }, [gameState.isPlaying, gameState.isGameOver]);

  // Draw game
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, 0, 400, 300);

    // Draw obstacles
    ctx.fillStyle = "#1E1E1E";
    gameState.obstacles.forEach((obs) => {
      // Top obstacle
      ctx.fillRect(obs.x, 0, OBSTACLE_WIDTH, obs.gapY - GAP_SIZE / 2);
      // Bottom obstacle
      ctx.fillRect(obs.x, obs.gapY + GAP_SIZE / 2, OBSTACLE_WIDTH, 300 - (obs.gapY + GAP_SIZE / 2));
      
      // Border
      ctx.strokeStyle = "#ffffff20";
      ctx.lineWidth = 2;
      ctx.strokeRect(obs.x, 0, OBSTACLE_WIDTH, obs.gapY - GAP_SIZE / 2);
      ctx.strokeRect(obs.x, obs.gapY + GAP_SIZE / 2, OBSTACLE_WIDTH, 300 - (obs.gapY + GAP_SIZE / 2));
    });

    // Draw bird (logo image)
    if (birdImageRef.current && birdImageRef.current.complete) {
      ctx.drawImage(
        birdImageRef.current,
        50,
        gameState.birdY,
        BIRD_SIZE,
        BIRD_SIZE
      );
    } else {
      // Fallback to circle if image not loaded
      ctx.beginPath();
      ctx.arc(50 + BIRD_SIZE / 2, gameState.birdY + BIRD_SIZE / 2, BIRD_SIZE / 2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw score
    ctx.fillStyle = "#ffffff80";
    ctx.font = "20px sans-serif";
    ctx.fillText(`Score: ${gameState.score}`, 10, 30);
  }, [gameState]);

  return (
    <div className="space-y-4">
      <div className="relative rounded-[20px] overflow-hidden bg-[#0a0a0a] border border-white/10">
        <canvas
          ref={canvasRef}
          width={400}
          height={300}
          onClick={jump}
          className="w-full cursor-pointer"
        />
        
        {!gameState.isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="text-center space-y-4">
              {gameState.isGameOver ? (
                <>
                  <p className="text-2xl font-light">Game Over!</p>
                  <p className="text-lg text-white/60">Score: {gameState.score}</p>
                </>
              ) : (
                <p className="text-2xl font-light">Tap to Fly</p>
              )}
              <button
                onClick={startGame}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-[10px] border border-white/10 transition-colors"
              >
                {gameState.isGameOver ? "Play Again" : "Start Game"}
              </button>
            </div>
          </div>
        )}
      </div>
      
      <p className="text-xs text-white/40 text-center">Click or tap to make the bird fly!</p>
    </div>
  );
}
