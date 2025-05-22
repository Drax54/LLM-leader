# Holistic AI LLM Leaderboard

A comprehensive web application for displaying, comparing, and analyzing AI language model benchmarks, focusing on both performance and safety metrics.

## Features

- **Interactive Leaderboard**: View and compare models across multiple performance and safety metrics
- **Detailed Model Pages**: In-depth information about each model, including benchmark scores, safety tests, and technical specifications
- **Organization Filters**: Filter models by organization, benchmark scores, and other criteria
- **Safety Metrics**: Evaluations of model safety, including safe responses, unsafe responses, and jailbreaking resistance

## Data Structure

The application uses a comprehensive JSON database (`src/data/models.json`) that includes details for each model:

- Basic information (name, developer, size, release date)
- Performance benchmarks (CodeLMArena, MathLiveBench, CodeLiveBench)
- Operational and safety rankings
- Cost metrics (input/output costs per million tokens)
- Context window size and knowledge cutoff dates
- Safety metrics (safe/unsafe responses, jailbreaking resistance)

## Tech Stack

- React
- TypeScript
- TailwindCSS
- React Router
- shadcn/ui components

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Run the development server:
   ```
   npm run dev
   ```
4. Build for production:
   ```
   npm run build
   ```

## License

MIT
