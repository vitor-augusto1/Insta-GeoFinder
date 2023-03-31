function messageToUser(appear, documentObject, elementName, message) {
  let loadingHtmlTag = document.getElementById(elementName);
  if (!appear) {
    loadingHtmlTag.textContent = message;
  }
  loadingHtmlTag.textContent = message;
}
