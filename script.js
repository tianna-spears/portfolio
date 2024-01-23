// Insert Copyright Text in Footer (Lesson 4.2)

const today= new Date(); // Create a new date object and store it in a variable named today
const fullName= 'by Tianna Spears'; // Create name variable

const thisYear= today.getFullYear(); // Retrieve the current year from your date object and store it in a variable named thisYear

const footer= document.querySelector('footer'); // Using "DOM Selection", select the <footer> element from the DOM and store it in a variable named footer

const copyright= document.createElement('p'); // Create a new paragraph (p) element and store it in a variable named copyright
copyright.innerHTML = 'Copyright © ' + fullName + ' ' + thisYear; // Set the inner HTML of your copyright element to display your name and the current year

footer.appendChild(copyright); // Using "DOM Manipulation", append the copyright element to the footer

console.log(copyright); 

// Lesson 4.2 Homework (Create List of Skills)
// List your technical skills by creating an Array of String values and store it in a variable named skills
// * changed to create an array of experiences and stored in variable named experience

const skills = ['HTML', 'CSS', 'Javascript', 'GitHub', 'Git', 'React', 'Node.js', 'GitLab', 'Visual Studio Code'];

const skillsSection= document.getElementById('skills'); // Using "DOM Selection", select the #skills section by id and store it in a variable named skillsSection

const skillsList= skillsSection.querySelector('ul'); // Using "DOM Selection", query the skillsSection (instead of the entire document) to find the <ul> element and store it in a variable named skillsList

for (let i = 0; i < skills.length; i++) { // Create a for loop to iterate over your skills Array, starting at index 0

let skill = document.createElement('button');  // Inside the loop, create a new list item (li) element and store it in a variable named skill

skill.innerText = skills[i]; // On the next line, set the inner text of your skill variable to the value of the current Array element
skillsList.appendChild(skill); // On the next line, append the skill element to the skillsList element
}

// Homework 4-3 (Handle Message Form Submit and Display Messages in List)

const messageForm= document.getElementById('leave_message'); 
messageForm.addEventListener("submit", callBack);

function callBack (event) {
  const usersName= document.getElementById('usersName').value;
  const usersEmail= document.getElementById('usersEmail').value;
  const usersMessage= document.getElementById('usersMessage').value;
  
    console.log('Name:', usersName);
    console.log('Email:', usersEmail);
    console.log('Message:', usersMessage);

    event.preventDefault();

// Display Messages in List - 4.3 HW Question //

    const messageSection= document.getElementById('msg');
    const messageList= messageSection.querySelector('ul');
    
    const newMessage= document.createElement('li');
    
    newMessage.innerHTML= '<a href=" mailto: ' + usersEmail + '" > ' 
    + usersName + '</a>' + ' wrote' + ' " ' + ' <span> ' + usersMessage 
    +  ' " ' + ' </span> ';

// 4.3 HW Question Stretch Goal-- Add Edit Button for Submitted Messages

const editButton= document.createElement('button');
editButton.id= 'editButton';
editButton.innerText=  ' edit ';

editButton.addEventListener("click", function () {
  const editedMessage= prompt("Edit your message here:", usersMessage)
  if (editedMessage !== null) {
    newMessage.querySelector('span').innerText= editedMessage;
    hideMessageDisplay();
  }
});

newMessage.appendChild(editButton);

// 4.3 HW Question Stretch Goal-- Add Remove Button for Submitted Messages

const removeButton= document.createElement('button');
removeButton.innerText=  ' remove';
removeButton.type= 'button';
  
removeButton.addEventListener("click", function () {
const entry= removeButton.parentNode;
entry.remove();
hideMessageDisplay();
});
  
newMessage.appendChild(removeButton);
messageList.appendChild(newMessage);
    
document.getElementById('leave_message').reset();
hideMessageDisplay();
}

      
// 4.3 HW Question Stretch Goal-- Hide #messages section when list is empty

    function hideMessageDisplay() {
      const messageSection= document.getElementById('msg');
      const messageList= messageSection.querySelector('ul');
  
      if (messageList.children.length === 0) {
        messageSection.style.display= 'none';
      } else {
        messageSection.style.display= 'block';
      }
    }

    const messagesForm= document.getElementById('leave_message'); 

    messagesForm.addEventListener("submit", function (event) {
      const editButton= document.getElementById('editButton');

      hideMessageDisplay();
    });

    const messageSection= document.getElementById('msg');
    messageSection.style.display= 'none';
    const editButton= document.getElementById('editButton');

    hideMessageDisplay();

/* Homework Lesson 6-1 
Fetch GitHub Repositories & Handle Response from Server
const githubRequest =new XMLHttpRequest();
githubRequest.open('GET', 'https://api.github.com/users/tianna-spears/repos');
githubRequest.onload = function () {
const repositories= JSON.parse(githubRequest.responseText); */



// Lesson 6-2, Turn AJAX request to API! //

const githubRequest= 'https://api.github.com/users/tianna-spears/repos';

fetch(githubRequest)
  .then(response =>  {
    if(!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(repositories => {  

// Display Repositories in List, Limit number of repositories shown */
const projectSection= document.getElementById('projects');
const projectList= projectSection.querySelector('ul');
const limit= 9;

for (let i= 6; i < repositories.length; i++) {

  if (i >= limit) {
    break;
  }

  // Lesson 6-1 Stretch Goals-- Transform repository names into <a> tags that link to GitHub
  // Display additional repository information
  // Customize styling of Projects Section List-- look in CSS

  const project= document.createElement('li');

  const reposLinks= document.createElement('a');

  reposLinks.href= repositories[i].html_url;
  reposLinks.textContent= repositories[i].name;

  const reposDescription= document.createElement('p');
  const normalDate= new Date(repositories[i].created_at);

  reposDescription.textContent= repositories[i].description + ' ; ' + ' Created on ' + normalDate.toLocaleDateString();

  project.appendChild(reposLinks);
  project.appendChild(reposDescription);
  projectList.appendChild(project);
  }

})
.catch(error => {
  console.log('Error fetching data:', error);
});