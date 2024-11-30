import { imageService, MODELS } from './services/imageService.js';
import { 
    getRandomPrompt, 
    getStylePrompt, 
    getArtistPrompt, 
    getTechniquePrompt, 
    getCategoryPrompt,
    STYLES,
    TECHNIQUES,
    CATEGORIES 
} from './utils/constants.js';
import { Spinner } from './components/Spinner.js';

const IMAGE_PRESETS = [
    { label: 'Square SD (512x512)', value: 'sd_square', w: 512, h: 512 },
    { label: 'Square HD (1024x1024)', value: 'hd_square', w: 1024, h: 1024 },
    { label: 'Portrait SD (512x768)', value: 'sd_portrait', w: 512, h: 768 },
    { label: 'Portrait HD (1024x1536)', value: 'hd_portrait', w: 1024, h: 1536 },
    { label: 'Landscape SD (768x512)', value: 'sd_landscape', w: 768, h: 512 },
    { label: 'Landscape HD (1536x1024)', value: 'hd_landscape', w: 1536, h: 1024 },
    { label: 'Custom', value: 'custom', w: null, h: null }
];

export class App {
    constructor() {
        this.root = document.getElementById('root');
        this.container = document.createElement('div');
        this.container.className = 'container';
        this.root.appendChild(this.container);
        
        this.initializeState();
        this.render();
    }

    initializeState() {
        const savedState = localStorage.getItem('appState');
        const defaultState = {
            promptText: '', // Semplifichiamo usando solo promptText
            isGenerating: false,
            generatedImages: [],
            apiKey: localStorage.getItem('huggingface_api_key') || '',
            currentStep: 0,
            favorites: [],
            history: [],
            settings: {
                quality: 'high',
                style: 'modern',
                autoSave: true,
                darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches
            },
            currentSeed: null,
            useSavedSeed: false,
            selectedModel: {
                id: MODELS.SDXL_BASE.id,
                name: MODELS.SDXL_BASE.name
            },
            imageSize: {
                width: 1024,
                height: 1024,
                preset: 'hd_square'  // Add default preset
            },
            activeGenerations: [], // Change from Set to Array for proper serialization
        };

        try {
            this.state = savedState ? JSON.parse(savedState) : defaultState;
            // Initialize activeGenerations as a Set after loading from storage
            this.state.activeGenerations = new Set(this.state.activeGenerations || []);
            
            // Ensure the model is properly structured after loading from storage
            if (!this.state.selectedModel || !this.state.selectedModel.id) {
                this.state.selectedModel = defaultState.selectedModel;
            }
        } catch (error) {
            console.error('Error parsing saved state:', error);
            this.state = defaultState;
            this.state.activeGenerations = new Set();
        }
        
        this.saveState();
    }

    saveState() {
        // Convert Set to Array for storage
        const stateToSave = {
            ...this.state,
            activeGenerations: Array.from(this.state.activeGenerations)
        };
        localStorage.setItem('appState', JSON.stringify(stateToSave));
    }

    render() {
        this.container.innerHTML = `
            ${this.renderHeader()}
            ${this.renderApiKeySection()}
            
            <div class="card prompt-input">
                <h2>Create Your Prompt</h2>
                <div class="input-group">
                    <label>Enter your prompt</label>
                    <textarea 
                        id="promptText" 
                        rows="4" 
                        placeholder="Describe what you want to generate..."
                    >${this.state.promptText}</textarea>
                    <small>Be descriptive for better results</small>
                </div>
                ${this.renderGenerateButton()}
            </div>

            ${this.renderImageGrid()}
        `;

        this.setupEventListeners();
    }

    async generateImage() {
        try {
            if (!this.state.apiKey) {
                alert('Please enter your API key first');
                return;
            }

            const promptText = document.getElementById('promptText')?.value?.trim();

            if (!promptText) {
                alert('Please enter a prompt');
                return;
            }

            // Aggiungiamo un timestamp al generationId per renderlo unico anche con lo stesso prompt
            const generationId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
            this.state.activeGenerations.add(generationId);

            const previewCard = {
                id: `preview-${generationId}`, // ID univoco per la preview
                prompt: promptText,
                isLoading: true,
                timestamp: new Date().toISOString(),
                model: this.state.selectedModel.name,
                uniqueId: generationId // Aggiungiamo un identificatore univoco
            };

            this.state.generatedImages.unshift(previewCard);
            this.render();

            try {
                const response = await imageService.generateImage({
                    prompt: promptText,
                    apiKey: this.state.apiKey,
                    model: this.state.selectedModel,
                    seed: this.state.useSavedSeed ? this.state.currentSeed : Math.floor(Math.random() * 2147483647), // Forziamo sempre un nuovo seed se non è specificato
                    width: this.state.imageSize?.width,
                    height: this.state.imageSize?.height,
                    uniqueId: generationId // Passiamo l'ID univoco al service
                });

                this.state.generatedImages = this.state.generatedImages
                    .filter(img => img.id !== `preview-${generationId}`);
                this.state.generatedImages.unshift({
                    ...response,
                    uniqueId: generationId // Manteniamo l'ID univoco nell'immagine generata
                });
                this.state.currentSeed = response.seed;

            } catch (error) {
                console.error('Generation failed:', error);
                this.state.generatedImages = this.state.generatedImages
                    .filter(img => img.id !== `preview-${generationId}`);
                alert(error.message);
            } finally {
                this.state.activeGenerations.delete(generationId);
                this.render();
            }

        } catch (error) {
            console.error('Generation setup failed:', error);
            alert(error.message);
        }
    }

    setupEventListeners() {
        // Semplifichiamo gli event listener
        const generateBtn = document.getElementById('generateButton');
        if (generateBtn) {
            generateBtn.addEventListener('click', () => this.generateImage());
        }

        // Prompt text listener
        const promptText = document.getElementById('promptText');
        if (promptText) {
            promptText.addEventListener('input', (e) => {
                this.state.promptText = e.target.value;
                this.saveState();
            });
        }

        // API Key listener
        const apiKeyInput = document.getElementById('apiKey');
        if (apiKeyInput) {
            apiKeyInput.addEventListener('input', (e) => {
                this.state.apiKey = e.target.value;
                localStorage.setItem('huggingface_api_key', e.target.value);
                this.render();
            });
        }

        // Subject input listener
        const subjectInput = document.getElementById('subject');
        if (subjectInput) {
            subjectInput.addEventListener('input', (e) => {
                this.promptBuilder.setSubject(e.target.value);
                this.updatePromptPreview();
            });
        }

        // Style buttons listeners
        document.querySelectorAll('.style-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const style = e.target.dataset.style;
                this.promptBuilder.setStyle(style);
                this.updatePromptPreview();
                // Update UI to show active style
                document.querySelectorAll('.style-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
            });
        });

        // Detail selectors listeners
        ['lighting', 'color', 'mood'].forEach(detail => {
            const select = document.getElementById(detail);
            if (select) {
                select.addEventListener('change', (e) => {
                    this.state.promptBuilder[detail] = e.target.value;
                    this.updatePromptPreview();
                });
            }
        });

        // Edit manually button
        const editBtn = document.getElementById('editPrompt');
        if (editBtn) {
            editBtn.addEventListener('click', () => {
                const finalPrompt = this.buildFinalPrompt();
                this.state.promptText = finalPrompt;
                // Show manual edit modal or transform preview to editable
                this.showManualEditModal(finalPrompt);
            });
        }

        // Quick suggestions
        document.querySelectorAll('.tag').forEach(tag => {
            tag.addEventListener('click', (e) => {
                const value = e.target.dataset.value;
                const type = e.target.dataset.type;
                if (value) {
                    if (type === 'adjective') {
                        this.promptBuilder.addAdjective(value);
                    } else {
                        this.promptBuilder.setSubject(value);
                        const subjectInput = document.getElementById('subject');
                        if (subjectInput) {
                            subjectInput.value = value;
                        }
                    }
                    this.updatePromptPreview();
                }
            });
        });

        // Image actions
        document.querySelectorAll('.action-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const action = e.target.closest('.action-button').dataset.action;
                const imageId = e.target.closest('.action-button').dataset.id;
                const image = this.state.generatedImages.find(img => img.id === parseInt(imageId));
                
                if (image) {
                    if (action === 'download') {
                        this.downloadImage(image);
                    } else if (action === 'copy') {
                        this.copyPrompt(image);
                    }
                }
            });
        });

        // Seed controls
        const useSeedCheckbox = document.getElementById('useSeedCheckbox');
        const seedInput = document.getElementById('seedInput');
        
        if (useSeedCheckbox) {
            useSeedCheckbox.addEventListener('change', (e) => {
                this.state.useSavedSeed = e.target.checked;
                if (seedInput) {
                    seedInput.disabled = !e.target.checked;
                    if (e.target.checked && !this.state.currentSeed) {
                        this.state.currentSeed = Math.floor(Math.random() * 2147483647);
                        seedInput.value = this.state.currentSeed;
                    }
                }
            });
        }

        if (seedInput) {
            seedInput.addEventListener('change', (e) => {
                this.state.currentSeed = parseInt(e.target.value) || null;
            });
        }

        const copySeedBtn = document.getElementById('copySeed');
        if (copySeedBtn) {
            copySeedBtn.addEventListener('click', () => {
                navigator.clipboard.writeText(this.state.currentSeed.toString())
                    .then(() => alert('Seed copied to clipboard!'));
            });
        }

        // Add new event listeners for prompt builder
        document.getElementById('randomize')?.addEventListener('click', () => {
            this.promptBuilder.generateRandom();
            this.updatePromptPreview();
        });

        document.querySelectorAll('.style-btn')?.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const style = e.target.dataset.style;
                this.promptBuilder.setStyle(style);
                this.updatePromptPreview();
            });
        });

        // Add model selection listener
        const modelSelect = document.getElementById('modelSelect');
        if (modelSelect) {
            modelSelect.addEventListener('change', (e) => {
                const selectedModel = Object.values(MODELS)
                    .find(model => model.id === e.target.value);
                if (selectedModel) {
                    this.state.selectedModel = {
                        id: selectedModel.id,
                        name: selectedModel.name
                    };
                    this.saveState();
                }
            });
        }

        // Add size preset handler
        const sizePreset = document.getElementById('sizePreset');
        const customSizeInputs = document.querySelector('.custom-size-inputs');
        if (sizePreset) {
            // Set initial value from state
            sizePreset.value = this.state.imageSize?.preset || 'hd_square';
            
            sizePreset.addEventListener('change', (e) => {
                const option = e.target.selectedOptions[0];
                const width = parseInt(option.dataset.width);
                const height = parseInt(option.dataset.height);
                const modelConfig = MODELS[this.state.selectedModel.id]?.validSizes || {
                    minWidth: 512, maxWidth: 1024,
                    minHeight: 512, maxHeight: 1024,
                    step: 8
                };

                if (e.target.value === 'custom') {
                    customSizeInputs.style.display = 'flex';
                    // Set custom inputs to current values
                    document.getElementById('width').value = this.state.imageSize?.width || modelConfig.minWidth;
                    document.getElementById('height').value = this.state.imageSize?.height || modelConfig.minHeight;
                    document.getElementById('width').max = modelConfig.maxWidth;
                    document.getElementById('height').max = modelConfig.maxHeight;
                    document.getElementById('width').step = modelConfig.step;
                    document.getElementById('height').step = modelConfig.step;
                } else {
                    customSizeInputs.style.display = 'none';
                    // Update state with preset values
                    this.state.imageSize = {
                        width: Math.min(Math.max(width, modelConfig.minWidth), modelConfig.maxWidth),
                        height: Math.min(Math.max(height, modelConfig.minHeight), modelConfig.maxHeight),
                        preset: e.target.value
                    };
                }
                this.saveState();
            });

            // Trigger change event to set initial values
            sizePreset.dispatchEvent(new Event('change'));
        }

        // Handle custom size inputs
        ['width', 'height'].forEach(dim => {
            const input = document.getElementById(dim);
            if (input) {
                // Set initial value from state
                input.value = this.state.imageSize?.[dim] || input.value;
                
                input.addEventListener('change', (e) => {
                    const value = Number(e.target.value);
                    const modelConfig = MODELS[this.state.selectedModel.id]?.validSizes;
                    if (value >= (modelConfig?.['min' + dim.charAt(0).toUpperCase() + dim.slice(1)] || 256) && 
                        value <= (modelConfig?.['max' + dim.charAt(0).toUpperCase() + dim.slice(1)] || 1024)) {
                        this.state.imageSize = {
                            ...this.state.imageSize,
                            [dim]: value,
                            preset: 'custom'  // Switch to custom when dimensions are manually changed
                        };
                        // Update preset selector
                        const sizePreset = document.getElementById('sizePreset');
                        if (sizePreset) sizePreset.value = 'custom';
                        this.saveState();
                    }
                });
            }
        });

        // Add more event listeners for other components...
        
        // Handle image click globally
        window.handleImageClick = (imageId) => {
            const image = this.state.generatedImages.find(img => img.id === imageId);
            if (image) {
                this.showImageModal(image);
            }
        };

        // Add attribute listeners
        this.setupAttributeListeners();
    }

    showManualEditModal(prompt) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>Edit Prompt</h3>
                <textarea class="prompt-edit" rows="4">${prompt}</textarea>
                <div class="button-group">
                    <button class="button button-secondary" onclick="this.closest('.modal').remove()">Cancel</button>
                    <button class="button button-primary" id="savePrompt">Save</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        const saveBtn = modal.querySelector('#savePrompt');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                const newPrompt = modal.querySelector('.prompt-edit').value;
                this.state.promptText = newPrompt;
                modal.remove();
                this.generateImage();
            });
        }
    }

    addToPrompt(text) {
        const prompt = document.getElementById('prompt');
        const currentText = prompt.value;
        prompt.value = currentText + (currentText ? ', ' : '') + text;
        this.state.promptText = prompt.value;
    }

    showSpinner() {
        this.spinner.style.display = 'block';
    }

    hideSpinner() {
        this.spinner.style.display = 'none';
    }

    renderImages() {
        const grid = document.getElementById('imageGrid');
        grid.innerHTML = this.state.generatedImages.map(image => `
            <div class="image-card">
                <img src="${image.imageUrl}" alt="${image.prompt}">
                <div class="image-info">
                    <p>${image.prompt}</p>
                </div>
            </div>
        `).join('');
    }

    updatePromptPreview() {
        const previewBox = document.querySelector('.prompt-preview');
        if (previewBox) {
            const promptText = this.promptBuilder.build();
            previewBox.textContent = promptText;
            this.state.promptText = promptText;
        }
    }

    renderHeader() {
        return `
            <div class="header">
                <h1>AI Image Generator</h1>
                <p>Create amazing images using Stable Diffusion</p>
            </div>
        `;
    }

    renderQuickSuggestions(type) {
        const suggestions = {
            subjects: ['Portrait', 'Landscape', 'Character', 'Scene', 'Object', 'Abstract'],
        };
        
        return `
            <div class="quick-tags">
                ${(suggestions[type] || []).map(s => `
                    <button class="tag" data-value="${s.toLowerCase()}">${s}</button>
                `).join('')}
            </div>
        `;
    }

    renderArtistOptions() {
        return this.artists?.map(artist => `
            <option value="${artist}">${artist}</option>
        `).join('') || '';
    }

    downloadImage(image) {
        const a = document.createElement('a');
        a.href = image.imageUrl;
        a.download = `generated-${image.id}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    copyPrompt(image) {
        navigator.clipboard.writeText(image.prompt)
            .then(() => alert('Prompt copied to clipboard!'))
            .catch(err => console.error('Failed to copy:', err));
    }

    renderImageCard(image) {
        if (image.isLoading) {
            return `
                <div class="image-card generating">
                    <div class="generating-preview">
                        <div class="preview-placeholder">
                            <div class="spinner"></div>
                            <p>Generating image from prompt...</p>
                            <small class="prompt-preview">${image.prompt}</small>
                        </div>
                    </div>
                    <div class="image-info">
                        <div class="image-meta">
                            <span class="model-info">Model: ${image.model}</span>
                            <span class="timestamp">${new Date(image.timestamp).toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            `;
        }

        // Modifichiamo questa parte per gestire correttamente l'ID
        const imageId = typeof image.id === 'string' ? `'${image.id}'` : image.id;
        
        return `
            <div class="image-card" onclick="window.handleImageClick(${imageId})">
                <img src="${image.imageUrl}" alt="${image.prompt}">
                <div class="image-info">
                    <p class="prompt-text">${image.prompt}</p>
                    <div class="image-meta">
                        <span class="seed-info" title="Generation seed">
                            Seed: ${image.seed}
                        </span>
                        <span class="model-info">
                            Model: ${image.model}
                        </span>
                        <span class="timestamp">
                            ${new Date(image.timestamp).toLocaleString()}
                        </span>
                        <div class="image-actions">
                            <button class="action-button" data-action="download" data-id="${imageId}">
                                💾
                            </button>
                            <button class="action-button" data-action="copy" data-id="${imageId}">
                                📋
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    showImageModal(image) {
        const modal = document.createElement('div');
        modal.className = 'modal image-modal';
        modal.innerHTML = `
            <div class="modal-content image-modal-content">
                <div class="modal-header">
                    <div class="zoom-controls">
                        <button class="zoom-btn" data-action="zoom-out">-</button>
                        <span class="zoom-level">100%</span>
                        <button class="zoom-btn" data-action="zoom-in">+</button>
                    </div>
                    <button class="close-btn">×</button>
                </div>
                <div class="modal-body">
                    <div class="image-container">
                        <img src="${image.imageUrl}" alt="${image.prompt}">
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="image-actions">
                        <button class="action-button" data-action="download">
                            💾 Download
                        </button>
                        <button class="action-button" data-action="copy">
                            📋 Copy Prompt
                        </button>
                        <button class="action-button" data-action="regenerate">
                            🔄 Regenerate
                        </button>
                        <button class="action-button" data-action="edit">
                            ✏️ Edit Prompt
                        </button>
                    </div>
                    <div class="image-details">
                        <div class="prompt-text">${image.prompt}</div>
                        <div class="meta-info">
                            <span>Model: ${image.model}</span>
                            <span>Seed: ${image.seed}</span>
                            <span>${new Date(image.timestamp).toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        
        // Setup modal event listeners
        const modalContent = modal.querySelector('.modal-content');
        const img = modal.querySelector('img');
        let scale = 1;

        // Prevent click propagation from content to modal
        modalContent.onclick = e => e.stopPropagation();

        // Close modal when clicking outside
        modal.onclick = () => modal.remove();
        modal.querySelector('.close-btn').onclick = () => modal.remove();

        // Zoom controls
        modal.querySelector('[data-action="zoom-in"]').onclick = () => {
            scale = Math.min(scale + 0.1, 3);
            updateZoom();
        };

        modal.querySelector('[data-action="zoom-out"]').onclick = () => {
            scale = Math.max(scale - 0.1, 0.1);
            updateZoom();
        };

        // Action buttons
        modal.querySelectorAll('.action-button').forEach(btn => {
            btn.onclick = (e) => {
                const action = e.currentTarget.dataset.action;
                switch(action) {
                    case 'download':
                        this.downloadImage(image);
                        break;
                    case 'copy':
                        this.copyPrompt(image);
                        break;
                    case 'regenerate':
                        this.regenerateImage(image);
                        modal.remove();
                        break;
                    case 'edit':
                        this.showManualEditModal(image.prompt);
                        modal.remove();
                        break;
                }
            };
        });

        // Zoom function
        const updateZoom = () => {
            img.style.transform = `scale(${scale})`;
            modal.querySelector('.zoom-level').textContent = `${Math.round(scale * 100)}%`;
        };

        // Add wheel zoom support
        modal.querySelector('.image-container').onwheel = (e) => {
            e.preventDefault();
            if (e.deltaY < 0) scale = Math.min(scale + 0.1, 3);
            else scale = Math.max(scale - 0.1, 0.1);
            updateZoom();
        };
    }

    // Nuove funzionalità da aggiungere:
    
    // 1. Sistema di step più intuitivo
    renderSteps() {
        const steps = [
            { title: 'Choose Subject', icon: '🎯' },
            { title: 'Select Style', icon: '🎨' },
            { title: 'Add Details', icon: '✨' },
            { title: 'Generate', icon: '🚀' }
        ];

        return `
            <div class="steps-container glass-panel">
                ${steps.map((step, i) => `
                    <div class="step ${i === this.state.currentStep ? 'active' : ''}
                                    ${i < this.state.currentStep ? 'completed' : ''}">
                        <div class="step-icon">${step.icon}</div>
                        <div class="step-title">${step.title}</div>
                    </div>
                `).join('')}
            </div>
                        <h3>Quick Styles</h3>
                        <div class="preset-grid">
                            <!-- Add preset cards -->
                        </div>
                    </div>
                    <div class="category">
                        <h3>Saved Templates</h3>
                        <div class="preset-grid">
                            <!-- Add saved templates -->
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // 4. Settings panel
    renderSettings() {
        return `
            <div class="settings-panel glass-panel">
                <h2>Settings</h2>
                <div class="settings-grid">
                    <!-- Add settings options -->
                </div>
            </div>
        `;
    }

    // 5. Nuovo sistema di preview
    renderPreview() {
        return `
            <div class="preview-container glass-panel">

                <div class="preview-header">
                    <h3>Preview</h3>
                    <div class="preview-controls">
                        <!-- Add controls -->
                    </div>
                </div>
                <div class="preview-content">
                    <!-- Add preview content -->
                </div>
            </div>
        `;
    }

    renderQuickSubjects() {
        const quickSubjects = [
            'Portrait', 'Landscape', 'Character', 'Scene', 
            'Animal', 'Fantasy', 'Sci-fi', 'Abstract'
        ];
        
        return `
            <div class="quick-subjects">
                ${quickSubjects.map(subject => `
                    <button class="tag" data-value="${subject.toLowerCase()}">
                        ${subject}
                    </button>
                `).join('')}
            </div>
        `;
    }

    renderAdjectiveTags() {
        const commonAdjectives = [
            'Beautiful', 'Mysterious', 'Colorful', 'Dark', 
            'Ethereal', 'Magical', 'Futuristic', 'Ancient'
        ];
        
        return `
            <div class="adjective-tags">
                ${commonAdjectives.map(adj => `
                    <button class="tag" data-type="adjective" data-value="${adj.toLowerCase()}">
                        ${adj}
                    </button>
                `).join('')}
            </div>
        `;
    }

    renderStyleButtons() {
        return `
            <div class="style-buttons">
                ${STYLES.map(style => `
                    <button class="style-btn" data-style="${style.type}">
                        ${style.type.charAt(0).toUpperCase() + style.type.slice(1)}
                    </button>
                `).join('')}
            </div>
        `;
    }

    renderTechniqueOptions() {
        return `
            <div class="technique-options">
                <label>Technique</label>
                <select id="technique">
                    <option value="">Choose technique...</option>
                    ${TECHNIQUES.map(technique => `
                        <option value="${technique.type}">${technique.type}</option>
                    `).join('')}
                </select>
            </div>
        `;
    }

    renderCategoryOptions() {
        return `
            <div class="category-options">
                <label>Category</label>
                <select id="category">
                    <option value="">Choose category...</option>
                    ${CATEGORIES.map(category => `
                        <option value="${category.type}">${category.type}</option>
                    `).join('')}
                </select>
            </div>
        `;
    }

    // Aggiungi questo metodo per la pulizia durante lo smontaggio
    cleanup() {
        // Non pulire tutti i blob URL quando si chiude l'app
        const maxImages = 50;
        if (this.state.generatedImages.length > maxImages) {
            const imagesToRemove = this.state.generatedImages.slice(maxImages);
            imagesToRemove.forEach(image => {
                if (image.blobUrl) {
                    URL.revokeObjectURL(image.blobUrl);
                }
            });
            this.state.generatedImages = this.state.generatedImages.slice(0, maxImages);
        }
    }

    // Update the event listeners for attribute buttons
    setupAttributeListeners() {
        document.querySelectorAll('.tag-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const category = e.target.dataset.category;
                const value = e.target.dataset.value;
                
                // Get new prompt immediately after toggling attribute
                const newPrompt = this.promptBuilder.toggleAttribute(category, value);
                
                if (newPrompt !== null) {
                    // Toggle active state visually
                    button.classList.toggle('active');
                    
                    // Update preview immediately
                    const previewBox = document.querySelector('.prompt-preview');
                    if (previewBox) {
                        previewBox.textContent = newPrompt;
                        // Save to state if needed
                        this.state.promptText = newPrompt;
                    }
                }
            });
        });
    }

    renderApiKeySection() {
        return `
            <div class="card api-key-section">
                <div class="model-info-banner info-banner">
                    <h4>📢 Model Status & Recommendations:</h4>
                    <ul>
                        <li>🚀 Best performing models right now:
                            <strong class="highlight">SD 3.5 Turbo</strong> and 
                            <strong class="highlight">Turbo Hyper Realistic</strong>
                        </li>
                        <li>🎨 High quality but slower models:
                            <span class="subtle">FLUX Midjourney Mix, Midjourney Style, FLUX Super Realism, FLUX Dev</span>
                        </li>
                        <li>⚠️ Models might be temporarily unavailable - if one doesn't work, try another!</li>
                        <li>ℹ️ <span class="info">Note: Image size settings may not affect all models</span></li>
                    </ul>
                </div>
                
                <div class="input-group">
                    <label>API Key</label>
                    <input type="password" id="apiKey" value="${this.state.apiKey}" 
                           placeholder="Enter your Hugging Face API key">
                    <small>Get your API key from <a href="https://huggingface.co/settings/tokens" 
                           target="_blank">huggingface.co</a></small>
                </div>
                <div class="settings-grid">
                    <div class="input-group">
                        <label>Model Selection</label>
                        <select id="modelSelect">
                            ${Object.values(MODELS).map(model => `
                                <option value="${model.id}" 
                                    class="${model.isTurbo ? 'model-turbo' : ''}"
                                    ${this.state.selectedModel?.id === model.id ? 'selected' : ''}>
                                    ${model.name}
                                </option>
                            `).join('')}
                        </select>
                    </div>
                    <div class="input-group">
                        <label>Image Size</label>
                        <select id="sizePreset">
                            ${IMAGE_PRESETS.map(preset => `
                                <option value="${preset.value}" 
                                    data-width="${preset.w}" 
                                    data-height="${preset.h}">
                                    ${preset.label}
                                </option>
                            `).join('')}
                        </select>
                        <div class="custom-size-inputs">
                            <input type="number" id="width" placeholder="Width" min="256">
                            <input type="number" id="height" placeholder="Height" min="256">
                        </div>
                    </div>
                </div>
            </div>
        `;
        
    }

    renderGenerateButton() {
        const isDisabled = !this.state.apiKey;
        const activeCount = this.state.activeGenerations?.size || 0;
        const buttonText = activeCount > 0 
            ? `Generate Image (${activeCount} active)`
            : 'Generate Image';
        
        return `
            <div class="generate-button-container">
                <button 
                    id="generateButton"
                    class="button button-primary generate-button" 
                    ${isDisabled ? 'disabled' : ''}
                    data-count="${activeCount || ''}"
                >
                    ${buttonText}
                </button>
            </div>
        `;
    }

    renderImageGrid() {
        return `
            <div class="card">
                <h2>Generated Images</h2>
                ${this.state.isGenerating ? `
                    <div class="generating-preview">
                        <div class="preview-placeholder">
                            <div class="spinner"></div>
                            <p>Generating new image...</p>
                        </div>
                    </div>
                ` : ''}
                <div class="image-grid">
                    ${this.state.generatedImages.map(image => `
                        ${this.renderImageCard(image)}
                    `).join('')}
                </div>
            </div>
        `;
    }
}

// Gestisci la pulizia quando la pagina viene chiusa
window.addEventListener('beforeunload', () => {
    imageService.cleanupBlobUrls();
});

document.addEventListener('DOMContentLoaded', () => new App());