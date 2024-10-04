// show catagories using fetch
// function for converting
function convertSeconds(date) {
  const hours = parseInt(date / 3600); 
  const minutes = parseInt((date % 3600) / 60); 
  
  return `${hours} hr ${minutes} min ago`;
}
const loadCatagories = () =>{
   fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
     .then((data) => data.json())
     .then((data) => displayCatagories(data.categories))
     .catch((error) => console.log(error));
}
// load videos
const loadVideos = () =>{
   fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
     .then((data) => data.json())
     .then((data) => displayVideos(data.videos))
     .catch((error) => console.log(error));
}
const loadCategoryVideo = (id) =>{
    
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
      .then((data) => data.json())
      .then((data) => displayVideos(data.category))
      .catch((error) => console.log(error));
}
// display catagories
const displayCatagories = (data) =>{
    const categoryContainer = document.getElementById("categories");
    data.forEach(item => { 
     const buttonContainer = document.createElement("div");
     buttonContainer.innerHTML = `
     <button onclick = "loadCategoryVideo(${item.category_id})" class="btn">
        ${item.category}
     </button>
     `;
     categoryContainer.appendChild(buttonContainer);
    });
}
// displayVideo catagories
const  displayVideos = (data) =>{
    const videoContainer = document.getElementById("videos");
   
    if(data.length == 0){
        videoContainer.classList.remove("grid")
         videoContainer.innerHTML = `<div class=" min-h-52 w-full flex flex-col justify-center items-center gap-5">
         <img src="images/icon.png">
         <h2>Oops!! Sorry, There is no content here</h2>
         </div>`;
         return;
    }
    else{
         videoContainer.classList.add("grid");
    }
    data.forEach(item =>{
      const card = document.createElement("div");
      card.classList = ("card card-compact");
      card.innerHTML = `
      <figure class="h-48 relative">
    <img
      src= ${item.thumbnail} class="w-full h-full object-cover" />
      ${
        item.others.posted_date
          ? `<span class="absolute right-2 bottom-2 bg-[#171717] text-white px-2 py-1 rounded-md text-xs">${convertSeconds(item.others.posted_date)} </span>`
          : ""
      }
  </figure>
  <div class="py-2 flex gap-2">
  <div>
  <img src =${
    item.authors[0].profile_picture
  } class= "w-10 h-10 rounded-full object-cover">
  </div>
    <div>
    <h2 class="card-title font-bold ">${item.title}</h2>
    <div class="flex items-center gap-1"><p>${
      item.authors[0].profile_name
    }</p> ${
        item.authors[0].verified == true
          ? `<img class="w-5" src ="images/verify.png">`
          : ""
      } </div>
    <p></p>

    </div>
    
  </div>
      `; 
      videoContainer.append(card) ;


      const cardcontent = {
        category_id: "1001",
        video_id: "aaaa",
        thumbnail: "https://i.ibb.co/L1b6xSq/shape.jpg",
        title: "Shape of You",
        authors: [
          {
            profile_picture: "https://i.ibb.co/D9wWRM6/olivia.jpg",
            profile_name: "Olivia Mitchell",
            verified: "",
          },
        ],
        others: {
          views: "100K",
          posted_date: "16278",
        },
        description:
          "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey.",
      };
        console.log(item);
    })
}
loadVideos();
loadCatagories();