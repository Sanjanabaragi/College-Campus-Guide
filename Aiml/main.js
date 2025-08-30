function openLightbox(image) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    lightbox.style.display = "flex"; // Show the lightbox
    lightboxImg.src = image.src; // Set the source of the lightbox image to the clicked image
}

// Close the lightbox when clicking outside the image or on the close button
function closeLightbox() {
    const lightbox = document.getElementById("lightbox");
    lightbox.style.display = "none"; // Hide the lightbox
}


function openLightbox(imageElement) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const imageDetails = document.getElementById('image-details');

    // Set the image source
    lightboxImg.src = imageElement.src;

    // Set the image details based on the alt attribute or any other data
    const detailsMap = {
        "CSE": "This is the main entrance of the CSE department.",
        "CSE1": "A glimpse of our state-of-the-art CSE lab.",
        "Gallery": "Students working on innovative projects.",
        "Gallery1": "A collaborative coding session.",
        "DBMS lab": "Our DBMS lab equipped with modern tools.",
        "Java lab": "Java programming lab fostering coding skills."
    };

    const altText = imageElement.alt;
    imageDetails.textContent = detailsMap[altText] || "No details available for this image.";

    // Show the lightbox
    lightbox.style.display = "flex";
}

function closeLightbox(event) {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = "none"; // Hide the lightbox
    
}
