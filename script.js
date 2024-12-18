
const url = "https://script.google.com/macros/s/AKfycbzOlBhZJFFjol9bcCKPOk4BE5yzZi6LwCVXFnBWAQy2J1CCeDDk2j0U_hV95T2gF3pV/exec";


// fetch all ratings
async function readRatingData(){
    const response = await fetch(url);
    let responseJson = await response.json();
    displayData(responseJson);
}

function displayData (responseJson){
    console.log(responseJson);
    let active = false;
    let feedbackCarousel = document.getElementById("feedbackCarousel");
    responseJson.forEach(element => {
        let carouselItem = document.createElement("div");
        carouselItem.classList.add("carousel-item");
        if(!active) {
            carouselItem.classList.add("active");
            active = true;
        }

        let feedbackContent = document.createElement("div");
        feedbackContent.classList.add("feedbackContent","d-lg-flex","flex-lg-row",
          "justify-content-between", "align-items-center"
        );
        let textContent = document.createElement("div");
        textContent.classList.add("flex-fill");
        textContent.setAttribute("id", "feedbackTextContent");

        let guestName = document.createElement("h3");
        let userIcon = document.createElement("span");
        userIcon.innerHTML = '<i class="fa-solid fa-circle-user"></i>' 
        guestName.appendChild(userIcon);
        let nameText = document.createTextNode("   "+element.GuestName)      
        //guestName.textContent = element.GuestName;
        guestName.appendChild(nameText);
        guestName.setAttribute("id", "feedbackGuestName");
        
        let guestRating = document.createElement("h5");
        guestRating.textContent = "Rating : "+element.Rating+"/5";

        let guestReview = document.createElement("p");
        let quoteStartIcon = document.createElement("span");
        quoteStartIcon.innerHTML = '<i class="fa-solid fa-quote-left"></i>';
        let quoteEndIcon = document.createElement("span");
        quoteEndIcon.innerHTML = '<i class="fa-solid fa-quote-right"></i>';
        guestReview.appendChild(quoteStartIcon);
        let reviewText = document.createTextNode("   "+element.GuestReview+ "   ");
        guestReview.appendChild(reviewText);
        guestReview.appendChild(quoteEndIcon);
        

        textContent.appendChild(guestName);
        textContent.appendChild(guestRating);
        textContent.appendChild(guestReview);

        let imageContent = document.createElement("div");
        imageContent.classList.add("flex-fill");
        imageContent.setAttribute("id", "feedbackImageContent");
        
        let img1 = document.createElement("img")
        img1.src = element.Image1;
        
        let img2 = document.createElement("img")
        img2.src = element.Image2;

        let img3 = document.createElement("img")
        img3.src = element.Image3;

        let img4 = document.createElement("img")
        img4.src = element.Image4;

        let img5 = document.createElement("img")
        img5.src = element.Image5;

        let img6 = document.createElement("img")
        img6.src = element.Image6;
        
        
        if(!element.Image1.length == 0) {
            imageContent.appendChild(img1);    
        }
        if(!element.Image2.length == 0) {
            imageContent.appendChild(img2);    
        }
        if(!element.Image3.length == 0) {
            imageContent.appendChild(img3);    
        }
        if(!element.Image4.length == 0) {
            imageContent.appendChild(img4);    
        }
        if(!element.Image5.length == 0) {
            imageContent.appendChild(img5);    
        }
        if(!element.Image6.length == 0) {
            imageContent.appendChild(img6);    
        }
        
        feedbackContent.appendChild(textContent);

        if(element.Image1.length > 0 || element.Image2.length > 0 || element.Image3.length > 0
            || element.Image4.length > 0 || element.Image5.length > 0 || element.Image6.length > 0
        ) {
            feedbackContent.appendChild(imageContent);    
        }
        
        carouselItem.appendChild(feedbackContent);
        feedbackCarousel.appendChild(carouselItem);
    })
}


// rating div carousel
// let ratings = document.getElementsByClassName("ratingDiv");
// let counter = 0;
// function startRatingCarousel (ratingCount) {
//     let interval = 500*ratingCount;
//     const startSlide = setInterval(slideShow, interval);    
//     function slideShow () {
//         counter ++;   
//         let slide = (268*counter);
//         for(let i = 0; i<ratings.length; i++)
//         {
//             ratings.item(i).style.transform = `translateX(-${slide}px)`;
//         }
//         if(counter == ratings.length-3) {
//             counter = -1;
//         }
//     }  

//     let next = document.getElementById("next");
//     next.addEventListener("click", ()=>{
//         if(counter <ratings.length -3) {
//             counter++;
//             let slide = 268*counter;
//             for(let i = 0; i<ratings.length; i++)
//             {
//                 ratings.item(i).style.transform = `translateX(-${slide}px)`;
//             }
//         }
//     });

//     previous.addEventListener("click", ()=>{
//         counter--;
//         if(counter<=0) {
//             counter = 0;
//         }
//         let slide = 268*counter;
//         for(let i = 0; i<ratings.length; i++)
//         {
//             ratings.item(i).style.transform = `translateX(-${slide}px)`;
//         }
//     });
// }

// resize uploaded images before submit and preview
let previewloaded = true;
let imagesArray = [];
document.getElementById('imageUpload').addEventListener('change', function (event) {
    imagesArray = [];
    previewloaded = false;
    let files = event.target.files;
    for(let i = 0; i< files.length; i++)
    {
        let file = files[i];
        //console.log(i);
        if(!file.type.match('image')) {
            alert("Please select a valid image");
            document.getElementById('imageUpload').value = '';
            return false;
        }

        if(files.length>6) {
            alert("Please upto 6 images only");
            document.getElementById('imageUpload').value = '';
            return false;
        }
          
        let picReader = new FileReader();
        picReader.addEventListener("load",function(event){
            let img = new Image();
            img.onload = function(e) {
                const maxSizeInMB = 2;
                const maxSizeInBytes = maxSizeInMB * 300 * 300;
                var canvas = document.createElement("canvas");
                var ctx = canvas.getContext("2d");
                const width = img.width;
                const height = img.height;
                const aspectRatio = width / height;
                const newWidth = Math.sqrt(maxSizeInBytes * aspectRatio);
                const newHeight = Math.sqrt(maxSizeInBytes / aspectRatio);
                canvas.width = newWidth;
                canvas.height = newHeight;
                ctx.drawImage(img, 0, 0, newWidth, newHeight);
                let dataurl = canvas.toDataURL();
                let imageUploadPreview = document.getElementById("imageUploadPreview");
                let previewImage = document.createElement("img");
                previewImage.src = dataurl;
                imageUploadPreview.appendChild(previewImage);
                imagesArray.push(dataurl);
            }
            img.src = event.target.result;
        });
        picReader.readAsDataURL(file);
    }  
    previewloaded = true; 
});

// clear inputs on form close
document.getElementById("feedbackFormClose").addEventListener('click', function (event) {
    document.getElementById("feedbackForm").reset();
    document.getElementById("imageUploadPreview").innerHTML =' ';
    const stars = document.querySelectorAll(".star");
    stars.forEach((s) => s.classList.remove("one", 
        "two", 
        "three", 
        "four", 
        "five"));
        rating = 0;
})

// validate feedback form entry before submission
let feedbackForm = document.getElementById("feedbackForm")
document.getElementById("feedbackFormSubmit").addEventListener('click', function(event) {
    const customValidation = validateFeedbackFormEntries();
    if(!customValidation || !feedbackForm.checkValidity() || !previewloaded) {
        event.preventDefault();
        event.stopPropagation();
    }
    else {
        submitFeedbackData(url);
    }
    feedbackForm.classList.add('was-validated');
});


let rating = 0;
function validateFeedbackFormEntries() {
    if(rating <= 0) {
        alert("Please select a valid rating");
        return false;
    }
    return true;   
}

// rating star selection
const stars = document.querySelectorAll(".star");
stars.forEach((star) => {
	star.addEventListener("click", () => {
		const value = parseInt(star.getAttribute("data-value"));
		rating = value;
		stars.forEach((s) => s.classList.remove("one", 
												"two", 
												"three", 
												"four", 
												"five"));
		stars.forEach((s, index) => {
			if (index < value) {
				s.classList.add(getStarColorClass(value));
			}
		});

		stars.forEach((s) => s.classList.remove("selected"));
		star.classList.add("selected");
	});
});

function getStarColorClass(value) {
	switch (value) {
		case 1:
			return "one";
		case 2:
			return "two";
		case 3:
			return "three";
		case 4:
			return "four";
		case 5:
			return "five";
		default:
			return "";
	}
}

// submit feedback form data post validation

function submitFeedbackData (url) {
    const obj ={
        Rating: rating,
        GuestName: document.getElementById("guestName").value,
        GuestReview: document.getElementById("guestFeedback").value,
        Image1: imagesArray[0],
        Image2: imagesArray[1],
        Image3: imagesArray[2],
        Image4: imagesArray[3],
        Image5: imagesArray[4],
        Image6: imagesArray[5]
    }
    fetch(url,{     
        redirect: "follow",
        method:'POST',
        mode: 'no-cors',
        body: JSON.stringify(obj),
        headers: {
            //"Content-Type": "text/plain;charset=utf-8",
        },
    })
    .then(closeFeedbackForm);
}

function closeFeedbackForm() {
    let feedbackFormClose = document.getElementById("feedbackFormClose");
    feedbackFormClose.click();
}

// submit contact form data
let contactForm = document.getElementById("contactForm");
document.getElementById("contactSubmit").addEventListener("click", function (event){
    let customValidation = validateContactFormEntries();
    if(!customValidation || !contactForm.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
    }
    else {
        submitQuery(url);
    }
    contactForm.classList.add('was-validated');
});

function validateContactFormEntries() {
    return true;
}

function submitQuery() {
    const obj ={
        GuestName: document.getElementById("contactGuestName").value,
        GuestNumber: document.getElementById("contactGuestNumber").value,
        GuestQuery: document.getElementById("contactGuestQuery").value
    }
    fetch(url+`?query=true`,{     
        redirect: "follow",
        method:'POST',
        mode: 'no-cors',
        body: JSON.stringify(obj),
        headers: {
            //"Content-Type": "text/plain;charset=utf-8",
        },
    })
    .then(contactForm.reset())
    .then(showNotification);
}

function showNotification() {
    appendAlert('Your query has been submitted.', 'success');
}

const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
  const appendAlert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      '</div>'
    ].join('')

    alertPlaceholder.append(wrapper)
  }

// toggle nav icon

function toggleNavIcon() {
    let searchDestination = document.getElementById("searchDestination");
    let nav = document.getElementById("nav");
    let brandHeader = document.getElementById("brandHeader");
    if (brandHeader.classList.contains("brandHeaderResponsive")) {
        brandHeader.classList.remove("brandHeaderResponsive")
        searchDestination.classList.remove("searchDestinationResponsive")
        nav.classList.remove("navResponsive");

    } else {
        brandHeader.classList.add("brandHeaderResponsive");
        searchDestination.classList.add("searchDestinationResponsive");
        nav.classList.add("navResponsive");
    }
  }

//   list of destinations
  let destinations = [
    "Darjeeling",
    "DarjeelingOffbeat",
    "Kalimpong", 
    "NorthSikkim",
    "SilkRoute",
    "Pelling",
    "PellingOffbeat", 
    "Dooars",
    "Sandakphu",
    "Kashmir",
    "Ladakh",
    "ShimlaManali"
  ]

let search = document.getElementById("destinationSearch");
let selectOption = document.getElementById("selectOption");
search.addEventListener("keyup",()=>{
    selectOption.style.display = "flex";
    selectOption.style.opacity = 1;
    selectOption.textContent = '';
    let searchResults = [];
    destinations.forEach(destination=> {
        if(destination.toUpperCase().match(search.value.toUpperCase())) {
            searchResults.push(destination);
        }
    });
    searchResults.forEach(option=>{
        let searchOption = document.createElement("a");
        searchOption.href = "#"+option;
        searchOption.classList.add("searchOption");
        searchOption.textContent = option;
        selectOption.appendChild(searchOption);
        searchOption.addEventListener("mousedown", function () {
            selectOption.style.opacity = 0;
        })
    });

});

document.addEventListener('mouseup', function(e) {
    var container = document.getElementById('selectOption');
    if (!container.contains(e.target)) {
        container.style.display = 'none';
    }
});

function reveal() {
    var reveals = document.querySelectorAll(".reveal");
  
    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 150;
  
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
  }
  
  window.addEventListener("scroll", reveal, {passive: true});

readRatingData();

