document.addEventListener('DOMContentLoaded', () => {
    const imageInput = document.getElementById('image');
    const pixelWidthInput = document.getElementById('pixel-width');
    const pixelHeightInput = document.getElementById('pixel-height');
    const websiteInput = document.getElementById('website');
    const form = document.querySelector('.order-form');
    const cardDetails = document.querySelector('.card-details');
    const paymentButton = document.querySelector('.payment-button');
    const paymentItems = document.querySelectorAll('.payment-item');

    const totalPriceDisplay = document.createElement('p');
    totalPriceDisplay.style.fontSize = '1.2rem';
    totalPriceDisplay.style.fontWeight = 'bold';
    totalPriceDisplay.style.marginTop = '10px';

    const imagePreview = document.createElement('img');
    imagePreview.style.maxWidth = '200px';
    imagePreview.style.marginTop = '15px';

    cardDetails.style.display = 'none';
    paymentButton.style.display = 'none';

    function showPaymentFields() {
        cardDetails.style.display = 'block';
        paymentButton.style.display = 'block';
    }

    paymentItems.forEach(item => {
        item.addEventListener('click', showPaymentFields);
    });

    imageInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imagePreview.src = e.target.result;
                localStorage.setItem('uploadedImage', e.target.result);
            };
            reader.readAsDataURL(file);
            if (!form.contains(imagePreview)) {
                form.appendChild(imagePreview);
            }
        }
    });

    function updateTotalPrice() {
        const width = Number(pixelWidthInput.value) || 0;
        const height = Number(pixelHeightInput.value) || 0;
        const price = 1;
        const total = (width + height) * price; // Складываем ширину и высоту
        totalPriceDisplay.textContent = `Общая стоимость: $${total}`;
    }

    pixelWidthInput.addEventListener('input', updateTotalPrice);
    pixelHeightInput.addEventListener('input', updateTotalPrice);

    if (!form.contains(totalPriceDisplay)) {
        form.appendChild(totalPriceDisplay);
    }

    updateTotalPrice();

    paymentButton.addEventListener('click', () => {
        const selectedPixel = localStorage.getItem('selectedPixel');
        const uploadedImage = localStorage.getItem('uploadedImage');
        const width = Number(pixelWidthInput.value) || 1;
        const height = Number(pixelHeightInput.value) || 1;
        const websiteLink = websiteInput.value.trim();

        if (selectedPixel && uploadedImage) {
            localStorage.setItem(`pixel-${selectedPixel}`, JSON.stringify({
                image: uploadedImage,
                width: width,
                height: height,
                link: websiteLink
            }));
        }

        window.location.href = "index.html";
    });
});
