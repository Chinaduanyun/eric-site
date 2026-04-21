/**
 * Class DI class that stores all the listened Dom elements
 * @property {AutoAnimations} instance - The "self" instance of the DI service
 * @property {Map} animations - List of the animations
 */
export class AutoAnimations {
    static instance: AutoAnimations;
    private animations: Map<symbol, () => void> = new Map<symbol, () => void>();
    private frameId: number | null = null;

    /**
     * Get or instanciate the AutoAnimations
     * @returns the single AutoAnimations instance
     */
    public static getInstance(): AutoAnimations {
        if (!AutoAnimations.instance) AutoAnimations.instance = new AutoAnimations();
        return AutoAnimations.instance;
    }

    constructor() {
        document.addEventListener('visibilitychange', this.handleVisibilityChange);
    }

    /**
     * Register a new animation
     * @param componentId Unique ID of the component instance
     * @param callback Action to trigger when listener emit
     */
    public addAnimation(componentId: symbol, callback: () => void): void {
        this.animations.set(componentId, callback);
        this.ensureRunning();
    }

    /**
     * Remove an animation
     * @param componentId Unique ID of the component instance
     */
    public removeAnimation(componentId: symbol): void {
        this.animations.delete(componentId);
        if (this.animations.size === 0 && this.frameId !== null) {
            cancelAnimationFrame(this.frameId);
            this.frameId = null;
        }
    }

    /**
     * Loop that runs all the animations
     */
    private animate = () => {
        if (document.hidden || this.animations.size === 0) {
            this.frameId = null;
            return;
        }

        this.animations.forEach(a => {
            a();
        })

        this.frameId = requestAnimationFrame(this.animate);
    }

    private ensureRunning(): void {
        if (this.frameId !== null || this.animations.size === 0 || document.hidden) return;
        this.frameId = requestAnimationFrame(this.animate);
    }

    private handleVisibilityChange = () => {
        if (document.hidden) {
            if (this.frameId !== null) {
                cancelAnimationFrame(this.frameId);
                this.frameId = null;
            }
            return;
        }

        this.ensureRunning();
    }
}