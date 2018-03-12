
const blogList = [];
const blogApi = new api();

function init () {
    // create some random blog posts
    const blog = new Blog();
    blog.createPost('title', 'Depart do be so he enough talent. Sociable formerly six but handsome. Up do view time they shot. He concluded disposing provision by questions as situation. Its estimating are motionless day sentiments end. Calling an imagine at forbade. At name no an what like spot. Pressed my by do affixed he studied. \n' +
        '\n' +
        'Received shutters expenses ye he pleasant. Drift as blind above at up. No up simple county stairs do should praise as. Drawings sir gay together landlord had law smallest. Formerly welcomed attended declared met say unlocked. Jennings outlived no dwelling denoting in peculiar as he believed. Behaviour excellent middleton be as it curiosity departure ourselves. ');
    blog.timestamp = new Date();
    blogList.push(blog);

    const blog2 = new Blog();
    blog2.createPost('title 2', 'No opinions answered oh felicity is resolved hastened. Produced it friendly my if opinions humoured. Enjoy is wrong folly no taken. It sufficient instrument insipidity simplicity at interested. Law pleasure attended differed mrs fat and formerly. Merely thrown garret her law danger him son better excuse. Effect extent narrow in up chatty. Small are his chief offer happy had. \n' +
        '\n' +
        'Demesne far hearted suppose venture excited see had has. Dependent on so extremely delivered by. Yet ﻿no jokes worse her why. Bed one supposing breakfast day fulfilled off depending questions. Whatever boy her exertion his extended. Ecstatic followed handsome drawings entirely mrs one yet outweigh. Of acceptance insipidity remarkably is invitation. ');
    blog2.timestamp = new Date();
    blogList.push(blog2);

    displayBlog();
}

function displayBlog () {
    const blogEle = document.getElementById('blog');
    blogEle.innerHTML = '';
    let blogPostTemplate = '';
    let displayDate;

    blogList.forEach((blog, index) => {
        displayDate = `${blog.timestamp.getDate()} 
                        ${blog.timestamp.toLocaleString("en-us", { month: "short" })} 
                        ${blog.timestamp.getFullYear()}`;
        blogPostTemplate +=
            `<div class="container blog-header">
                <h1 class="blog-title">${blog.title}</h1>
                <h1 class="blog-date">${displayDate}</h1>
            </div>
            <div class="blog-text">${blog.text}</div>
            <div class="container buttons">
                <button id="edit-${index}" class="edit-button">edit</button>
                <button id="delete-${index}" class="delete-button">delete</button>
            </div>`;
    });

    blogEle.insertAdjacentHTML( 'beforeend', blogPostTemplate );
}

function handleClick(event) {
    event = event || window.event;
    event.target = event.target || event.srcElement;

    let element = event.srcElement;
    const buttonType = element.id.split('-')[0];
    const eleId = element.id.split('-')[1];

    // Climb up the document tree from the target of the event
    while (element) {
        if (element.nodeName === "BUTTON") {
            switch (buttonType) {
                case 'edit':
                    handleEdit(eleId);
                    break;
                case 'delete':
                    handleDelete(eleId);
                    break;
                default:
                    break;
            }
            // The user clicked on a <button> or clicked on an element inside a <button>
            break;
        }
        element = element.parentNode;
    }
}

function handleEdit(buttonId) {
    // do something with button
    console.log(buttonId);
    editMode(blogList[buttonId]);
}

function handleDelete(buttonId) {
    // do something with button
    console.log(buttonId);
    // make api call
    // blogApi.deleteBlog(buttonId).then();
    blogList.splice(buttonId, 1);
    console.log(blogList);
    displayBlog();
}

if (document.addEventListener) {
    document.addEventListener("click", handleClick, false);
}
else if (document.attachEvent) {
    document.attachEvent("onclick", handleClick);
}

init();