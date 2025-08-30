// JavaScript for handling images and displaying side-by-side information
let images = []; // To store images
let currentIndex = -1; // Track current index

// Mapping for multi-images
const multiImageStartMap = {
    5: 8,  // Clicking image with id 4 starts slideshow from id 7
    7: 101 // Clicking image with id 7 starts slideshow from id 101
};

// Load images from JSON
fetch('images.json')
    .then(response => response.json())
    .then(data => {
        images = data.flat(); // Flatten in case of nested arrays
    })
    .catch(error => console.error('Error loading images:', error));

// Display single image with side information
function updateSingleImage(index) {
    const img = document.getElementById('dynamicImage');
    const infoContainer = document.getElementById('infoContainer');
    const multiContainer = document.getElementById('multiImageContainer');

    img.style.display = 'block';
    multiContainer.style.display = 'none';
    img.src = images[index].src;

    // Update image information
    const imageInfo = images[index].info || "No additional information available.";
    infoContainer.innerHTML = `<p>${imageInfo}</p>`;
}

// Display multi-images with side information
function updateMultiImage(options) {
    const img = document.getElementById('dynamicImage');
    const multiContainer = document.getElementById('multiImageContainer');
    const infoContainer = document.getElementById('infoContainer');

    img.style.display = 'none';
    multiContainer.style.display = 'flex';

    multiContainer.innerHTML = ''; // Clear previous multi-images

    options.forEach((option, i) => {
        const multiImage = document.createElement('img');
        multiImage.src = option.path;
        multiImage.style.cursor = 'pointer';
        multiImage.onclick = () => {
            console.log(`Clicked on image with ID: ${option.id}`);
            const startId = multiImageStartMap[option.id]; // Check mapping
            if (startId !== undefined) {
                startFromId(startId); // Start slideshow from mapped ID
            } else {
                console.error('No mapped ID for this image.');
            }
        };
        multiContainer.appendChild(multiImage);
    });

    // Update multi-image information
    infoContainer.innerHTML = `<p>Multiple images displayed. Select an image for details.</p><p>click 1st image to move towards dblock, click 2nd image to enter into library and click 3rd image to move towards canteen`;
}

// Start slideshow from a specific image by ID
function startFromId(id) {
    const index = images.findIndex(image => image.id === id);
    if (index !== -1) {
        currentIndex = index;
        displayImage(currentIndex);
    } else {
        console.error(`Image with ID ${id} not found.`);
    }
}

// Handle buttons
document.getElementById('nextBtn').addEventListener('click', () => {
    if (currentIndex < images.length - 1) {
        currentIndex++;
        displayImage(currentIndex);
    }
});

document.getElementById('backBtn').addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        displayImage(currentIndex);
    }
});

document.getElementById('startBtn').addEventListener('click', () => {
    if (images.length > 0) {
        currentIndex = 0;
        displayImage(currentIndex);
        document.getElementById('nextBtn').style.display = 'inline';
        document.getElementById('backBtn').style.display = 'inline';
    }
});

// Display the current image based on type
function displayImage(index) {
    const currentImage = images[index];
    if (currentImage.type === 'single') {
        updateSingleImage(index);
    } else if (currentImage.type === 'multi') {
        updateMultiImage(currentImage.options);
    }
}
