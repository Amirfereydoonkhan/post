class Post {
  constructor(title, author, body) {
    this.title = title;
    this.author = author;
    this.body = body;
  }
}

class UI {
  addPostToList(post) {
    const list = document.getElementById("post-list");

    const row = document.createElement("tr");

    row.innerHTML = `
<th>${post.title}</th>
<td>${post.author}</td>
<td>${post.body}</td>
<td><i class="fas fa-times text-danger delete"></i></td>
`;

    list.appendChild(row);
  }

  deletePost(target){

  target.parentElement.parentElement.remove();

  }

  clearFields(){
    document.getElementById("title").value = '';
    document.getElementById("author").value = '';
    document.getElementById("body").value = '';
  }

  showAlert(message, className){

    const div = document.createElement('div');
    
    div.className = `alert alert-${className}`;

    div.appendChild(document.createTextNode(message));

    const col = document.querySelector('.col-sm-8');

    const form = document.querySelector('#post-form');

    col.insertBefore(div, form);

    setTimeout(function(){
      document.querySelector('.alert').remove();
    }, 3000);

  }
}

class Store {

  static getPosts(){
    let posts;
    if(localStorage.getItem('posts') === null){
      posts = [];
    }else{
      posts = JSON.parse(localStorage.getItem('posts'));
    }
    return posts;
  }
  
  static displayPosts(){

    const posts = Store.getPosts();
    posts.forEach(function(post){
      const ui = new UI;
      ui.addPostToList(post);
    });
  }

  static addPost(post){
    const posts = Store.getPosts();
    posts.push(post);
    localStorage.setItem('posts', JSON.stringify(posts));

  }

  static removePost(title){

const posts = Store.getPosts();
posts.forEach(function(post,index){
  if(post.title === title){
    posts.splice(index, 1);
  }
});
  localStorage.setItem('posts', JSON.stringify(posts));

  }

}

document.addEventListener('DOMContentLoaded',Store.displayPosts);


document.getElementById("post-form").addEventListener("submit", function (e) {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const body = document.getElementById("body").value;

  const post = new Post(title, author, body);

  const ui = new UI();


  if(title === '' || author === '' || body === ''){
    ui.showAlert('All fields are required', 'danger');

  }else{

    ui.addPostToList(post);

    Store.addPost(post);

    ui.clearFields();

    ui.showAlert('Post Inserted Successfully !', 'success');
  }

  

  e.preventDefault();
});


document.getElementById("post-list").addEventListener("click", function (e) {

const ui = new UI();

if( e.target.classList.contains('delete')){

  // confirm('Do you agree for removing?')

  // if(confirm == true){
  //   console.log(confirm);

ui.deletePost(e.target);

const tr = e.target.parentElement.parentElement;
const title = tr.firstElementChild.textContent;
Store.removePost(title);

ui.showAlert('Post Has Been Removed Successfully!', 'success');
//   }else{
//     ui.showAlert('Thats OK', 'danger');
  // }
  

}

e.preventDefault();
});

