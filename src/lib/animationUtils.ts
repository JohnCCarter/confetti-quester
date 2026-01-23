/**
 * Utility for creating cached animation styles to avoid object creation on every render
 */

// Maximum number of indices to precompute and cache
// 100 covers most use cases for task/reward lists without excessive memory usage
const MAX_CACHED_INDICES = 100;

/**
 * Creates a cache of precomputed animation styles for a given delay multiplier
 * @param delayMultiplier - Milliseconds to multiply by index for animation delay
 * @param animationDuration - CSS animation duration string
 * @returns A Map of cached styles and a getter function
 */
export const createAnimationStyleCache = (
  delayMultiplier: number,
  animationDuration: string
) => {
  const cache = new Map<number, React.CSSProperties>();
  
  // Precompute styles for common indices
  for (let i = 0; i < MAX_CACHED_INDICES; i++) {
    cache.set(i, {
      animationDelay: `${i * delayMultiplier}ms`,
      animation: `fade-in ${animationDuration} ease-out forwards`
    });
  }

  // Return a function to get styles with fallback for uncached indices
  return (index: number): React.CSSProperties => {
    const cached = cache.get(index);
    if (cached) return cached;
    
    // Fallback for indices beyond cache size
    return {
      animationDelay: `${index * delayMultiplier}ms`,
      animation: `fade-in ${animationDuration} ease-out forwards`
    };
  };
};
