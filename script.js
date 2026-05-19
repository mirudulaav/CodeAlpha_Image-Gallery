const galleryCards = document.querySelectorAll('.gallery-card');
const lightbox = document.getElementById('lightbox');
const lightboxImg =document.querySelector('.lightbox-img');
const lightboxCaption =document.querySelector('.lightbox-caption');
const closeBtn =document.querySelector('.close-btn');
let savedImages =JSON.parse(localStorage.getItem('savedImages')) || [];
galleryCards.forEach(card => {
  const img =card.querySelector('img');
  const title =card.querySelector('h3').innerText;
  const saveBtn =card.querySelector('.save-btn');
  const alreadySaved =
  savedImages.some(item =>
    item.img === img.src &&
    item.title === title
  );
  if(alreadySaved && saveBtn){
    saveBtn.innerText = 'Saved';
  }
  card.addEventListener('click', (e) => {
    if(e.target.classList.contains('save-btn')) return;
    if(lightbox){
      lightboxImg.src = img.src;
      lightboxImg.alt = title;
      lightboxCaption.innerText = title;
      lightbox.classList.add('active');
    }
  });
  if(saveBtn){
    saveBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const exists =
      savedImages.some(item =>
        item.img === img.src &&
        item.title === title
      );
      if(!exists){
        savedImages.push({
          img: img.src,
          title: title
        });
        localStorage.setItem(
          'savedImages',
          JSON.stringify(savedImages)
        );
        saveBtn.innerText = 'Saved';
      }
    });
  }
});
if(closeBtn){
  closeBtn.addEventListener('click', () => {
    lightbox.classList.remove('active');
  });
}
document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape' && lightbox){
    lightbox.classList.remove('active');
  }
});
if(lightbox){
  lightbox.addEventListener('click', (e) => {
    if(e.target === lightbox){
      lightbox.classList.remove('active');
    }
  });
}