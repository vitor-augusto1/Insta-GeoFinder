"use strict";
function messageToUser(appear, documentObject, elementName, message) {
    let loadingHtmlTag = document.getElementById(elementName);
    if (!appear) {
        loadingHtmlTag.textContent = message;
    }
    loadingHtmlTag.textContent = message;
}
function fetchPlaceHandler(place, document) {
    fetch(`/api/v1/place-information/?place_id=${place}`)
        .then(data => { return data.json(); })
        .then(jsonResponse => {
        messageToUser(false, document, "message", "");
        const arrayOfUserMedia = jsonResponse.media;
        for (let media of arrayOfUserMedia) {
            const layoutOfContent = media.layout_content;
            const userMedia = layoutOfContent.medias[0].media;
            const userPic = userMedia.user.profile_pic_url;
            const userName = userMedia.user.username;
            const container = document.getElementById("post-information");
            const img = document.createElement('img');
            const UserProfileLink = document.createElement('a');
            img.crossOrigin = "same-origin";
            img.src = `https://corsproxy.io/?${userPic}`;
            UserProfileLink.href = "https://www.instagram.com/" + userName;
            UserProfileLink.appendChild(img);
            container.appendChild(UserProfileLink);
            console.log({ userName: userPic });
        }
    })
        .catch(error => {
        console.log(error);
        messageToUser(true, document, "message", "Users not found.");
    });
}
