# AI Image Generator

AI Image Generator is a web application that allows users to generate images using various AI models, including Stable Diffusion. Users can create prompts, select styles, and generate high-quality images.

## Features

- Generate images using different AI models
- Customize prompts with attributes, styles, moods, and lighting
- Manual and builder modes for prompt creation
- Save and manage generated images
- Responsive design with dark mode support

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/img_generator.git
    cd img_generator
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Start the development server:
    ```sh
    npm start
    ```

4. Open your browser and navigate to `http://localhost:3000`.

## Usage

1. Enter your Hugging Face API key in the API Key section.
2. Create a prompt using the builder or manual edit mode.
3. Select the desired model and image size.
4. Click "Generate Image" to create an image based on your prompt.
5. View, download, or copy the generated images.

## Project Structure

- `index.html`: The main HTML file.
- `css/`: Contains the CSS files for styling.
  - `style.css`: Main stylesheet.
  - `spinner.css`: Styles for the loading spinner.
- `js/`: Contains the JavaScript files.
  - `app.js`: Main application logic.
  - `components/`: Contains UI components.
    - `AdvancedSettings.js`: Component for advanced settings.
    - `Spinner.js`: Component for the loading spinner.
  - `services/`: Contains service files.
    - `imageService.js`: Service for interacting with the image generation API.
  - `utils/`: Contains utility files.
    - `PromptBuilder.js`: Utility for building prompts.
    - `constants.js`: Contains constants and helper functions.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
