/**
 * Utility for creating cached animation styles to avoid object creation on every render
 */

// Maximum number of indices to precompute and cache
// 100 covers most use cases for task/reward lists without excessive memory usage
const MAX_CACHED_INDICES = 100;

// Module-level cache to avoid recreating caches for identical parameters
const globalCache = new Map<string, (index: number) => React.CSSProperties>();

/**
 * Creates or retrieves a cached animation style getter for a given delay multiplier
 * @param delayMultiplier - Milliseconds to multiply by index for animation delay
 * @param animationDuration - CSS animation duration string
 * @returns A getter function that returns cached or computed styles
 */
export const createAnimationStyleCache = (
  delayMultiplier: number,
  animationDuration: string
) => {
  // Create a unique cache key based on parameters
  const cacheKey = `${delayMultiplier}-${animationDuration}`;
  
  // Return existing getter if already created for these parameters
  const existingGetter = globalCache.get(cacheKey);
  if (existingGetter) {
    return existingGetter;
  }
  
  // Create new cache for this parameter combination
  const cache = new Map<number, React.CSSProperties>();
  
  // Precompute styles for common indices
  for (let i = 0; i < MAX_CACHED_INDICES; i++) {
    cache.set(i, {
      animationDelay: `${i * delayMultiplier}ms`,
      animation: `fade-in ${animationDuration} ease-out forwards`
    });
  }

  // Create getter function
  const getter = (index: number): React.CSSProperties => {
    const cached = cache.get(index);
    if (cached) return cached;
    
    // Fallback for indices beyond cache size
    return {
      animationDelay: `${index * delayMultiplier}ms`,
      animation: `fade-in ${animationDuration} ease-out forwards`
    };
  };
  
  // Store getter in global cache
  globalCache.set(cacheKey, getter);
  
  return getter;
};
