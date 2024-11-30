import { QUALITY_PRESETS, NEGATIVE_PROMPTS } from './constants.js';

export class PromptBuilder {
    constructor() {
        this.reset();
    }

    reset() {
        this.components = {
            main: {
                subject: '',
                attributes: new Set(),
            },
            mood: new Set(),      // emotional qualities
            style: new Set(),     // visual style attributes
            lighting: new Set(),   // lighting conditions
            quality: new Set([     // technical quality markers
                'high quality',
                'detailed'
            ]),
            negatives: new Set(NEGATIVE_PROMPTS.split(',').map(p => p.trim()))
        };
        return this;
    }

    // Improved attribute handling with immediate updates
    toggleAttribute(category, value) {
        if (!value?.trim() || !this.components[category]) return null;
        
        const normalizedValue = value.trim().toLowerCase();
        const set = category === 'main.attributes' ? 
            this.components.main.attributes : 
            this.components[category];

        if (set.has(normalizedValue)) {
            set.delete(normalizedValue);
        } else {
            set.add(normalizedValue);
        }

        return this.build(); // Return the new prompt immediately
    }

    addAttribute(category, value) {
        if (!value?.trim()) return this;
        
        if (this.components[category]) {
            this.components[category].add(value.trim().toLowerCase());
        }
        return this;
    }

    removeAttribute(category, value) {
        if (this.components[category]) {
            this.components[category].delete(value.toLowerCase());
        }
        return this;
    }

    setSubject(subject) {
        this.components.main.subject = subject?.trim().toLowerCase() || '';
        return this;
    }

    build() {
        const parts = [];

        // Subject section
        const mainParts = [];
        if (this.components.main.attributes.size > 0) {
            mainParts.push(Array.from(this.components.main.attributes).join(' '));
        }
        if (this.components.main.subject) {
            mainParts.push(this.components.main.subject);
        }
        if (mainParts.length) parts.push(mainParts.join(' '));

        // Style section
        if (this.components.style.size > 0) {
            parts.push(Array.from(this.components.style).join(', '));
        }

        // Mood section
        if (this.components.mood.size > 0) {
            parts.push(Array.from(this.components.mood).join(', '));
        }

        // Lighting section
        if (this.components.lighting.size > 0) {
            parts.push(Array.from(this.components.lighting).join(', '));
        }

        // Quality markers always at the end
        parts.push(Array.from(this.components.quality).join(', '));

        return parts.filter(Boolean).join(', ');
    }

    getNegativePrompt() {
        return Array.from(this.components.negatives).join(', ');
    }
}