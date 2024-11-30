export const MODELS = {
    SD_3_5_TURBO: {
        id: 'stabilityai/stable-diffusion-3.5-large-turbo',
        name: 'SD 3.5 Turbo',
        needsNegativePrompt: true,
        simpleRequest: false,
        isLatest: false,
        defaultSize: { width: 1024, height: 1024 },
        validSizes: {
            minWidth: 512, maxWidth: 2048,
            minHeight: 512, maxHeight: 2048,
            step: 8
        },
        speed: 'fast',
        isTurbo: true,
        isRealistic: false
    },
    SD_3_5_TURBO_HYPER_REALISTIC: {
        id: 'prithivMLmods/SD3.5-Large-Turbo-HyperRealistic-LoRA',
        name: 'SD 3.5 Turbo Hyper Realistic',
        needsNegativePrompt: true,
        simpleRequest: false,
        isLatest: false,
        defaultSize: { width: 1024, height: 1024 },
        validSizes: {
            minWidth: 512, maxWidth: 2048,
            minHeight: 512, maxHeight: 2048,
            step: 8
        },
        speed: 'fast',
        isTurbo: true,
        isRealistic: true
    },
    PONY_DIFFUSION_V6_XL_TURBO: {
        id: 'Bakanayatsu/ponyDiffusion-V6-XL-Turbo-DPO',
        name: 'Pony Diffusion V6 XL Turbo',
        needsNegativePrompt: true,
        simpleRequest: false,
        isLatest: false,
        defaultSize: { width: 1024, height: 1024 },
        validSizes: {
            minWidth: 512, maxWidth: 2048,
            minHeight: 512, maxHeight: 2048,
            step: 8
        },
        speed: 'medium',
        isTurbo: true,
        isRealistic: false
    },
    REAL_VIS_XL_V3_TURBO: {
        id: 'SG161222/RealVisXL_V3.0_Turbo',
        name: 'Real Vis XL V3 Turbo',
        needsNegativePrompt: true,
        simpleRequest: false,
        isLatest: false,
        defaultSize: { width: 1024, height: 1024 },
        validSizes: {
            minWidth: 512, maxWidth: 2048,
            minHeight: 512, maxHeight: 2048,
            step: 8
        },
        speed: 'fast',
        isTurbo: true,
        isRealistic: false
    },
    INSECTAGON_TURBO: {
        id: 'glif-loradex-trainer/insectagon_Turbo_prodigy',
        name: 'Insectagon Turbo',
        needsNegativePrompt: true,
        simpleRequest: false,
        isLatest: false,
        defaultSize: { width: 1024, height: 1024 },
        validSizes: {
            minWidth: 512, maxWidth: 2048,
            minHeight: 512, maxHeight: 2048,
            step: 8
        },
        speed: 'fast',
        isTurbo: true,
        isRealistic: false
    },
    SD_3_5: {
        id: 'stabilityai/stable-diffusion-3.5-large',
        name: 'Stable Diffusion 3.5',
        needsNegativePrompt: true,
        simpleRequest: false,
        isLatest: true,
        defaultSize: { width: 1024, height: 1024 },
        validSizes: {
            minWidth: 512, maxWidth: 1536,
            minHeight: 512, maxHeight: 1536,
            step: 8
        },
        speed: 'slow',
        isTurbo: false,
        isRealistic: false
    },
    SD_1_5: {
        id: 'runwayml/stable-diffusion-v1-5',
        name: 'Stable Diffusion 1.5',
        needsNegativePrompt: true,
        simpleRequest: false,
        isLatest: false,
        defaultSize: { width: 512, height: 512 },
        validSizes: {
            minWidth: 256, maxWidth: 1024,
            minHeight: 256, maxHeight: 1024,
            step: 64
        },
        speed: 'medium',
        isTurbo: false,
        isRealistic: false
    },
    SDXL_BASE: {
        id: 'stabilityai/stable-diffusion-xl-base-1.0',
        name: 'Stable Diffusion XL Base',
        needsNegativePrompt: true,
        simpleRequest: false,
        isLatest: false,
        defaultSize: { width: 1024, height: 1024 },
        validSizes: {
            minWidth: 512, maxWidth: 2048,
            minHeight: 512, maxHeight: 2048,
            step: 8
        },
        speed: 'slow',
        isTurbo: false,
        isRealistic: false
    },
    LAI_SDXL: {
        id: 'Artples/LAI-ImageGeneration-vSDXL-2',
        name: 'LAI SDXL',
        needsNegativePrompt: false,
        simpleRequest: false,
        isLatest: false,
        defaultSize: { width: 1024, height: 1024 },
        validSizes: {
            minWidth: 512, maxWidth: 2048,
            minHeight: 512, maxHeight: 2048,
            step: 8
        },
        speed: 'slow',
        isTurbo: false,
        isRealistic: false
    },
    MIDJOURNEY_STYLE: {
        id: 'Jovie/Midjourney',
        name: 'Midjourney Style',
        needsNegativePrompt: false,
        simpleRequest: true,
        isLatest: false,
        defaultSize: { width: 1024, height: 1024 },
        validSizes: {
            minWidth: 512, maxWidth: 2048,
            minHeight: 512, maxHeight: 2048,
            step: 8
        },
        speed: 'medium',
        isTurbo: false,
        isRealistic: false
    },
    FLUX: {
        id: 'black-forest-labs/FLUX.1-dev',
        name: 'FLUX Dev',
        needsNegativePrompt: false,
        simpleRequest: true,
        isLatest: false,
        defaultSize: { width: 1024, height: 1024 },
        validSizes: {
            minWidth: 512, maxWidth: 2048,
            minHeight: 512, maxHeight: 2048,
            step: 8
        },
        speed: 'fast',
        isTurbo: false,
        isRealistic: false
    },
    FLUX_SUPER_REALISM: {
        id: 'strangerzonehf/Flux-Super-Realism-LoRA',
        name: 'FLUX Super Realism',
        needsNegativePrompt: false,
        simpleRequest: true,
        isLatest: false,
        defaultSize: { width: 1024, height: 1024 },
        validSizes: {
            minWidth: 512, maxWidth: 2048,
            minHeight: 512, maxHeight: 2048,
            step: 8
        },
        speed: 'medium',
        isTurbo: false,
        isRealistic: true
    },
    FLUX_ANIMEX_V2: {
        id: 'strangerzonehf/Flux-Animex-v2-LoRA',
        name: 'FLUX Animex v2',
        needsNegativePrompt: false,
        simpleRequest: true,
        isLatest: false,
        defaultSize: { width: 1024, height: 1024 },
        validSizes: {
            minWidth: 512, maxWidth: 2048,
            minHeight: 512, maxHeight: 2048,
            step: 8
        },
        speed: 'medium',
        isTurbo: false,
        isRealistic: false
    },
    FLUX_MIDJOURNEY_MIX: {
        id: 'strangerzonehf/Flux-Midjourney-Mix-LoRA',
        name: 'FLUX Midjourney Mix',
        needsNegativePrompt: false,
        simpleRequest: true,
        isLatest: false,
        defaultSize: { width: 1024, height: 1024 },
        validSizes: {
            minWidth: 512, maxWidth: 2048,
            minHeight: 512, maxHeight: 2048,
            step: 8
        },
        speed: 'medium',
        isTurbo: false,
        isRealistic: false
    },
    STUDIO_GHIBLI_STYLE: {
        id: 'tunctn/studio-ghibli-style-lora',
        name: 'Studio Ghibli Style',
        needsNegativePrompt: true,
        simpleRequest: true,
        isLatest: false,
        defaultSize: { width: 1024, height: 1024 },
        validSizes: {
            minWidth: 512, maxWidth: 2048,
            minHeight: 512, maxHeight: 2048,
            step: 20
        },
        speed: 'medium',
        isTurbo: false,
        isRealistic: false
    }
};

export const imageService = {
    blobUrls: new Set(),

    cleanupBlobUrls() {
        const activeUrls = new Set(
            Array.from(document.querySelectorAll('img'))
                .map(img => img.src)
                .filter(src => src.startsWith('blob:'))
        );

        this.blobUrls.forEach(url => {
            if (!activeUrls.has(url)) {
                URL.revokeObjectURL(url);
                this.blobUrls.delete(url);
            }
        });
    },

    async generateImage({ prompt, apiKey, seed = null, model = MODELS.SD_3_5, width = null, height = null, uniqueId }) {
        if (!prompt || !apiKey) {
            throw new Error('Prompt and API key are required');
        }

        const modelConfig = model.validSizes || {
            minWidth: 512, maxWidth: 1024,
            minHeight: 512, maxHeight: 1024,
            step: 8
        };

        if (!width || !height) {
            width = model.defaultSize?.width || 1024;
            height = model.defaultSize?.height || 1024;
        }

        width = Math.min(Math.max(width, modelConfig.minWidth), modelConfig.maxWidth);
        height = Math.min(Math.max(height, modelConfig.minHeight), modelConfig.maxHeight);

        width = Math.round(width / modelConfig.step) * modelConfig.step;
        height = Math.round(height / modelConfig.step) * modelConfig.step;

        const url = `https://api-inference.huggingface.co/models/${model.id}`;

        try {
            let requestBody;

            // Aggiungiamo un timestamp alla richiesta per evitare la cache del browser
            const timestamp = Date.now();
            const urlWithTimestamp = `${url}?t=${timestamp}`;

            if (model.id === MODELS.SD_3_5.id || model.id === MODELS.SD_1_5.id) {
                requestBody = {
                    inputs: prompt,
                    parameters: {
                        negative_prompt: "blurry, bad quality, worst quality, low quality,ugly, tiling, poorly drawn hands, poorly drawn feet, poorly drawn face, out of frame, mutation, mutated, extra limbs, extra legs, extra arms, disfigured, deformed, cross-eye, body out of frame, blurry, bad art, bad anatomy, blurred, text, watermark, grainy",
                        num_inference_steps: 40,
                        guidance_scale: 8.0,
                        width: width || (model.defaultSize?.width || 1024),
                        height: height || (model.defaultSize?.height || 1024)
                    }
                };
                if (seed) {
                    requestBody.parameters.seed = seed;
                }
            } else if (model.simpleRequest) {
                requestBody = {
                    inputs: prompt
                };
            } else {
                requestBody = {
                    inputs: prompt,
                    wait_for_model: true
                };

                if (seed) {
                    requestBody.options = {
                        seed: seed
                    };
                }

                if (model.needsNegativePrompt) {
                    requestBody.parameters = {
                        negative_prompt: "blurry, bad quality, worst quality, low quality",
                        num_inference_steps: 30,
                        guidance_scale: 7.5
                    };
                }
            }

            console.log('Sending request to:', urlWithTimestamp, 'with body:', requestBody);

            const response = await fetch(urlWithTimestamp, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error(`API Error (${response.status}): ${await response.text()}`);
            }

            const blob = await response.blob();

            const blobUrl = URL.createObjectURL(blob);
            this.blobUrls.add(blobUrl);

            const imageUrl = blobUrl;

            return {
                id: uniqueId || Date.now(), // Usiamo l'ID univoco se fornito
                prompt,
                imageUrl: blobUrl,
                seed: seed || Math.floor(Math.random() * 2147483647),
                timestamp: new Date().toISOString(),
                model: model.name,
                blobUrl,
                uniqueId // Manteniamo l'ID univoco nel risultato
            };

        } catch (error) {
            console.error('Generation failed:', error);
            throw error;
        }
    }
};
